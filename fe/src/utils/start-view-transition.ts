export function startViewTransition(callback: () => void) {
  if ("startViewTransition" in document) {
    (document as any).startViewTransition(() => callback());
    return;
  }
  callback();
}
