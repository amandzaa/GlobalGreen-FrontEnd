// pages/checkout.tsx
import React, { useState } from 'react';
import Head from 'next/head';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

const CheckoutPage: React.FC = () => {
  // Sample cart data
  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Fitbit Sense Advanced Smartwatch',
      description: 'with GPS',
      price: 398,
      quantity: 1,
      image: '/images/fitbit.png'
    },
    {
      id: 2,
      name: 'iPhone 13 pro max',
      description: 'Pacific Blue-128GB',
      price: 398,
      quantity: 1,
      image: '/images/iphone.png'
    },
    {
      id: 3,
      name: 'Apple MacBook Pro 13 inch',
      description: 'M1-8/256GB',
      price: 65,
      quantity: 1,
      image: '/images/macbook.png'
    }
  ]);

  // Form states
  const [formData, setFormData] = useState({
    shippingName: 'Shatinon Mekalan',
    shippingAddress: 'Apt. 6/B, 192 Edsel Road, Van Nuys',
    shippingCity: 'California',
    shippingZipCode: '96580',
    shippingCountry: 'USA',
    shippingPhone: '818-414-4092',
    sameAsShipping: true,
    billingName: 'Shatinon Mekalan',
    billingAddress: 'Apt. 6/B, 192 Edsel Road, Van Nuys',
    billingCity: 'California',
    billingZipCode: '96580',
    billingCountry: 'USA',
    billingPhone: '818-414-4092',
    deliveryType: 'oneDay',
    paymentMethod: 'creditCard',
    creditCardNumber: '',
    fullName: 'Ansolo Lazinatov',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    saveCardDetails: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Handle checkbox type specifically for HTMLInputElement
    const checked = (e.target as HTMLInputElement).type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: checked !== undefined ? checked : value
    }));

    // If "Same as shipping address" is checked, update billing info
    if (name === 'sameAsShipping' && checked) {
      setFormData(prevState => ({
        ...prevState,
        billingName: prevState.shippingName,
        billingAddress: prevState.shippingAddress,
        billingCity: prevState.shippingCity,
        billingZipCode: prevState.shippingZipCode,
        billingCountry: prevState.shippingCountry,
        billingPhone: prevState.shippingPhone
      }));
    }
  };

  const handleDeliveryTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      deliveryType: e.target.value
    }));
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      paymentMethod: e.target.value
    }));
  };

  // Calculate totals
  const itemsSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 59;
  const tax = parseFloat((itemsSubtotal * 0.2).toFixed(2)); // Assuming 20% tax
  const subtotal = itemsSubtotal - discount;
  
  // Get shipping cost based on delivery type
  const getShippingCost = () => {
    switch (formData.deliveryType) {
      case 'free': return 0;
      case 'standard': return 10;
      case 'twoDays': return 20;
      case 'oneDay': return 30;
      default: return 0;
    }
  };
  
  const shippingCost = getShippingCost();
  const total = subtotal + tax + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - connect to payment processor, etc.
    console.log('Order submitted:', formData);
    console.log('Order total:', total);
    alert(`Order placed successfully! Total: $${total.toFixed(2)}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Checkout page" />
      </Head>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Check out</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Details */}
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Shipping Details</h2>
                <button type="button" className="text-blue-600 hover:text-blue-800 text-sm">
                  Edit
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-gray-500 w-24">Name</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-900">{formData.shippingName}</span>
                </div>
                
                <div className="flex items-start">
                  <span className="text-gray-500 w-24">Address</span>
                  <span className="text-gray-500">:</span>
                  <div className="ml-2 text-gray-900">
                    <div>{formData.shippingAddress}</div>
                    <div>{formData.shippingCity}, {formData.shippingCountry} {formData.shippingZipCode}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-gray-500 w-24">Phone</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-900">{formData.shippingPhone}</span>
                </div>
              </div>
            </div>

            {/* Billing Details */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Billing Details</h2>
              
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="sameAsShipping"
                    checked={formData.sameAsShipping}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-gray-700">Same as shipping address</span>
                </label>
              </div>
              
              {formData.sameAsShipping ? (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24">Name</span>
                    <span className="text-gray-500">:</span>
                    <span className="ml-2 text-gray-900">{formData.billingName}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24">Address</span>
                    <span className="text-gray-500">:</span>
                    <div className="ml-2 text-gray-900">
                      <div>{formData.billingAddress}</div>
                      <div>{formData.billingCity}, {formData.billingCountry} {formData.billingZipCode}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24">Phone</span>
                    <span className="text-gray-500">:</span>
                    <span className="ml-2 text-gray-900">{formData.billingPhone}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Billing form fields - shown when sameAsShipping is unchecked */}
                </div>
              )}
            </div>

            {/* Delivery Type */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Type</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Free Shipping */}
                <div className="border rounded p-4">
                  <label className="flex items-start space-x-2">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="free"
                      checked={formData.deliveryType === 'free'}
                      onChange={handleDeliveryTypeChange}
                      className="mt-1 rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">Free Shipping</span>
                        <span className="font-medium">$0.00</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Est. delivery: Jun 21 - Jul 20</div>
                      <div className="text-sm text-blue-500 mt-1">Get Free Shipped products in Time!</div>
                    </div>
                  </label>
                </div>
                
                {/* Two days Shipping */}
                <div className="border rounded p-4">
                  <label className="flex items-start space-x-2">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="twoDays"
                      checked={formData.deliveryType === 'twoDays'}
                      onChange={handleDeliveryTypeChange}
                      className="mt-1 rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">Two days Shipping</span>
                        <span className="font-medium">$20.00</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Est. delivery: Jun 21 - Jul 20</div>
                      <div className="text-sm text-blue-500 mt-1">Everything faster with minimum shipping fee.</div>
                    </div>
                  </label>
                </div>
                
                {/* Standard Shipping */}
                <div className="border rounded p-4">
                  <label className="flex items-start space-x-2">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="standard"
                      checked={formData.deliveryType === 'standard'}
                      onChange={handleDeliveryTypeChange}
                      className="mt-1 rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">Standard Shipping</span>
                        <span className="font-medium">$10.00</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Est. delivery: Jun 21 - Jul 20</div>
                      <div className="text-sm text-blue-500 mt-1">Get timely delivery with economy shipping.</div>
                    </div>
                  </label>
                </div>
                
                {/* One day Shipping */}
                <div className="border rounded p-4 relative">
                  <div className="absolute right-2 top-2 bg-yellow-500 text-xs font-bold px-2 py-1 rounded text-white">
                    POPULAR
                  </div>
                  <label className="flex items-start space-x-2">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="oneDay"
                      checked={formData.deliveryType === 'oneDay'}
                      onChange={handleDeliveryTypeChange}
                      className="mt-1 rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">One day Shipping</span>
                        <span className="font-medium">$30.00</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Est. delivery: Jun 21 - Jul 20</div>
                      <div className="text-sm text-blue-500 mt-1">Highest priority shipping at the lowest cost.</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
              
              <div className="space-y-6">
                {/* Payment Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Credit Card */}
                  <div className="border rounded p-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        checked={formData.paymentMethod === 'creditCard'}
                        onChange={handlePaymentMethodChange}
                        className="rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="font-medium">Credit card</span>
                      <div className="flex space-x-1 ml-auto">
                        <div className="w-8 h-5 bg-blue-100 rounded border border-gray-200"></div>
                        <div className="w-8 h-5 bg-yellow-100 rounded border border-gray-200"></div>
                        <div className="w-8 h-5 bg-red-100 rounded border border-gray-200"></div>
                        <div className="w-8 h-5 bg-blue-500 rounded border border-gray-200"></div>
                      </div>
                    </label>
                  </div>
                  
                  {/* Paypal */}
                  <div className="border rounded p-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handlePaymentMethodChange}
                        className="rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="font-medium">Paypal</span>
                    </label>
                  </div>
                  
                  {/* Coupon */}
                  <div className="border rounded p-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="coupon"
                        checked={formData.paymentMethod === 'coupon'}
                        onChange={handlePaymentMethodChange}
                        className="rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="font-medium">Coupon</span>
                    </label>
                  </div>
                </div>
                
                {/* Credit Card Details - shown when credit card is selected */}
                {formData.paymentMethod === 'creditCard' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select card</label>
                        <div className="relative">
                          <select
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option>Select a card</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                        <input
                          type="text"
                          name="creditCardNumber"
                          value={formData.creditCardNumber}
                          onChange={handleInputChange}
                          placeholder="Enter card number"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expires on</label>
                        <div className="flex space-x-2">
                          <div className="relative w-full">
                            <select
                              name="expiryMonth"
                              value={formData.expiryMonth}
                              onChange={handleInputChange}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                              <option>Month</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                          
                          <div className="relative w-full">
                            <select
                              name="expiryYear"
                              value={formData.expiryYear}
                              onChange={handleInputChange}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                              <option>Year</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                        <input
                          type="text"
                          name="cvc"
                          value={formData.cvc}
                          onChange={handleInputChange}
                          placeholder="Enter a valid CVC"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="saveCardDetails"
                          checked={formData.saveCardDetails}
                          onChange={handleInputChange}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2 text-sm text-gray-700">Save Card Details</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded shadow sticky top-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Summary</h2>
                <button type="button" className="text-blue-600 hover:text-blue-800 text-sm">
                  Edit cart
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded mr-4 overflow-hidden relative">
                      {/* Replace with actual images */}
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        {item.id === 1 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {item.id === 2 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        )}
                        {item.id === 3 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-sm font-medium text-gray-900">x{item.quantity}</p>
                      <p className="text-sm font-medium text-gray-900">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 pb-2">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Items subtotal:</span>
                  <span className="font-medium">${itemsSubtotal}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium text-red-500">-${discount}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Shipping Cost</span>
                  <span className="font-medium">${shippingCost}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total :</span>
                  <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded transition duration-200"
                >
                  Pay ${total.toFixed(2)}
                </button>
                
                <button
                  type="button"
                  className="w-full text-gray-700 hover:text-gray-900 py-3 px-4 rounded border border-gray-300 hover:border-gray-400 transition duration-200"
                >
                  Save Order and Exit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;