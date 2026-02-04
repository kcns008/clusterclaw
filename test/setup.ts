import { afterAll, afterEach, beforeEach, vi } from "vitest";

// Ensure Vitest environment is properly set
process.env.VITEST = "true";

import { installProcessWarningFilter } from "../src/infra/warnings.js";
import { withIsolatedTestHome } from "./test-env";

installProcessWarningFilter();

const testEnv = withIsolatedTestHome();
afterAll(() => testEnv.cleanup());

beforeEach(() => {
  // Reset any state before each test
});

afterEach(() => {
  // Guard against leaked fake timers across test files/workers.
  vi.useRealTimers();
});
