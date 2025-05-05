import React, { ReactNode } from "react";
import Header from "../layout-dashboard/Header";
import { ThemeProvider } from "./ThemeProvider";
import ThemeDebugger from "./ThemeDebugger";

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
