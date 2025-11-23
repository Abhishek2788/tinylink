"use client";
import { useEffect, useState } from "react";

export default function ClientDate({ value }) {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    if (value) {
      setFormatted(new Date(value).toLocaleString());
    }
  }, [value]);

  return <span>{formatted || "…"}</span>;
}



// "use client";

// export default function ClientDate({ value }) {
//   if (!value) return "—";
//   return new Date(value).toLocaleString();
// }
