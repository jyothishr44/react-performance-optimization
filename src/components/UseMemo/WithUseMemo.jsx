import React, { useMemo, useRef, useState } from "react";
import { initialItems } from "./utils";
import "./UseMemo.css";

const WithUseMemo = () => {
  const [count, setCount] = useState(0);
  const [items] = useState(initialItems);

  // Counts component renders
  const renderCount = useRef(0);
  renderCount.current++;

  // Counts expensive calculations
  const calculationCount = useRef(0);

  const selectedItem = useMemo(() => {
    calculationCount.current++;

    console.time("Expensive Calculation");

    const result = items.find((item) => item.isSelected);

    console.timeEnd("Expensive Calculation");

    return result;
  }, [items]);

  return (
    <div className="container">
      <div className="card">
        <h1>useMemo Performance Demo</h1>

        <div className="info">
          <div className="box">
            <h3>Count</h3>
            <span>{count}</span>
          </div>

          <div className="box">
            <h3>Selected Item</h3>
            <span>{selectedItem.id}</span>
          </div>
        </div>

        <div className="info">
          <div className="box">
            <h3>Render Count</h3>
            <span>{renderCount.current}</span>
          </div>

          <div className="box">
            <h3>Calculation Count</h3>
            <span>{calculationCount.current}</span>
          </div>
        </div>

        <button onClick={() => setCount((prev) => prev + 1)}>
          Increment Count
        </button>
      </div>
    </div>
  );
};

export default WithUseMemo;
