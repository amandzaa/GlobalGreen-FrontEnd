"use client";

import React from "react";
import { ProductPreviewProps, colors} from '@/component/uploadimage/types'

/**
 * ProductPreview component to display a preview of the product
 */
export const ProductPreview: React.FC<ProductPreviewProps> = ({ product }) => {
  const {
    name = "Product Name",
    category = "",
    price = 0,
    salePrice = 0,
    stock = 0,
    unit = "each",
    description = "Product description will appear here",
    images = [],
    organic = false,
  } = product;

  // Safely handle price and salePrice to ensure they're numbers
  const safePrice = typeof price === 'number' ? price : 0;
  const safeSalePrice = typeof salePrice === 'number' ? salePrice : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-700 mb-4">
        Product Preview
      </h2>

      <div
        className="border rounded-lg overflow-hidden"
        style={{ backgroundColor: colors.paleGreen }}
      >
        <div className="aspect-w-1 aspect-h-1 w-full">
          {images.length > 0 ? (
            <img
              src={images[0]}
              alt={name || "Product preview"}
              className="object-cover w-full h-64"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-100">
              <p className="text-gray-400">Product image will appear here</p>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-800">{name}</h3>
              <p className="text-sm text-gray-500">{category}</p>
            </div>

            {organic && (
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                style={{
                  backgroundColor: colors.paleGreen,
                  color: colors.darkGreen,
                }}
              >
                Organic
              </span>
            )}
          </div>

          <div className="mt-4 flex items-end">
            {safeSalePrice > 0 ? (
              <>
                <p className="text-xl font-medium text-gray-900">
                  ${safeSalePrice.toFixed(2)}
                </p>
                <p className="text-sm line-through text-gray-500 ml-2">
                  ${safePrice.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-xl font-medium text-gray-900">
                {safePrice > 0 ? `$${safePrice.toFixed(2)}` : "Price not set"}
              </p>
            )}
            <p className="text-sm text-gray-500 ml-2">/ {unit}</p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {stock > 0 ? `In stock: ${stock}` : "Out of stock"}
            </div>
            <button
              className="px-4 py-2 text-sm font-medium text-white rounded-md"
              style={{ backgroundColor: colors.mediumGreen }}
              disabled={!name}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};