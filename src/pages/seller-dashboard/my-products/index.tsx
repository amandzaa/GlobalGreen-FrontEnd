// app/seller-dashboard/my-products/page.tsx
"use client";

import { useState } from "react";
import { ChevronDown, Search, Info } from "lucide-react";
import DashboardLayout from "@/component/dashboardNavbarLayout/DashboardLayout";
import ProductTable, { Product } from "@/component/tables/ProductTable";

type ProductTab =
  | "all"
  | "live"
  | "needAction"
  | "underReview"
  | "notYetDisplayed";

export default function MyProductsPage() {
  const [activeTab, setActiveTab] = useState<ProductTab>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Default collapsed sections
  const defaultCollapsed = {
    order: true,
    product: false,
    finance: true,
    store: true,
  };

  // Sample products data
  const products: Product[] = [
    {
      id: "1",
      name: "Premium Laptop Pro",
      parentSku: "LAP-PRO-17",
      productId: "LP17001",
      image: "",
      sale: 189,
      price: "$1499.99",
      stock: 32,
      status: "active",
    },
    {
      id: "2",
      name: "Wireless Noise-Cancelling Headphones",
      parentSku: "AUDIO-WH-200",
      productId: "AWH20022",
      image: "",
      sale: 327,
      price: "$179.99",
      stock: 85,
      status: "active",
    },
    {
      id: "3",
      name: "Smart Watch Series X",
      parentSku: "WATCH-SMX-44",
      productId: "WSX4433",
      image: "",
      sale: 251,
      price: "$299.99",
      stock: 41,
      status: "needImproved",
      qualityInfo: {
        message: "Missing technical specifications",
        level: "warning",
      },
    },
    {
      id: "4",
      name: "Mechanical Keyboard RGB",
      parentSku: "KB-MECH-RGB",
      productId: "KBM0144",
      image: "",
      sale: 116,
      price: "$129.99",
      stock: 67,
      status: "active",
    },
    {
      id: "5",
      name: "4K Curved Gaming Monitor",
      parentSku: "MON-CRV-32",
      productId: "MC3255",
      image: "",
      sale: 83,
      price: "$429.99",
      stock: 18,
      status: "active",
    },
    {
      id: "6",
      name: "External SSD 2TB",
      parentSku: "SSD-EXT-2T",
      productId: "SE2T66",
      image: "",
      sale: 203,
      price: "$219.99",
      stock: 54,
      status: "needImproved",
      qualityInfo: {
        message: "Missing detailed images",
        level: "info",
      },
    },
    {
      id: "7",
      name: "Ergonomic Office Chair",
      parentSku: "FURN-CHAIR-ERG",
      productId: "FCE0077",
      image: "",
      sale: 94,
      price: "$249.99",
      stock: 12,
      status: "needImproved",
      qualityInfo: {
        message: "Incomplete dimension specifications",
        level: "warning",
      },
    },
    {
      id: "8",
      name: "Wireless Gaming Mouse",
      parentSku: "MOUSE-WL-GM",
      productId: "MWG0088",
      image: "",
      sale: 178,
      price: "$89.99",
      stock: 105,
      status: "active",
    },
    {
      id: "9",
      name: "Bluetooth Portable Speaker",
      parentSku: "AUDIO-SPK-BT",
      productId: "ASB0099",
      image: "",
      sale: 231,
      price: "$69.99",
      stock: 72,
      status: "active",
    },
    {
      id: "10",
      name: "Smart Home Hub",
      parentSku: "SMRT-HUB-01",
      productId: "SHH0100",
      image: "",
      sale: 156,
      price: "$129.99",
      stock: 29,
      status: "needImproved",
      qualityInfo: {
        message: "Missing compatibility information",
        level: "error",
      },
    },
    {
      id: "11",
      name: "Digital Graphics Tablet",
      parentSku: "TAB-GRPH-12",
      productId: "TGT1211",
      image: "",
      sale: 87,
      price: "$189.99",
      stock: 34,
      status: "active",
    },
    {
      id: "12",
      name: 'Ultra-Wide Monitor 34"',
      parentSku: "MON-UW-34",
      productId: "MUW3412",
      image: "",
      sale: 64,
      price: "$549.99",
      stock: 8,
      status: "needImproved",
      qualityInfo: {
        message: "Low stock alert",
        level: "warning",
      },
    },
    {
      id: "13",
      name: "Wi-Fi 6E Router",
      parentSku: "NET-RTR-6E",
      productId: "NR6E1313",
      image: "",
      sale: 112,
      price: "$199.99",
      stock: 46,
      status: "active",
    },
    {
      id: "14",
      name: "Webcam 4K Pro",
      parentSku: "CAM-WEB-4K",
      productId: "CW4K1414",
      image: "",
      sale: 143,
      price: "$129.99",
      stock: 62,
      status: "active",
    },
    {
      id: "15",
      name: "USB-C Docking Station",
      parentSku: "USBC-DOCK-12",
      productId: "UCD1515",
      image: "",
      sale: 176,
      price: "$149.99",
      stock: 51,
      status: "active",
    },
    {
      id: "16",
      name: "Smart Thermostat",
      parentSku: "SMRT-THERM-2",
      productId: "ST21616",
      image: "",
      sale: 98,
      price: "$119.99",
      stock: 37,
      status: "needImproved",
      qualityInfo: {
        message: "Missing installation guide",
        level: "info",
      },
    },
    {
      id: "17",
      name: "Digital Camera DSLR",
      parentSku: "CAM-DSLR-PRO",
      productId: "CDP1717",
      image: "",
      sale: 42,
      price: "$899.99",
      stock: 15,
      status: "needImproved",
      qualityInfo: {
        message: "Incomplete lens compatibility list",
        level: "warning",
      },
    },
    {
      id: "18",
      name: "Electric Standing Desk",
      parentSku: "FURN-DESK-STD",
      productId: "FDS1818",
      image: "",
      sale: 71,
      price: "$399.99",
      stock: 23,
      status: "active",
    },
    {
      id: "19",
      name: "Portable Power Bank 30000mAh",
      parentSku: "PWR-BANK-30K",
      productId: "PB30K1919",
      image: "",
      sale: 284,
      price: "$79.99",
      stock: 91,
      status: "active",
    },
    {
      id: "20",
      name: "Gaming Console Pro",
      parentSku: "GAME-CONS-PRO",
      productId: "GCP2020",
      image: "",
      sale: 127,
      price: "$499.99",
      stock: 5,
      status: "needImproved",
      qualityInfo: {
        message: "Critical low stock",
        level: "error",
      },
    },
  ];

  // Filter products based on active tab
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Filter by tab
    if (activeTab === "live") {
      filtered = filtered.filter((p) => p.status === "live");
    } else if (activeTab === "needAction") {
      filtered = filtered.filter((p) => p.status === "needImproved");
    } else if (activeTab === "underReview") {
      filtered = filtered.filter((p) => p.status === "underReview");
    } else if (activeTab === "notYetDisplayed") {
      filtered = filtered.filter((p) => p.status === "notYetDisplayed");
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.productId.includes(searchTerm) ||
          p.parentSku.includes(searchTerm)
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Get counts for tabs
  const liveCount = products.filter((p) => p.status === "live").length;
  const needActionCount = products.filter(
    (p) => p.status === "needImproved"
  ).length;
  const underReviewCount = products.filter(
    (p) => p.status === "underReview"
  ).length;
  const notYetDisplayedCount = products.filter(
    (p) => p.status === "notYetDisplayed"
  ).length;

  return (
    <DashboardLayout
      title="My Products"
      breadcrumb="Product > My Products"
      activePath="/seller-dashboard/my-products"
      defaultCollapsed={defaultCollapsed}
      notificationCount={38}
      messageCount={1}
    >
      <div className="p-6 bg-[#F7FAF7]">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-medium text-[#20603D]">My Products</h1>
          <div className="flex gap-2">
            <div className="relative">
              <button className="px-4 py-2 border border-[#2E8B57] text-[#2E8B57] rounded text-sm bg-white hover:bg-[#F7FAF7] flex items-center">
                Product Settings <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
            <div className="relative">
              <button className="px-4 py-2 border border-[#2E8B57] text-[#2E8B57] rounded text-sm bg-white hover:bg-[#F7FAF7] flex items-center">
                Mass Setup <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
            <button className="bg-[#2E8B57] text-white px-4 py-2 rounded text-sm font-medium flex items-center hover:bg-[#20603D]">
              <span className="mr-1">+</span> Add New Product
            </button>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="border-b border-gray-200 bg-white rounded-t-md shadow-sm">
          <div className="flex">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "all"
                  ? "text-[#2E8B57] border-b-2 border-[#2E8B57]"
                  : "text-gray-600 hover:text-[#2E8B57]"
              }`}
            >
              All ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("live")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "live"
                  ? "text-[#2E8B57] border-b-2 border-[#2E8B57]"
                  : "text-gray-600 hover:text-[#2E8B57]"
              }`}
            >
              Live ({liveCount})
            </button>
            <button
              onClick={() => setActiveTab("needAction")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "needAction"
                  ? "text-[#2E8B57] border-b-2 border-[#2E8B57]"
                  : "text-gray-600 hover:text-[#2E8B57]"
              }`}
            >
              Need Action ({needActionCount})
            </button>
            <button
              onClick={() => setActiveTab("underReview")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "underReview"
                  ? "text-[#2E8B57] border-b-2 border-[#2E8B57]"
                  : "text-gray-600 hover:text-[#2E8B57]"
              }`}
            >
              Under Review by GlobalGreen ({underReviewCount})
            </button>
            <button
              onClick={() => setActiveTab("notYetDisplayed")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "notYetDisplayed"
                  ? "text-[#2E8B57] border-b-2 border-[#2E8B57]"
                  : "text-gray-600 hover:text-[#2E8B57]"
              }`}
            >
              Not Yet Displayed ({notYetDisplayedCount})
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-4 border-b border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Products"
                className="w-full border border-gray-300 rounded pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-2.5">
                <Search size={16} className="text-gray-400" />
              </div>
              <div className="absolute right-3 top-2.5 text-gray-400 text-xs">
                Search Product Name, Parent SKU, Variation Code, Product ID
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Product Categories"
                className="w-full border border-gray-300 rounded pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              />
              <div className="absolute left-3 top-2.5">
                <Search size={16} className="text-gray-400" />
              </div>
              <div className="absolute right-3 top-2.5 text-gray-400 text-xs">
                Search by category
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded">
                <div className="px-3 py-2 text-sm text-gray-600 bg-[#E6F4EA] border-r border-gray-300">
                  Program GlobalGreen
                </div>
                <select className="flex-1 appearance-none bg-transparent py-2 pl-3 pr-8 text-sm focus:outline-none">
                  <option>Choose</option>
                </select>
                <div className="absolute right-3 top-3">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded">
                <div className="px-3 py-2 text-sm text-gray-600 bg-[#E6F4EA] border-r border-gray-300">
                  Product Type
                </div>
                <select className="flex-1 appearance-none bg-transparent py-2 pl-3 pr-8 text-sm focus:outline-none">
                  <option>Choose</option>
                </select>
                <div className="absolute right-3 top-3">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <button className="bg-[#2E8B57] text-white rounded px-6 py-2 text-sm mr-2 hover:bg-[#20603D]">
              Apply
            </button>
            <button className="border border-gray-300 rounded px-6 py-2 text-sm hover:bg-gray-50">
              Reset
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="mt-4">
          <ProductTable products={filteredProducts} itemsPerPage={5} />
        </div>
      </div>
    </DashboardLayout>
  );
}
