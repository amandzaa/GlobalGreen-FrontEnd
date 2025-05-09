"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/component/layout-dashboard/DashboardLayout";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ReviewsTable, { Review } from "@/component/tables/ReviewsTable";
import { colors } from "@/types";

interface DashboardData {
  totalOrders: number;
  newCustomers: number;
  newOrders: number;
  ordersOnHold: number;
  outOfStockProducts: number;
  completedPayments: number;
  pendingPayments: number;
  percentageDiscount: number;
  fixedCardDiscount: number;
  fixedProductDiscount: number;
  payingCustomers: number;
  nonPayingCustomers: number;
  dailySalesData: { date: string; current: number; previous: number }[];
  newCustomersData: { date: string; value: number }[];
}

// Mock data similar to what's shown in the images
const mockDashboardData: DashboardData = {
  totalOrders: 16247,
  newCustomers: 356,
  newOrders: 57,
  ordersOnHold: 5,
  outOfStockProducts: 15,
  completedPayments: 52,
  pendingPayments: 48,
  percentageDiscount: 72,
  fixedCardDiscount: 18,
  fixedProductDiscount: 10,
  payingCustomers: 30,
  nonPayingCustomers: 70,
  dailySalesData: [
    { date: "01 May", current: 10, previous: 8 },
    { date: "05 May", current: 15, previous: 7 },
    { date: "10 May", current: 15, previous: 7 },
    { date: "15 May", current: 30, previous: 20 },
    { date: "20 May", current: 25, previous: 22 },
    { date: "25 May", current: 18, previous: 25 },
    { date: "30 May", current: 15, previous: 20 },
  ],
  newCustomersData: [
    { date: "01 May", value: 25 },
    { date: "02 May", value: 40 },
    { date: "03 May", value: 30 },
    { date: "04 May", value: 50 },
    { date: "05 May", value: 20 },
    { date: "06 May", value: 60 },
    { date: "07 May", value: 65 },
  ],
};

// Sample data
const sampleReviews: Review[] = [
  {
    id: 1,
    product: "Ergonomic Chair",
    customer: "Jane Cooper",
    customerInitial: "J",
    rating: 5,
    review: "Absolutely love this chair! It's comfortable and sturdy.",
    status: "approved",
    time: "5 mins ago",
  },
  {
    id: 2,
    product: "Standing Desk",
    customer: "Wade Warren",
    customerInitial: "W",
    rating: 4,
    review: "Great desk, assembly was a bit tricky.",
    status: "pending",
    time: "30 mins ago",
  },
  {
    id: 3,
    product: "Monitor Stand",
    customer: "Esther Howard",
    customerInitial: "E",
    rating: 5,
    review: "Perfect height, very stable. Highly recommend!",
    status: "approved",
    time: "1 hour ago",
  },
  {
    id: 4,
    product: "Keyboard",
    customer: "Cameron Wilson",
    customerInitial: "C",
    rating: 3,
    review: "Good but not great. Keys are a bit stiff.",
    status: "approved",
    time: "2 hours ago",
  },
  {
    id: 5,
    product: "Mouse Pad",
    customer: "Jenny Smith",
    customerInitial: "J",
    rating: 4,
    review: "Nice quality material and perfect size for my desk.",
    status: "pending",
    time: "3 hours ago",
  },
  {
    id: 6,
    product: "Desk Lamp",
    customer: "Robert Johnson",
    customerInitial: "R",
    rating: 5,
    review: "Excellent lighting and adjustable brightness is perfect.",
    status: "approved",
    time: "5 hours ago",
  },
  {
    id: 7,
    product: "USB Hub",
    customer: "Michael Brown",
    customerInitial: "M",
    rating: 2,
    review: "Only worked for a few days then stopped.",
    status: "approved",
    time: "1 day ago",
  },
  {
    id: 8,
    product: "Webcam",
    customer: "Sarah Davis",
    customerInitial: "S",
    rating: 4,
    review: "Good picture quality, easy setup.",
    status: "pending",
    time: "1 day ago",
  },
  {
    id: 9,
    product: "Headphones",
    customer: "Thomas Miller",
    customerInitial: "T",
    rating: 5,
    review: "Incredible sound quality and very comfortable.",
    status: "approved",
    time: "2 days ago",
  },
  {
    id: 10,
    product: "Laptop Stand",
    customer: "Emily Jones",
    customerInitial: "E",
    rating: 4,
    review: "Sturdy and keeps my laptop at a good height.",
    status: "approved",
    time: "2 days ago",
  },
  {
    id: 11,
    product: "Wireless Charger",
    customer: "David Wilson",
    customerInitial: "D",
    rating: 3,
    review: "Charges slowly but works reliably.",
    status: "pending",
    time: "3 days ago",
  },
  {
    id: 12,
    product: "Cable Organizer",
    customer: "Lisa Taylor",
    customerInitial: "L",
    rating: 5,
    review: "Finally got my desk cables under control. Great product!",
    status: "approved",
    time: "3 days ago",
  },
  {
    id: 13,
    product: "Footrest",
    customer: "Kevin Anderson",
    customerInitial: "K",
    rating: 4,
    review: "Very comfortable, helps with posture.",
    status: "approved",
    time: "4 days ago",
  },
  {
    id: 14,
    product: "Blue Light Glasses",
    customer: "Patricia Martin",
    customerInitial: "P",
    rating: 5,
    review: "No more eye strain! These are amazing.",
    status: "pending",
    time: "5 days ago",
  },
  {
    id: 15,
    product: "Desk Fan",
    customer: "George Thomas",
    customerInitial: "G",
    rating: 4,
    review: "Quiet operation and good airflow.",
    status: "approved",
    time: "6 days ago",
  },
];


