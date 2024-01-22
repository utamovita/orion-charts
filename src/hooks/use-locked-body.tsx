export function useLockedBody() {
  const setLocked = (locked: boolean) => {
    if (locked) {
      document.body.style.overflowY = "hidden";
      document.body.style.paddingRight = `var(--scrollbar-width)`;
    } else {
      document.body.style.overflowY = "";
      document.body.style.paddingRight = "";
    }
  };

  return { setLocked };
}
