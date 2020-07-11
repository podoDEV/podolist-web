export function getLocalStorageDarkMode() {
  return localStorage.getItem("DARK_MODE");
}

export function setLocalStorageDarkMode(darkMode: string | boolean) {
  localStorage.setItem("DARK_MODE", String(darkMode));
}
