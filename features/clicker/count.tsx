"use client";

import { useState } from "react";

export default function Count() {
  const [count, setCount] = useState(0);

  const handleMinus = () => {
    setCount((count) => Math.max(0, count - 1));
  };

  const handlePlus = () => {
    setCount((count) => count + 1);
  };

  return (
    <div className={"flex items-center gap-2"}>
      <button className={"border p-2"} onClick={handleMinus}>
        -
      </button>
      <p>{count}</p>
      <button className={"border p-2"} onClick={handlePlus}>
        +
      </button>
    </div>
  );
}