export default function SellerDashboard() {
  const [dateRange, setDateRange] = useState("Mar 1 - 31, 2022");
  const [lastUpdated, setLastUpdated] = useState("");
  const data = mockDashboardData;

  // Calculate percentage change for display
  const orderChangePercentage = -6.8;
  const customerChangePercentage = 26.5;

  useEffect(() => {
    // Format current date to match the UI's format
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options)
      .format(date)
      .replace(",", "");
    
    setLastUpdated(`Last updated: ${formattedDate}`);
  }, []);

  const defaultCollapsed = {
    order: true,
    product: true,
    finance: true,
    store: true,
  };

  return (
    <DashboardLayout
      title="Globalgreen Dashboard"
      breadcrumb="Ecommerce Dashboard"
      activePath="/seller-dashboard"
      defaultCollapsed={defaultCollapsed}
      notificationCount={3}
      messageCount={2}
    >
      <div
        className="min-h-screen"
        style={{ backgroundColor: colors.paleGreen }}
      >
        {/* Main Dashboard Content */}
        <main className="container mx-auto p-4">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h2
                  className="text-2xl font-bold"
                  style={{ color: colors.darkGreen }}
                >
                  Globalgreen Dashboard
                </h2>
                <p style={{ color: colors.primary }}>
                  Here&apos;s what&apos;s going on at your business right now
                </p>
              </div>
              <p className="text-sm text-gray-500">{lastUpdated}</p>
            </div>
          </div>

          {/* Order Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center mr-4"
                style={{ backgroundColor: `${colors.primary}30` }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke={colors.primary}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div>
                <h3
                  className="font-bold text-lg"
                  style={{ color: colors.darkGreen }}
                >
                  {data.newOrders} new orders
                </h3>
                <p className="text-sm" style={{ color: colors.primary }}>
                  Awaiting processing
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center mr-4"
                style={{ backgroundColor: `${colors.secondary}70` }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke={colors.darkGreen}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3
                  className="font-bold text-lg"
                  style={{ color: colors.darkGreen }}
                >
                  {data.ordersOnHold} orders
                </h3>
                <p className="text-sm" style={{ color: colors.primary }}>
                  On hold
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center mr-4"
                style={{ backgroundColor: `${colors.darkGreen}20` }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke={colors.darkGreen}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <div>
                <h3
                  className="font-bold text-lg"
                  style={{ color: colors.darkGreen }}
                >
                  {data.outOfStockProducts} products
                </h3>
                <p className="text-sm" style={{ color: colors.primary }}>
                  Out of stock
                </p>
              </div>
            </div>
          </div>

          {/* Main Dashboard Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            {/* Sales Chart */}
            <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3
                    className="font-bold text-lg"
                    style={{ color: colors.darkGreen }}
                  >
                    Total sells
                  </h3>
                  <p className="text-sm" style={{ color: colors.primary }}>
                    Payment received across all channels
                  </p>
                </div>
                <select
                  className="border rounded-md px-3 py-2 text-sm"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  style={{
                    borderColor: colors.primary,
                    color: colors.darkGreen,
                  }}
                >
                  <option value="Mar 1 - 31, 2022">Mar 1 - 31, 2022</option>
                  <option value="Apr 1 - 30, 2022">Apr 1 - 30, 2022</option>
                  <option value="May 1 - 31, 2022">May 1 - 31, 2022</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.dailySalesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="current"
                      stroke={colors.primary}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                      name="Current Period"
                    />
                    <Line
                      type="monotone"
                      dataKey="previous"
                      stroke={colors.secondary}
                      strokeDasharray="4 4"
                      strokeWidth={2}
                      dot={false}
                      name="Previous Period"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-4">
              {/* Total Orders */}
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-sm" style={{ color: colors.darkGreen }}>
                      Total orders
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: colors.primary }}
                    >
                      Last 7 days
                    </p>
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded ${
                      orderChangePercentage >= 0 ? "bg-green-100" : "bg-red-100"
                    }`}
                    style={{
                      color:
                        orderChangePercentage >= 0
                          ? colors.darkGreen
                          : "#DC2626",
                    }}
                  >
                    {orderChangePercentage >= 0 ? "+" : ""}
                    {orderChangePercentage}%
                  </div>
                </div>
                <div className="flex items-end">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: colors.darkGreen }}
                  >
                    {data.totalOrders.toLocaleString()}
                  </span>
                </div>
                <div className="mt-4 h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={Array(7).fill(0).map(() => ({
                        value: Math.random() * 10 + 5,
                      }))}
                    >
                      <Bar dataKey="value" fill={colors.primary} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: colors.primary }}
                    ></div>
                    <span
                      className="text-xs"
                      style={{ color: colors.darkGreen }}
                    >
                      Completed
                    </span>
                  </div>
                  <span
                    className="text-xs font-medium"
                    style={{ color: colors.darkGreen }}
                  >
                    {data.completedPayments}%
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                    <span
                      className="text-xs"
                      style={{ color: colors.darkGreen }}
                    >
                      Pending payment
                    </span>
                  </div>
                  <span
                    className="text-xs font-medium"
                    style={{ color: colors.darkGreen }}
                  >
                    {data.pendingPayments}%
                  </span>
                </div>
              </div>

              {/* New Customers */}
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-sm" style={{ color: colors.darkGreen }}>
                      New customers
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: colors.primary }}
                    >
                      Last 7 days
                    </p>
                  </div>
                  <div
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: `${colors.primary}20`,
                      color: colors.darkGreen,
                    }}
                  >
                    +{customerChangePercentage}%
                  </div>
                </div>
                <div className="flex items-end">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: colors.darkGreen }}
                  >
                    {data.newCustomers}
                  </span>
                </div>
                <div className="mt-2 h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.newCustomersData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={colors.primary}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-8">
            <h2 
              className="text-xl mb-4"
              style={{ color: colors.darkGreen }}
            >
              Recent Reviews
            </h2>
            <ReviewsTable
              reviews={sampleReviews}
              title="Customer Feedback"
              subtitle="All recent product reviews"
              defaultItemsPerPage={10}
            />
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}