# Repository Guidelines

- Repo: https://github.com/kcns008/clusterclaw
- GitHub issues/comments/PR comments: use literal multiline strings or `-F - <<'EOF'` (or $'...') for real newlines; never embed "\\n".

## Project Structure & Module Organization

- **CLI-only tool focused on Kubernetes and OpenShift cluster management**
- Source code: `src/` (CLI wiring in `src/cli`, commands in `src/commands`, infra in `src/infra`).
- Tests: colocated `*.test.ts`.
- Docs: `docs/` (cluster operations, K8s/OpenShift guides). Built output lives in `dist/`.
- Skills: `skills/` directory (kubernetes, github, coding-agent).
- Config directory: `~/.clusterclaw/` (with migration support from legacy `~/.openclaw/`).

## ClusterClaw Focus

ClusterClaw is a specialized fork of OpenClaw focused solely on:
- Kubernetes cluster operations (AKS, EKS, GKE, ARO, ROSA, OpenShift)
- GitOps workflows (ArgoCD, Flux, Kustomize, Helm)
- Cluster troubleshooting and maintenance
- Manifest generation and coding assistance

Removed from OpenClaw:
- All messaging channels (Telegram, Discord, Slack, WhatsApp, Signal, iMessage, etc.)
- Mobile apps (iOS, Android, macOS)
- Web UI
- Non-Kubernetes skills

## Build, Test, and Development Commands

- Runtime baseline: Node **22+**.
- Install deps: `pnpm install`
- Pre-commit hooks: `prek install` (runs same checks as CI)
- Run CLI in dev: `pnpm clusterclaw ...` or `pnpm dev`.
- Type-check/build: `pnpm build`
- Lint/format: `pnpm lint` (oxlint), `pnpm format` (oxfmt)
- Tests: `pnpm test` (vitest); coverage: `pnpm test:coverage`

## Coding Style & Naming Conventions

- Language: TypeScript (ESM). Prefer strict typing; avoid `any`.
- Formatting/linting via Oxlint and Oxfmt; run `pnpm lint` before commits.
- Add brief code comments for tricky or non-obvious logic.
- Keep files concise; extract helpers instead of "V2" copies.
- Aim to keep files under ~500 LOC when feasible.
- Naming: use **ClusterClaw** for product/docs; use `clusterclaw` for CLI command and config keys.

## Release Channels (Naming)

- stable: tagged releases only (e.g. `vYYYY.M.D`), npm dist-tag `latest`.
- beta: prerelease tags `vYYYY.M.D-beta.N`, npm dist-tag `beta`.
- dev: moving head on `main` (no tag; git checkout main).

## Testing Guidelines

- Framework: Vitest with V8 coverage thresholds (70% lines/branches/functions/statements).
- Naming: match source names with `*.test.ts`; e2e in `*.e2e.test.ts`.
- Run `pnpm test` (or `pnpm test:coverage`) before pushing when you touch logic.
- Pure test additions/fixes generally do **not** need a changelog entry unless they alter user-facing behavior.

## Commit & Pull Request Guidelines

- Follow concise, action-oriented commit messages (e.g., `k8s: add support for EKS node groups`).
- Group related changes; avoid bundling unrelated refactors.
- Changelog workflow: keep latest released version at top.
- PRs should summarize scope, note testing performed, and mention any user-facing changes.

## Security & Configuration Tips

- Config directory: `~/.clusterclaw/`
- Sessions live under `~/.clusterclaw/sessions/` by default.
- Environment variables: `CLUSTERCLAW_*` prefix (with legacy `OPENCLAW_*` support for migration).
- Never commit or publish real kubeconfig files, API keys, or cluster credentials.

## Troubleshooting

- Migration issues: run `clusterclaw doctor` for diagnostics.
- Config migration: automatic detection and migration from `~/.openclaw/` to `~/.clusterclaw/`.

## Agent-Specific Notes

- When answering questions, respond with high-confidence answers only: verify in code; do not guess.
- CLI progress: use `src/cli/progress.ts` (`osc-progress` + `@clack/prompts` spinner).
- Status output: keep tables + ANSI-safe wrapping (`src/terminal/table.ts`).
- Bug investigations: read source code of relevant npm dependencies and all related local code before concluding.
- Code style: add brief comments for tricky logic; keep files concise.
- **Multi-agent safety:** focus reports on your edits; avoid guard-rail disclaimers unless truly blocked.
- Lint/format churn: auto-resolve formatting-only changes without asking.

## Environment Variables

ClusterClaw uses the `CLUSTERCLAW_*` prefix for all environment variables:
- `CLUSTERCLAW_STATE_DIR`: Override state directory (default: `~/.clusterclaw`)
- `CLUSTERCLAW_CONFIG_PATH`: Override config file path
- `CLUSTERCLAW_PROFILE`: CLI profile name

Legacy `OPENCLAW_*` and `CLAWDBOT_*` variables are supported for migration.

## NPM Publishing

- OTP: Use your authenticator app for 2FA.
- Publish: `npm publish --access public --otp="<otp>"`.
- Verify: `npm view clusterclaw version`.
