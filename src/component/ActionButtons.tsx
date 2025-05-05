import { useState } from "react";
import { Download, UploadCloud, FileText, Loader } from "lucide-react";

// Define TypeScript interfaces
interface Product {
  id: string;
  name: string;
  variant: string;
  price: string;
  quantity: number;
  total: string;
  status: string;
  delivery: string;
  orderDate: string;
  countdown?: string;
}

interface ActionButtonsProps {
  primaryColor: string;
  products: Product[];
}

const ActionButtons = ({ 
  primaryColor = "var(--color-primary)",
  products = []
}: ActionButtonsProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Function to generate PDF export of current data
  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Create document content
      const content = generateTableContent(products);
      
      // Create a Blob with the content
      const blob = new Blob([content], { type: 'application/pdf' });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `orders-export-${new Date().toISOString().slice(0,10)}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      alert("Failed to export data to PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // Function to download order history
  const handleDownloadHistory = async () => {
    setIsDownloading(true);
    try {
      // Filter only delivered/completed orders
      const historyProducts = products.filter(p => 
        p.status === "Delivered" || p.status === "Finished"
      );
      
      // Create document content
      const content = generateHistoryContent(historyProducts);
      
      // Create a Blob with the content
      const blob = new Blob([content], { type: 'application/pdf' });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `order-history-${new Date().toISOString().slice(0,10)}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading history:", error);
      alert("Failed to download order history. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };
  
  // Function to generate table content for all orders
  const generateTableContent = (products: Product[]): string => {
    // Generate PDF-ready content string in HTML format
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Orders Export</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f2f2f2; }
          .header { margin-bottom: 20px; }
          .footer { margin-top: 20px; font-size: 12px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Orders Export</h1>
          <p>Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Variant</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Status</th>
              <th>Delivery</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    // Add rows for each product
    products.forEach(product => {
      htmlContent += `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.variant}</td>
          <td>${product.price}</td>
          <td>${product.quantity}</td>
          <td>${product.total}</td>
          <td>${product.status}</td>
          <td>${product.delivery}</td>
          <td>${product.orderDate}</td>
        </tr>
      `;
    });
    
    // Close table and document
    htmlContent += `
          </tbody>
        </table>
        
        <div class="footer">
          <p>Total Orders: ${products.length}</p>
        </div>
      </body>
      </html>
    `;
    
    return htmlContent;
  };
  
  // Function to generate history content
  const generateHistoryContent = (products: Product[]): string => {
    // Generate PDF-ready content string in HTML format with more details
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order History</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f2f2f2; }
          .header { margin-bottom: 20px; }
          .footer { margin-top: 20px; font-size: 12px; text-align: center; }
          .summary { margin: 20px 0; padding: 15px; background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Order History Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
        </div>
        
        <div class="summary">
          <h2>Order Summary</h2>
          <p>Total Completed Orders: ${products.length}</p>
          <p>Total Revenue: ${calculateTotalRevenue(products)}</p>
          <p>Average Order Value: ${calculateAverageOrderValue(products)}</p>
        </div>
        
        <h2>Completed Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Variant</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Status</th>
              <th>Delivery</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    // Add rows for each product
    products.forEach(product => {
      htmlContent += `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.variant}</td>
          <td>${product.price}</td>
          <td>${product.quantity}</td>
          <td>${product.total}</td>
          <td>${product.status}</td>
          <td>${product.delivery}</td>
          <td>${product.orderDate}</td>
        </tr>
      `;
    });
    
    // Close table and document
    htmlContent += `
          </tbody>
        </table>
        
        <div class="footer">
          <p>End of Order History Report</p>
        </div>
      </body>
      </html>
    `;
    
    return htmlContent;
  };
  
    // Helper function to calculate total revenue
    const calculateTotalRevenue = (products: Product[]): string => {
    const total = products.reduce((sum, product) => {
      // Remove all commas from the total string before parsing
      const numericTotal = parseFloat(product.total.replace(/,/g, ''));
      return sum + (!isNaN(numericTotal) ? numericTotal : 0);
    }, 0);
    
    return total.toFixed(2);
  };
  
  // Helper function to calculate average order value
  const calculateAverageOrderValue = (products: Product[]): string => {
    if (products.length === 0) return "0.00";
    const total = parseFloat(calculateTotalRevenue(products));
    return (total / products.length).toFixed(2);
  };

  return (
    <div className="flex gap-2">
      <button
        className="px-4 py-2 border rounded text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors"
        style={{ borderColor: primaryColor, color: primaryColor }}
        onClick={handleExport}
        disabled={isExporting}
      >
        {isExporting ? <Loader size={16} className="animate-spin" /> : <Download size={16} />}
        <span>{isExporting ? "Exporting..." : "Export"}</span>
      </button>
      <button
        className="px-4 py-2 rounded text-sm flex items-center gap-2 text-white hover:opacity-90 transition-opacity"
        style={{ backgroundColor: primaryColor }}
        onClick={handleDownloadHistory}
        disabled={isDownloading}
      >
        {isDownloading ? <Loader size={16} className="animate-spin" /> : <UploadCloud size={16} />}
        <span>{isDownloading ? "Downloading..." : "Download History"}</span>
      </button>
    </div>
  );
};

export default ActionButtons;