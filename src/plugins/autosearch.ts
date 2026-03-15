import chalk from "chalk";
import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const { bold, dim, green, red, yellow } = chalk;

export interface ExperimentResult {
  run: number;
  commit: string;
  metric: number;
  metrics?: Record<string, number>;
  status: "keep" | "discard" | "crash" | "checks_failed";
  description: string;
  timestamp: number;
  segment: number;
}

export interface ExperimentConfig {
  type: "config";
  name: string;
  metricName: string;
  metricUnit: string;
  bestDirection: "lower" | "higher";
}

export interface ExperimentState {
  results: ExperimentResult[];
  bestMetric: number | null;
  bestDirection: "lower" | "higher";
  metricName: string;
  metricUnit: string;
  name: string | null;
  currentSegment: number;
}

function commas(n: number): string {
  const s = String(Math.round(n));
  const parts: string[] = [];
  for (let i = s.length; i > 0; i -= 3) {
    parts.unshift(s.slice(Math.max(0, i - 3), i));
  }
  return parts.join(",");
}

function formatNum(value: number | null, unit: string): string {
  if (value === null) {
    return "—";
  }
  const u = unit || "";
  if (value === Math.round(value)) {
    return commas(value) + u;
  }
  return commas(Math.floor(value)) + "." + (value % 1).toFixed(2).slice(1) + u;
}

function isBetter(current: number, best: number, direction: "lower" | "higher"): boolean {
  return direction === "lower" ? current < best : current > best;
}

function currentResults(results: ExperimentResult[], segment: number): ExperimentResult[] {
  return results.filter((r) => r.segment === segment);
}

function findBaselineMetric(results: ExperimentResult[], segment: number): number | null {
  const cur = currentResults(results, segment);
  return cur.length > 0 ? cur[0].metric : null;
}

function loadState(cwd: string): ExperimentState {
  const state: ExperimentState = {
    results: [],
    bestMetric: null,
    bestDirection: "lower",
    metricName: "metric",
    metricUnit: "",
    name: null,
    currentSegment: 0,
  };

  const jsonlPath = path.join(cwd, "autosearch.jsonl");
  try {
    if (fs.existsSync(jsonlPath)) {
      let segment = 0;
      const lines = fs.readFileSync(jsonlPath, "utf-8").trim().split("\n").filter(Boolean);
      for (const line of lines) {
        try {
          const entry = JSON.parse(line);

          if (entry.type === "config") {
            if (entry.name) {
              state.name = entry.name;
            }
            if (entry.metricName) {
              state.metricName = entry.metricName;
            }
            if (entry.metricUnit !== undefined) {
              state.metricUnit = entry.metricUnit;
            }
            if (entry.bestDirection) {
              state.bestDirection = entry.bestDirection;
            }
            if (state.results.length > 0) {
              segment++;
            }
            state.currentSegment = segment;
            continue;
          }

          state.results.push({
            run: entry.run ?? state.results.length + 1,
            commit: entry.commit ?? "",
            metric: entry.metric ?? 0,
            metrics: entry.metrics ?? {},
            status: entry.status ?? "keep",
            description: entry.description ?? "",
            timestamp: entry.timestamp ?? 0,
            segment,
          });
        } catch {
          // Skip malformed lines
        }
      }
      if (state.results.length > 0) {
        state.bestMetric = findBaselineMetric(state.results, state.currentSegment);
      }
    }
  } catch {
    // Return empty state on error
  }

  return state;
}

function saveConfig(cwd: string, config: ExperimentConfig, isReinit: boolean): void {
  const jsonlPath = path.join(cwd, "autosearch.jsonl");
  const configLine = JSON.stringify(config) + "\n";

  try {
    if (isReinit) {
      fs.appendFileSync(jsonlPath, configLine);
    } else {
      fs.writeFileSync(jsonlPath, configLine);
    }
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    throw new Error(`Failed to write autosearch.jsonl: ${err.message}`, { cause: err });
  }
}

function saveResult(cwd: string, result: ExperimentResult): void {
  const jsonlPath = path.join(cwd, "autosearch.jsonl");
  const resultLine = JSON.stringify(result) + "\n";

  try {
    fs.appendFileSync(jsonlPath, resultLine);
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    throw new Error(`Failed to append to autosearch.jsonl: ${err.message}`, { cause: err });
  }
}

