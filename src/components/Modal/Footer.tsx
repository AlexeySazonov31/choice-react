import React, { ReactNode } from "react";

export const Footer: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="px-3 py-4 border-t border-zinc-800">{children}</div>
);