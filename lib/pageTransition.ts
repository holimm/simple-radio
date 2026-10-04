export const PAGE_TRANSITION_KEY = "msr-page-transition";

export type PageTransitionTarget = "player" | "home";

export function markPageTransition(target: PageTransitionTarget) {
  try {
    sessionStorage.setItem(PAGE_TRANSITION_KEY, target);
  } catch {
    // Ignore storage failures (private mode, etc.)
  }
}

export function consumePageTransition(
  expected: PageTransitionTarget
): boolean {
  try {
    const value = sessionStorage.getItem(PAGE_TRANSITION_KEY);
    if (value === expected) {
      sessionStorage.removeItem(PAGE_TRANSITION_KEY);
      return true;
    }
  } catch {
    // Ignore storage failures
  }
  return false;
}
