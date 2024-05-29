import React, { ReactNode } from "react";

export const Head: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="block bg-zinc-900 px-7 py-5 border-b border-zinc-800">
      <h1 className="text-2xl font-semibold text-zinc-100">{children}</h1>
    </div>
  );
  