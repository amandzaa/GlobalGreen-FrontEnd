"use client";

import React, { ReactNode} from "react";
import { ChevronRight} from "lucide-react";
import Sidebar from "./Sidebar";
import FloatingActionButtons from "./FloatingActionButtons";
import Header from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumb: string;
  activePath: string;
  defaultCollapsed?: {
    [key: string]: boolean;
  };
  notificationCount?: number;
  messageCount?: number;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  breadcrumb,
  activePath,
  defaultCollapsed = {},
  notificationCount = 0,
  messageCount = 0,
}) => {
  // Parse breadcrumb string into separate parts
  const breadcrumbParts = breadcrumb.split(" > ").map((part, index, array) => ({
    text: part,
    isLast: index === array.length - 1,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header notificationCount={notificationCount} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar defaultCollapsed={defaultCollapsed} activePath={activePath} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Breadcrumb */}
          <nav className="bg-white border-b border-gray-200 py-3 px-4 flex items-center">
            <div className="flex items-center text-sm text-gray-500">
              {breadcrumbParts.map((part, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <ChevronRight size={16} className="mx-2 text-gray-400" />
                  )}
                  <span
                    className={
                      part.isLast
                        ? "text-gray-700"
                        : "text-gray-500 hover:text-gray-700"
                    }
                  >
                    {part.text}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </nav>

          {/* Page content */}
          <div className="p-4">{children}</div>
        </main>

        {/* Optional: Notifications sidebar could be added here */}
      </div>

      {/* Floating Action Buttons
      <FloatingActionButtons
        notificationCount={{ count: notificationCount }}
        messageCount={{ count: messageCount }}
      /> */}
    </div>
  );
};

export default DashboardLayout;