export function buildAutosearchCommand(program: Command): Command {
  const autosearch = program
    .command("autosearch")
    .description("Autonomous optimization loop for Kubernetes workloads")
    .alias("as")
    .action(() => {
      program.help();
    });

  // autosearch init
  autosearch
    .command("init")
    .description("Initialize an experiment session")
    .requiredOption("-n, --name <name>", "Experiment name")
    .requiredOption("-m, --metric <metric>", "Primary metric name (e.g., memory_mb, latency_ms)")
    .option("-u, --unit <unit>", "Metric unit (ms, mb, count, etc.)", "")
    .option("-d, --direction <direction>", "Direction: lower or higher is better", "lower")
    .action(async (options) => {
      const cwd = process.cwd();
      const state = loadState(cwd);
      const isReinit = state.results.length > 0;

      state.name = options.name;
      state.metricName = options.metric;
      state.metricUnit = options.unit;
      state.bestDirection = options.direction === "higher" ? "higher" : "lower";

      // Reset for new baseline segment
      state.results = [];
      state.bestMetric = null;
      state.currentSegment = isReinit ? state.currentSegment + 1 : 0;

      const config: ExperimentConfig = {
        type: "config",
        name: state.name,
        metricName: state.metricName,
        metricUnit: state.metricUnit,
        bestDirection: state.bestDirection,
      };

      saveConfig(cwd, config, isReinit);

      console.log(bold(green("✓")) + ` Experiment initialized: "${state.name}"`);
      console.log(
        `  Metric: ${state.metricName} (${state.metricUnit || "unitless"}, ${state.bestDirection} is better)`,
      );
      if (isReinit) {
        console.log(dim("  (re-initialized — previous results archived, new baseline needed)"));
      }
      console.log(
        "\nNow run the baseline with: clusterclaw autosearch run --command '<benchmark>'",
      );
    });

  // autosearch run
  autosearch
    .command("run")
    .description("Run a benchmark command")
    .requiredOption("-c, --command <command>", "Shell command to run")
    .option("-t, --timeout <seconds>", "Timeout in seconds", "600")
    .action(async (options) => {
      const cwd = process.cwd();
      const state = loadState(cwd);

      if (!state.name) {
        console.error(
          red("✗") + " No experiment initialized. Run 'clusterclaw autosearch init' first.",
        );
        process.exit(1);
      }

      console.log(bold(yellow("⟳")) + " Running benchmark...");
      console.log(dim(`  Command: ${options.command}`));

      const t0 = Date.now();
      let exitCode = 0;
      let output = "";

      try {
        const result = execSync(options.command, {
          cwd,
          encoding: "utf-8",
          timeout: parseInt(options.timeout) * 1000,
          stdio: ["pipe", "pipe", "pipe"],
        });
        output = result;
      } catch (e: unknown) {
        const err = e as { status?: number; stdout?: string; stderr?: string };
        exitCode = err.status ?? 1;
        output = (err.stdout ?? "") + "\n" + (err.stderr ?? "");
      }

      const durationSeconds = (Date.now() - t0) / 1000;
      const passed = exitCode === 0;

      console.log(passed ? bold(green("✓")) : bold(red("✗")));
      console.log(`  Duration: ${durationSeconds.toFixed(1)}s`);
      console.log(`  Exit code: ${exitCode}`);

      if (!passed) {
        console.log(dim("\nLast 20 lines of output:"));
        console.log(dim(output.split("\n").slice(-20).join("\n")));
      }
    });

  // autosearch log
  autosearch
    .command("log")
    .description("Log an experiment result")
    .requiredOption("-c, --commit <commit>", "Git commit hash (short)")
    .requiredOption("-m, --metric <metric>", "Primary metric value", (val) => parseFloat(val))
    .requiredOption("-s, --status <status>", "Status: keep, discard, crash, checks_failed")
    .requiredOption("-d, --description <description>", "What this experiment tried")
    .option("--metrics <json>", "Additional metrics as JSON", "{}")
    .action(async (options) => {
      const cwd = process.cwd();
      const state = loadState(cwd);

      if (!state.name) {
        console.error(
          red("✗") + " No experiment initialized. Run 'clusterclaw autosearch init' first.",
        );
        process.exit(1);
      }

      const status = options.status as ExperimentResult["status"];
      if (!["keep", "discard", "crash", "checks_failed"].includes(status)) {
        console.error(
          red("✗") + " Invalid status. Must be: keep, discard, crash, or checks_failed",
        );
        process.exit(1);
      }

      let additionalMetrics: Record<string, number> = {};
      try {
        additionalMetrics = JSON.parse(options.metrics);
      } catch {
        console.error(red("✗") + " Invalid JSON for --metrics");
        process.exit(1);
      }

      const result: ExperimentResult = {
        run: state.results.length + 1,
        commit: options.commit.slice(0, 7),
        metric: options.metric,
        metrics: additionalMetrics,
        status,
        description: options.description,
        timestamp: Date.now(),
        segment: state.currentSegment,
      };

      state.results.push(result);
      state.bestMetric = findBaselineMetric(state.results, state.currentSegment);

      // Auto-commit on keep
      if (status === "keep") {
        try {
          const commitMsg = `${options.description}\n\nResult: ${JSON.stringify({ status, [state.metricName]: options.metric, ...additionalMetrics })}`;
          execSync(`git add -A && git commit -m ${JSON.stringify(commitMsg)}`, {
            cwd,
            stdio: "ignore",
          });
          console.log(bold(green("✓")) + " Committed");
        } catch {
          console.log(dim("  Git commit skipped (nothing to commit or error)"));
        }
      }

      saveResult(cwd, result);

      // Show result
      const baseline = state.bestMetric;
      console.log(
        bold(green("✓")) + ` Logged #${result.run}: ${result.status} — ${result.description}`,
      );

      if (baseline !== null) {
        console.log(`  Baseline ${state.metricName}: ${formatNum(baseline, state.metricUnit)}`);
        if (result.metric > 0 && status === "keep") {
          const delta = result.metric - baseline;
          const pct = ((delta / baseline) * 100).toFixed(1);
          const sign = delta > 0 ? "+" : "";
          const improved = isBetter(result.metric, baseline, state.bestDirection);
          console.log(
            `  This run: ${formatNum(result.metric, state.metricUnit)} (${sign}${pct}%) ${improved ? green("✓") : red("✗")}`,
          );
        }
      }
    });

  // autosearch status
  autosearch
    .command("status")
    .description("Show experiment dashboard")
    .action(() => {
      const cwd = process.cwd();
      const state = loadState(cwd);

      if (state.results.length === 0) {
        console.log(dim("No experiments yet. Run 'clusterclaw autosearch init' to start."));
        return;
      }

      console.log(bold("\n🔬 Autosearch Status") + (state.name ? `: ${state.name}` : ""));
      console.log(dim("─".repeat(60)));

      const cur = currentResults(state.results, state.currentSegment);
      const kept = cur.filter((r) => r.status === "keep").length;
      const discarded = cur.filter((r) => r.status === "discard").length;
      const crashed = cur.filter((r) => r.status === "crash").length;

      console.log(
        `  Runs: ${state.results.length} (${green(kept + " kept")}, ${discarded ? yellow(discarded + " discarded") : ""} ${crashed ? red(crashed + " crashed") : ""})`,
      );

      if (state.bestMetric !== null) {
        console.log(
          `  Baseline ${state.metricName}: ${formatNum(state.bestMetric, state.metricUnit)}`,
        );

        // Find best kept
        let bestMetric: number | null = null;
        let bestRun = 0;
        for (let i = state.results.length - 1; i >= 0; i--) {
          const r = state.results[i];
          if (r.segment !== state.currentSegment) {
            continue;
          }
          if (r.status === "keep" && r.metric > 0) {
            if (bestMetric === null || isBetter(r.metric, bestMetric, state.bestDirection)) {
              bestMetric = r.metric;
              bestRun = r.run;
            }
          }
        }

        if (bestMetric !== null) {
          const delta = bestMetric - state.bestMetric;
          const pct = ((delta / state.bestMetric) * 100).toFixed(1);
          const sign = delta > 0 ? "+" : "";
          const improved = isBetter(bestMetric, state.bestMetric, state.bestDirection);
          console.log(
            `  Best ${state.metricName}: ${formatNum(bestMetric, state.metricUnit)} #${bestRun} (${sign}${pct}%) ${improved ? green("✓") : red("✗")}`,
          );
        }
      }

      console.log(dim("\nRecent runs:"));
      const recent = state.results.slice(-5);
      for (const r of recent) {
        const color = r.status === "keep" ? green : r.status === "crash" ? red : yellow;
        console.log(
          `  #${r.run} ${r.commit.slice(0, 7)} ${color(r.status.padEnd(12))} ${r.metric} ${dim(r.description.slice(0, 40))}`,
        );
      }
    });

  return autosearch;
}
