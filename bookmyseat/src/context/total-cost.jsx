"use client";

import { createContext, useState } from "react";

export const totalCost = createContext();

export function TotalCostProvider({ children }) {
  const [total, setTotal] = useState();
  return (
    <totalCost.Provider value={{ total, setTotal }}>
      {children}
    </totalCost.Provider>
  );
}
