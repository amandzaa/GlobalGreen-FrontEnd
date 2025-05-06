// app/seller-dashboard/my-income/page.tsx
"use client";

import React, { useState } from "react";
import { Calendar, ChevronRight, Download, Info, Search } from "lucide-react";
import DashboardLayout from "@/component/layout-dashboard/DashboardLayout";
import { colors } from "@/types";

const MyIncomePage = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "released">(
    "released"
  );
  const [dateRange, setDateRange] = useState("21/04/2025 - 27/04/2025");

  // Mocked data
  const incomeData = {
    pending: {
      total: 125000,
    },
    released: {
      thisWeek: 175000,
      thisMonth: 320000,
      total: 485000,
    },
  };

  const transactionNotes = [
    { period: "14 April - 20 April 2025", id: "1", amount: 125000 },
    { period: "7 April - 13 April 2025", id: "2", amount: 95000 },
    { period: "31 Mar - 6 Apr 2025", id: "3", amount: 100000 },
  ];

  const handleDateRangeChange = (newRange: string) => {
    setDateRange(newRange);
    // Future implementation for date range filter
  };

  return (
    <DashboardLayout
      title="My Income"
      breadcrumb="Finance > My Income"
      activePath="/seller-dashboard/my-income"
      defaultCollapsed={{finance: false}}
      notificationCount={3}
      messageCount={2}
    >
      {/* Income Information */}
      <div className="bg-white rounded-md p-4 mb-4">
        <h2 className="text-lg font-medium mb-4">Income Information</h2>
        <div
          className="border rounded-md p-4 mb-4 flex items-start"
          style={{
            backgroundColor: colors.secondary + "30",
            borderColor: colors.secondary,
          }}
        >
          <Info
            size={20}
            style={{ color: colors.accent }}
            className="mr-2 flex-shrink-0 mt-1"
          />
          <p className="text-sm text-gray-600">
            The &ldquo;Pending&rdquo; and &ldquo;Already Released&rdquo; amounts do not include
            adjustment fees. Download the Income Statement or Income Transaction
            Notes to see the adjustment details.
          </p>
        </div>

        <div className="flex">
          {/* Pending Income */}
          <div className="w-1/2 border-r border-gray-200 pr-4">
            <h3
              className="font-medium mb-2"
              style={{ color: colors.darkGreen }}
            >
              Pending
            </h3>
            <div className="mb-2">
              <span className="text-xs text-gray-500">Total</span>
              <p className="text-xl font-medium">
                Rp{incomeData.pending.total}
              </p>
            </div>
          </div>

          {/* Released Income */}
          <div className="w-1/2 pl-4">
            <h3
              className="font-medium mb-2"
              style={{ color: colors.darkGreen }}
            >
              Already Released
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-xs text-gray-500">This week</span>
                <p className="text-xl font-medium">
                  Rp{incomeData.released.thisWeek}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500">This month</span>
                <p className="text-xl font-medium">
                  Rp{incomeData.released.thisMonth}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Total</span>
                <p className="text-xl font-medium">
                  Rp{incomeData.released.total}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="text-sm flex items-center"
            style={{ color: colors.accent }}
          >
            Seller Balance <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Income Details */}
      <div className="bg-white rounded-md p-4 mb-4">
        <h2 className="text-lg font-medium mb-4">Income Details</h2>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "pending" ? "border-b-2" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("pending")}
            style={
              activeTab === "pending"
                ? { color: colors.primary, borderColor: colors.primary }
                : {}
            }
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "released" ? "border-b-2" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("released")}
            style={
              activeTab === "released"
                ? { color: colors.primary, borderColor: colors.primary }
                : {}
            }
          >
            Already Released
          </button>
        </div>

        {/* Filter */}
        <div className="flex justify-between mb-4">
          <div 
            className="relative border border-gray-300 rounded-md flex items-center p-2 w-64 cursor-pointer"
            onClick={() => handleDateRangeChange(dateRange)}
          >
            <Calendar size={16} className="text-gray-400 mr-2" />
            <span className="text-sm">{dateRange}</span>
            <ChevronRight size={16} className="text-gray-400 ml-2 rotate-90" />
          </div>

          <div className="flex">
            <div className="relative mr-2">
              <input
                type="text"
                placeholder="Search Orders"
                className="border border-gray-300 rounded-md px-3 py-2 pl-9 text-sm w-64"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <button
              className="border rounded-md px-4 py-2 text-sm text-white"
              style={{
                backgroundColor: colors.accent,
                borderColor: colors.accent,
              }}
            >
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <div
            className="grid grid-cols-5 p-3 border-b border-gray-200 text-sm"
            style={{
              backgroundColor: colors.paleGreen,
              color: colors.darkGreen,
            }}
          >
            <div>Order</div>
            <div>Funds Release Date</div>
            <div>Status</div>
            <div>Payment Methods</div>
            <div>Total Income</div>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-16 px-4 text-gray-400">
            <div className="mb-4">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="16"
                  y="16"
                  width="32"
                  height="32"
                  rx="2"
                  stroke="#D1D5DB"
                  strokeWidth="2"
                />
                <path
                  d="M24 32H40"
                  stroke="#D1D5DB"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M32 24V40"
                  stroke="#D1D5DB"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-center text-sm">No Data</p>
          </div>
        </div>
      </div>

      {/* Income Transaction Notes and Invoice */}
      <div className="grid grid-cols-2 gap-4">
        {/* Transaction Notes */}
        <div className="bg-white rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Income Transaction Notes</h2>
            <button
              className="text-sm flex items-center"
              style={{ color: colors.accent }}
            >
              Other <ChevronRight size={16} />
            </button>
          </div>

          <ul>
            {transactionNotes.map((note) => (
              <li
                key={note.id}
                className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
              >
                <span className="text-sm">{note.period}</span>
                <button style={{ color: colors.accent }}>
                  <Download size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* My Invoice */}
        <div className="bg-white rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">My Invoice</h2>
            <button
              className="text-sm flex items-center"
              style={{ color: colors.accent }}
            >
              Other <ChevronRight size={16} />
            </button>
          </div>

          {/* Empty invoice list */}
          <div className="flex flex-col items-center justify-center py-8 px-4 text-gray-400">
            <p className="text-center text-sm">No invoices available</p>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="bg-white rounded-md p-4 mt-4">
        <h2 className="text-lg font-medium mb-4">News</h2>

        <div
          className="pl-4 py-2 border-l-4"
          style={{ borderColor: colors.primary }}
        >
          <h3 className="text-sm font-medium flex items-center">
            <span className="mr-2" style={{ color: colors.primary }}>
              🔥
            </span>
            Take a Peek First! The Secret to Increasing Orders
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            There&apos;s a fun way to keep ads from Creators running, but pay later
            after they sell! Check out tips &amp; tricks to optimize Affiliate...
          </p>
          <p className="text-xs text-gray-400 mt-1">24-04-2025 00:00</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyIncomePage;