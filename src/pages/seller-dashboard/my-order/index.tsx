import { useState } from "react";
import {
  ChevronDown,
  Leaf,
  ShoppingBag,
  Package,
  FileText,
  Star,
  PieChart,
  Calendar,
  Tag,
  Search,
  Bell,
  MessageCircle,
  Filter,
  ChevronRight,
  Download,
  UploadCloud,
} from "lucide-react";
import DashboardLayout from "@/component/dashboardNavbarLayout/DashboardLayout";
import OrdersTable from "@/component/tables/OrdersTable";

// Define TypeScript interfaces
interface Product {
  id: string;
  image: string;
  name: string;
  variant: string;
  price: string;
  quantity: number;
  total: string;
  status: string;
  countdown?: string;
  delivery: string;
  orderDate: string;
}

interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  dark: string;
  white: string;
  lightGray: string;
  text: string;
}

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState<string>("all");
  // Sample products data
  const products: Product[] = [
    {
      id: "ORD-5829",
      image: "/api/placeholder/80/80",
      name: "Organic Kale Bundle",
      variant: "Fresh, 500g",
      price: "$12.99",
      quantity: 3,
      total: "$38.97",
      status: "To be sent",
      countdown: "23:45:12",
      delivery: "Express Delivery",
      orderDate: "Apr 30, 2025",
    },
    {
      id: "ORD-5830",
      image: "/api/placeholder/80/80",
      name: "Local Avocados",
      variant: "Ripe, Pack of 4",
      price: "$8.99",
      quantity: 2,
      total: "$17.98",
      status: "Paid",
      countdown: "47:20:33",
      delivery: "Standard Shipping",
      orderDate: "Apr 29, 2025",
    },
    {
      id: "ORD-5831",
      image: "/api/placeholder/80/80",
      name: "Almond Milk",
      variant: "Unsweetened, 1L",
      price: "$3.49",
      quantity: 5,
      total: "$17.45",
      status: "Delivered",
      countdown: "00:00:00",
      delivery: "Standard Shipping",
      orderDate: "Apr 28, 2025",
    },
    {
      id: "ORD-5832",
      image: "/api/placeholder/80/80",
      name: "Quinoa",
      variant: "Organic, 1kg",
      price: "$9.99",
      quantity: 1,
      total: "$9.99",
      status: "Cancelled",
      countdown: "00:00:00",
      delivery: "N/A",
      orderDate: "Apr 27, 2025",
    },
    {
      id: "ORD-5833",
      image: "/api/placeholder/80/80",
      name: "Fresh Strawberries",
      variant: "500g, Sweet",
      price: "$6.49",
      quantity: 4,
      total: "$25.96",
      status: "To be sent",
      countdown: "12:18:44",
      delivery: "Express Delivery",
      orderDate: "Apr 30, 2025",
    },
    {
      id: "ORD-5834",
      image: "/api/placeholder/80/80",
      name: "Whole Wheat Bread",
      variant: "Baked Today",
      price: "$4.25",
      quantity: 2,
      total: "$8.50",
      status: "Paid",
      countdown: "35:10:00",
      delivery: "Standard Shipping",
      orderDate: "Apr 29, 2025",
    },
    {
      id: "ORD-5835",
      image: "/api/placeholder/80/80",
      name: "Greek Yogurt",
      variant: "Plain, 500g",
      price: "$5.99",
      quantity: 3,
      total: "$17.97",
      status: "To be sent",
      countdown: "19:22:10",
      delivery: "Standard Shipping",
      orderDate: "Apr 30, 2025",
    },
    {
      id: "ORD-5836",
      image: "/api/placeholder/80/80",
      name: "Brown Eggs",
      variant: "Free Range, Dozen",
      price: "$6.75",
      quantity: 1,
      total: "$6.75",
      status: "Delivered",
      countdown: "00:00:00",
      delivery: "Express Delivery",
      orderDate: "Apr 26, 2025",
    }
  ];
  

  // Colors from palette
  const colors: ColorPalette = {
    primary: "#2E8B57", // Medium green
    secondary: "#87CEEB", // Light blue
    background: "#E6F4EA", // Very light green
    dark: "#20603D", // Dark green
    white: "#FFFFFF",
    lightGray: "#F5F7F5",
    text: "#333333",
  };

  // Default collapsed sections
  const defaultCollapsed = {
    order: false,
    product: true,
    finance: true,
    store: true,
  };

  return (
    <DashboardLayout
      title="My Order"
      breadcrumb=" Order > My Order"
      activePath="/seller-dashboard/my-order"
      defaultCollapsed={defaultCollapsed}
      notificationCount={38}
      messageCount={1}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600">Orders</span>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="font-medium" style={{ color: colors.primary }}>
              My Orders
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  width: "240px",
                  fontSize: "14px",
                  borderColor: colors.primary,
                }}
              />
              <Search
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />
            </div>

            <div className="relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                3
              </span>
            </div>

            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">FG</span>
            </div>
          </div>
        </header>
        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Page Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h1
                className="text-xl font-medium"
                style={{ color: colors.dark }}
              >
                My Orders
              </h1>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 border rounded text-sm flex items-center gap-2"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  <Download size={16} />
                  <span>Export</span>
                </button>
                <button
                  className="px-4 py-2 rounded text-sm flex items-center gap-2 text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  <UploadCloud size={16} />
                  <span>Download History</span>
                </button>
              </div>
            </div>

            {/* Order Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === "all" ? "border-b-2" : "text-gray-600"
                  }`}
                  style={{
                    borderColor:
                      activeTab === "all" ? colors.primary : "transparent",
                    color: activeTab === "all" ? colors.primary : "",
                  }}
                  onClick={() => setActiveTab("all")}
                >
                  All Orders
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === "notPaid" ? "border-b-2" : "text-gray-600"
                  }`}
                  style={{
                    borderColor:
                      activeTab === "notPaid" ? colors.primary : "transparent",
                    color: activeTab === "notPaid" ? colors.primary : "",
                  }}
                  onClick={() => setActiveTab("notPaid")}
                >
                  Not yet paid
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === "toBeSent" ? "border-b-2" : "text-gray-600"
                  }`}
                  style={{
                    borderColor:
                      activeTab === "toBeSent" ? colors.primary : "transparent",
                    color: activeTab === "toBeSent" ? colors.primary : "",
                  }}
                  onClick={() => setActiveTab("toBeSent")}
                >
                  Need to be sent
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === "sent" ? "border-b-2" : "text-gray-600"
                  }`}
                  style={{
                    borderColor:
                      activeTab === "sent" ? colors.primary : "transparent",
                    color: activeTab === "sent" ? colors.primary : "",
                  }}
                  onClick={() => setActiveTab("sent")}
                >
                  Sent
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === "finished" ? "border-b-2" : "text-gray-600"
                  }`}
                  style={{
                    borderColor:
                      activeTab === "finished" ? colors.primary : "transparent",
                    color: activeTab === "finished" ? colors.primary : "",
                  }}
                  onClick={() => setActiveTab("finished")}
                >
                  Finished
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === "refund" ? "border-b-2" : "text-gray-600"
                  }`}
                  style={{
                    borderColor:
                      activeTab === "refund" ? colors.primary : "transparent",
                    color: activeTab === "refund" ? colors.primary : "",
                  }}
                  onClick={() => setActiveTab("refund")}
                >
                  Refund/Cancellation
                </button>
              </div>
            </div>

            {/* Search Filters */}
            <div
              className="p-4 flex flex-wrap gap-2 bg-gray-50"
              style={{ backgroundColor: colors.lightGray }}
            >
              <div className="flex items-center w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <select className="w-full border rounded-l py-2 px-3 appearance-none bg-white pr-8 text-sm">
                    <option>Order No.</option>
                    <option>Product Name</option>
                    <option>Customer</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-3 text-gray-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter search term"
                  className="flex-1 md:flex-none md:w-64 border-l-0 border py-2 px-3 text-sm"
                />
              </div>

              <div className="flex items-center w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <select className="w-full border rounded py-2 px-3 appearance-none bg-white pr-8 text-sm">
                    <option>All Delivery Services</option>
                    <option>Express Delivery</option>
                    <option>Standard Shipping</option>
                    <option>Local Pickup</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-3 text-gray-500"
                  />
                </div>
              </div>

              <div className="flex items-center w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <select className="w-full border rounded py-2 px-3 appearance-none bg-white pr-8 text-sm">
                    <option>Date Range</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Custom range</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-3 text-gray-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  className="text-white rounded px-6 py-2 text-sm flex items-center gap-2"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Filter size={14} />
                  <span>Apply Filters</span>
                </button>
                <button className="border rounded px-6 py-2 text-sm">
                  Reset
                </button>
              </div>
            </div>

            {/* Orders Table Component */}
            <OrdersTable products={products} colors={colors} />
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}