// pages/invoice.tsx
import React from 'react';
import Head from 'next/head';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Define types for invoice data
interface Product {
  id: number;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  taxRate: number;
  taxType: string;
  tax: number;
  total: number;
}

interface InvoiceData {
  invoiceNo: string;
  invoiceDate: string;
  seller: {
    name: string;
    address: string;
  };
  panNo: string;
  gstRegNo: string;
  orderNo: string;
  orderDate: string;
  billing: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  shipping: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  products: Product[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  grandTotal: number;
  amountInWords: string;
}

const InvoicePage: React.FC = () => {
  // Sample invoice data
  const invoiceData: InvoiceData = {
    invoiceNo: '#FLR978282',
    invoiceDate: '19.06.2019',
    seller: {
      name: 'PhoenixMart',
      address: '36 greendown road, California, Usa',
    },
    panNo: 'XVCJ96378Z008',
    gstRegNo: 'IX9878123TC',
    orderNo: 'A-8934792734',
    orderDate: '19.06.2019',
    billing: {
      name: 'John Doe',
      address: '36, Gree Downtown, Golden road, FL',
      email: 'johndoe@jeemail.com',
      phone: '+33493302903O',
    },
    shipping: {
      name: 'John Doe',
      address: '36, Gree Downtown, Golden road, FL',
      email: 'johndoe@jeemail.com',
      phone: '+33493302903O',
    },
    products: [
      {
        id: 1,
        name: 'Fitbit Sense Advanced Smartwatch with Tools for Heart...',
        color: 'Glossy black',
        size: 'XL',
        quantity: 2,
        price: 299,
        taxRate: 2.5,
        taxType: 'VAT',
        tax: 199,
        total: 398,
      },
      {
        id: 2,
        name: '2021 Apple 12.9-inch iPad Pro (Wi-Fi, 128GB) - Space...',
        color: 'Black',
        size: 'Pro',
        quantity: 1,
        price: 199,
        taxRate: 2.75,
        taxType: 'VAT',
        tax: 199,
        total: 398,
      },
      {
        id: 3,
        name: 'PlayStation 5 DualSense Wireless Controller',
        color: 'White',
        size: 'Regular',
        quantity: 1,
        price: 185,
        taxRate: 3.5,
        taxType: 'VAT',
        tax: 199,
        total: 398,
      },
    ],
    subtotal: 398,
    shippingCost: 50,
    discount: 50,
    grandTotal: 398,
    amountInWords: 'Three Hundred and Ninety Eight USD',
  };

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    const invoice = document.getElementById('invoice');
    if (!invoice) return;
    
    // Temporarily apply print-specific styles
    const tempStyle = document.createElement('style');
    tempStyle.innerHTML = `
      @media screen {
        #invoice {
          width: 8.5in !important;
          max-width: 8.5in !important;
          padding: 0.5in !important;
        }
        #invoice table {
          width: 100% !important;
          table-layout: fixed !important;
        }
        #invoice .hidden {
          display: table-cell !important;
        }
        #invoice th, #invoice td {
          font-size: 10px !important;
          padding: 4px !important;
          white-space: normal !important;
          word-break: break-word !important;
        }
      }
    `;
    document.head.appendChild(tempStyle);
    
    // Override any CSS that might use oklch colors before capturing
    const elementsWithColors = invoice.querySelectorAll('*');
    const originalStyles: { [key: string]: string } = {};
    
    // Store original styles and replace any oklch colors with safe RGB colors
    elementsWithColors.forEach((el, i) => {
      const computedStyle = window.getComputedStyle(el);
      const colorProps = ['color', 'background-color', 'border-color'];
      
      colorProps.forEach(prop => {
        const colorValue = computedStyle.getPropertyValue(prop);
        // If the color value contains "oklch", replace it
        if (colorValue.includes('oklch')) {
          const key = `${i}-${prop}`;
          originalStyles[key] = (el as HTMLElement).style[prop as any];
          // Set a safe fallback color
          (el as HTMLElement).style[prop as any] = 
            prop === 'color' ? '#000000' : 
            prop === 'background-color' ? '#ffffff' : 
            '#cccccc';
        }
      });
    });

    // Now capture the HTML to canvas
    html2canvas(invoice, {
      // Use legacy mode to avoid advanced color space issues
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      scale: 1.5, // Balance between quality and size
      logging: false, // Disable logging
      windowWidth: 1024, // Fixed width to avoid responsive layout issues
      width: 900, // Document width
      x: 0,
      y: 0,
    }).then((canvas) => {
      // Restore original styles and remove temp style
      elementsWithColors.forEach((el, i) => {
        const colorProps = ['color', 'background-color', 'border-color'];
        colorProps.forEach(prop => {
          const key = `${i}-${prop}`;
          if (originalStyles[key]) {
            (el as HTMLElement).style[prop as any] = originalStyles[key];
          }
        });
      });
      document.head.removeChild(tempStyle);

      // Create PDF from canvas - set to A4 size
      const imgData = canvas.toDataURL('image/png');
      // Use A4 size: 210 x 297 mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // Calculate dimensions to fit on A4 while maintaining aspect ratio
      const imgWidth = 210; // A4 width (mm)
      const pageHeight = 297; // A4 height (mm)
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add other pages if needed (for multi-page invoices)
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`Invoice-${invoiceData.invoiceNo}.pdf`);
    }).catch(error => {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
      document.head.removeChild(tempStyle);
    });
  };

  // Function to handle print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Invoice #{invoiceData.invoiceNo}</title>
        <meta name="description" content="Invoice details" />
        {/* Add print styles */}
        <style jsx global>{`
          @media print {
            @page {
              size: A4;
              margin: 1cm;
            }
            body * {
              visibility: hidden;
            }
            #invoice,
            #invoice * {
              visibility: visible;
            }
            #invoice {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 10px;
              font-size: 12px;
            }
            #invoice table {
              width: 100% !important;
              page-break-inside: avoid;
              border-collapse: collapse;
            }
            #invoice th, #invoice td {
              padding: 5px !important;
              font-size: 10px !important;
            }
            .no-print {
              display: none !important;
            }
            .print-table-cell {
              display: table-cell !important;
            }
            .print-w-auto {
              width: auto !important;
            }
            .print-break-words {
              word-break: break-word !important;
            }
          }
        `}</style>
      </Head>

      <div className="max-w-5xl mx-auto">
        {/* Header with buttons */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Invoice</h1>
          <div className="space-x-4 no-print">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Invoice
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print
            </button>
          </div>
        </div>

        {/* Invoice content */}
        <div id="invoice" className="bg-white shadow overflow-hidden rounded-lg">
          {/* Invoice header */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <div className="flex mb-2">
                  <span className="font-medium text-gray-700 w-32">Invoice No :</span>
                  <span className="text-gray-900">{invoiceData.invoiceNo}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">Invoice Date :</span>
                  <span className="text-gray-900">{invoiceData.invoiceDate}</span>
                </div>
              </div>
              
              <div>
                <div className="font-medium text-gray-700 mb-2">Sold by :</div>
                <div className="text-gray-900">{invoiceData.seller.name}</div>
                <div className="text-gray-600 text-sm">{invoiceData.seller.address}</div>
                <div className="mt-2">
                  <div className="flex mb-2">
                    <span className="font-medium text-gray-700 w-32">GST Reg No :</span>
                    <span className="text-gray-900">{invoiceData.gstRegNo}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex mb-2">
                  <span className="font-medium text-gray-700 w-32">PAN No :</span>
                  <span className="text-gray-900">{invoiceData.panNo}</span>
                </div>
                <div className="flex mb-2">
                  <span className="font-medium text-gray-700 w-32">Order No :</span>
                  <span className="text-gray-900">{invoiceData.orderNo}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">Order Date :</span>
                  <span className="text-gray-900">{invoiceData.orderDate}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <div className="font-medium text-gray-700 mb-2">Billing Address :</div>
                <div className="text-gray-900">{invoiceData.billing.name}</div>
                <div className="text-gray-600 text-sm">{invoiceData.billing.address}</div>
                <div className="text-gray-600 text-sm">{invoiceData.billing.email}</div>
                <div className="text-gray-600 text-sm">{invoiceData.billing.phone}</div>
              </div>
              
              <div>
                <div className="font-medium text-gray-700 mb-2">Shipping Address :</div>
                <div className="text-gray-900">{invoiceData.shipping.name}</div>
                <div className="text-gray-600 text-sm">{invoiceData.shipping.address}</div>
                <div className="text-gray-600 text-sm">{invoiceData.shipping.email}</div>
                <div className="text-gray-600 text-sm">{invoiceData.shipping.phone}</div>
              </div>
            </div>
          </div>

          {/* Invoice items */}
          <div className="overflow-x-auto print:overflow-visible">
            <table className="min-w-full divide-y divide-gray-200 table-fixed print:table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-12">
                    SL
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-1/3">
                    Products
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-24">
                    Color
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-20">
                    Size
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-20">
                    Qty
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-20">
                    Price
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-16 hidden print:table-cell md:table-cell">
                    Tax %
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-16 hidden print:table-cell md:table-cell">
                    Tax
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-20">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoiceData.products.map((product, index) => (
                  <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-2 py-4 text-sm text-gray-900">{product.id}</td>
                    <td className="px-2 py-4 text-sm text-gray-900 truncate">{product.name}</td>
                    <td className="px-2 py-4 text-sm text-gray-900">{product.color}</td>
                    <td className="px-2 py-4 text-sm text-gray-900">{product.size}</td>
                    <td className="px-2 py-4 text-sm text-gray-900">{product.quantity}</td>
                    <td className="px-2 py-4 text-sm text-gray-900">${product.price}</td>
                    <td className="px-2 py-4 text-sm text-gray-900 hidden print:table-cell md:table-cell">{product.taxRate}%</td>
                    <td className="px-2 py-4 text-sm text-gray-900 hidden print:table-cell md:table-cell">${product.tax}</td>
                    <td className="px-2 py-4 text-sm text-gray-900">${product.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invoice summary */}
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-100 px-6 py-4 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-700 col-span-2 text-right">Subtotal</dt>
                <dd className="text-sm text-gray-900 text-right">${invoiceData.subtotal}</dd>
              </div>
              <div className="bg-white px-6 py-4 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-700 col-span-2 text-right">Shipping Cost</dt>
                <dd className="text-sm text-gray-900 text-right">${invoiceData.shippingCost}</dd>
              </div>
              <div className="bg-white px-6 py-4 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-700 col-span-2 text-right">Discount/Voucher</dt>
                <dd className="text-sm text-red-600 text-right">-${invoiceData.discount}</dd>
              </div>
              <div className="bg-gray-100 px-6 py-6 grid grid-cols-3">
                <dt className="text-base font-bold text-gray-900 col-span-2 text-left">Grand Total</dt>
                <dd className="text-base font-bold text-gray-900 text-right">${invoiceData.grandTotal}</dd>
              </div>
              <div className="bg-gray-100 px-6 py-2 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-700 col-span-2 text-left">Amount in Words</dt>
                <dd className="text-sm text-gray-900 text-right">{invoiceData.amountInWords}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;