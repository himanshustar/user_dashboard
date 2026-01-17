export const loadScript = (src: string): Promise<boolean> =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
