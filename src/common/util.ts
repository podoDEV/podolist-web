export const range = (start: number, end: number) => {
  const res: number[] = [];
  if (start <= end) {
    for (let i = start; i < end; i += 1) {
      res.push(i);
    }
  }
  return res;
};

export const isServer = typeof window === "undefined";
export const isIOSBrowser = () => {
  return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
};
