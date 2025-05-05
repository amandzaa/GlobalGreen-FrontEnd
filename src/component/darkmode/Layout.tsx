import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <main>{children}</main>
      {/* <ThemeDebugger />  */}
    </ThemeProvider>
  );
}
