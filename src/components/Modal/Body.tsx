import React, { ReactNode } from "react";

export const Body: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="px-7 py-6">{children}</div>
);
