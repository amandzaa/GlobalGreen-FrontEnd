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
} from "lucide-react";
import DashboardLayout from "@/component/layout-dashboard/DashboardLayout";
import OrdersTable from "@/component/tables/component-tables/OrdersTable";
import ActionButtons from "@/component/ActionButtons";

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
    },
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

  // Export and Download History functionality is now implemented in the ActionButtons component

  return (
    <DashboardLayout
      title="My Order"
      breadcrumb=" Order > My Order"
      activePath="/seller-dashboard/my-order"
      defaultCollapsed={{order:false}}
      notificationCount={38}
      messageCount={1}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
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
              
              {/* Using the new ActionButtons component with products data */}
              <ActionButtons 
                primaryColor={colors.primary}
                products={products}
              />
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

            {/* Orders Table Component */}
            <OrdersTable products={products} colors={colors} />
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}