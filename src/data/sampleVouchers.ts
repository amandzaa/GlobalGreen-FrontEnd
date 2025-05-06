// Sample voucher data for the application
export interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchaseAmount: number | null;
  maxUsage: number | null;
  usageCount: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  productScope: "all" | "specific";
  specificProducts: string[];
  status: "active" | "inactive" | "scheduled" | "expired";
  createdAt: string;
  updatedAt: string;
}

export const sampleVouchers: Voucher[] = [
  {
    id: "v1",
    code: "SUMMER25",
    title: "Summer Sale 25% Off",
    description: "Get 25% off on all summer produce and seasonal items",
    discountType: "percentage",
    discountValue: 25,
    minPurchaseAmount: 50,
    maxUsage: 1000,
    usageCount: 423,
    startDate: "2025-06-01",
    startTime: "00:00",
    endDate: "2025-08-31",
    endTime: "23:59",
    productScope: "specific",
    specificProducts: ["p1", "p2", "p5"],
    status: "scheduled",
    createdAt: "2025-05-01T12:30:45Z",
    updatedAt: "2025-05-01T12:30:45Z"
  },
  {
    id: "v2",
    code: "WELCOME10",
    title: "New Customer $10 Off",
    description: "Get $10 off your first order of $50 or more",
    discountType: "fixed",
    discountValue: 10,
    minPurchaseAmount: 50,
    maxUsage: null,
    usageCount: 156,
    startDate: "2025-01-01",
    startTime: "00:00",
    endDate: "2025-12-31",
    endTime: "23:59",
    productScope: "all",
    specificProducts: [],
    status: "active",
    createdAt: "2024-12-15T09:15:22Z",
    updatedAt: "2024-12-15T09:15:22Z"
  },
  {
    id: "v3",
    code: "ORGANIC15",
    title: "15% Off Organic Products",
    description: "Save 15% on all certified organic products",
    discountType: "percentage",
    discountValue: 15,
    minPurchaseAmount: null,
    maxUsage: 500,
    usageCount: 342,
    startDate: "2025-04-01",
    startTime: "08:00",
    endDate: "2025-05-31",
    endTime: "23:59",
    productScope: "specific",
    specificProducts: ["p3", "p7", "p10", "p12"],
    status: "active",
    createdAt: "2025-03-15T14:22:10Z",
    updatedAt: "2025-03-20T11:05:33Z"
  },
  {
    id: "v4",
    code: "FLASH50",
    title: "Flash Sale 50% Off",
    description: "Half price on selected items for 24 hours only!",
    discountType: "percentage",
    discountValue: 50,
    minPurchaseAmount: null,
    maxUsage: 200,
    usageCount: 200,
    startDate: "2025-04-15",
    startTime: "12:00",
    endDate: "2025-04-16",
    endTime: "12:00",
    productScope: "specific",
    specificProducts: ["p8", "p15"],
    status: "expired",
    createdAt: "2025-04-10T16:45:00Z",
    updatedAt: "2025-04-16T12:05:00Z"
  },
  {
    id: "v5",
    code: "LOCAL20",
    title: "Local Producers 20% Off",
    description: "Support local farmers with 20% off all locally sourced produce",
    discountType: "percentage",
    discountValue: 20,
    minPurchaseAmount: 25,
    maxUsage: 1000,
    usageCount: 178,
    startDate: "2025-05-01",
    startTime: "00:00",
    endDate: "2025-06-30",
    endTime: "23:59",
    productScope: "specific",
    specificProducts: ["p4", "p6", "p9", "p11"],
    status: "active",
    createdAt: "2025-04-20T10:11:15Z",
    updatedAt: "2025-04-20T10:11:15Z"
  },
  {
    id: "v6",
    code: "FREESHIP75",
    title: "Free Shipping on Orders Over $75",
    description: "Get free shipping when you spend $75 or more",
    discountType: "fixed",
    discountValue: 0,
    minPurchaseAmount: 75,
    maxUsage: null,
    usageCount: 98,
    startDate: "2025-03-01",
    startTime: "00:00",
    endDate: "2025-12-31",
    endTime: "23:59",
    productScope: "all",
    specificProducts: [],
    status: "active",
    createdAt: "2025-02-25T15:33:20Z",
    updatedAt: "2025-02-25T15:33:20Z"
  },
  {
    id: "v7",
    code: "HOLIDAY30",
    title: "Holiday Season 30% Off",
    description: "Celebrate the holidays with 30% off all festive products",
    discountType: "percentage",
    discountValue: 30,
    minPurchaseAmount: 100,
    maxUsage: 2000,
    usageCount: 0,
    startDate: "2025-11-15",
    startTime: "00:00",
    endDate: "2025-12-25",
    endTime: "23:59",
    productScope: "specific",
    specificProducts: ["p20", "p21", "p22", "p23"],
    status: "scheduled",
    createdAt: "2025-05-05T09:30:00Z",
    updatedAt: "2025-05-05T09:30:00Z"
  },
  {
    id: "v8",
    code: "BUNDLE25",
    title: "25% Off Product Bundles",
    description: "Save 25% when you purchase any of our curated product bundles",
    discountType: "percentage",
    discountValue: 25,
    minPurchaseAmount: null,
    maxUsage: 500,
    usageCount: 86,
    startDate: "2025-02-01",
    startTime: "00:00",
    endDate: "2025-05-31",
    endTime: "23:59",
    productScope: "specific",
    specificProducts: ["p16", "p17", "p18", "p19"],
    status: "active",
    createdAt: "2025-01-25T11:20:15Z",
    updatedAt: "2025-01-25T11:20:15Z"
  }
];

// Function to find a voucher by ID
export const findVoucherById = (id: string): Voucher | undefined => {
  return sampleVouchers.find(voucher => voucher.id === id);
};