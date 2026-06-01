import { useEffect, useState } from "react";

const TIME_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "numeric",
  // second: "numeric",
  hour12: true,
  timeZoneName: "short",
});

export function useBrowserTime() {
  const [now, setNow] = useState(() => new Date());

  const time = TIME_FORMATTER.format(now);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}
