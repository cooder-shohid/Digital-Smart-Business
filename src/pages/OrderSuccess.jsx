import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, service, fullName, email, phone, business, package: packageName, payment } = location.state || {};
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {orderId ? (
          <>
            {/* Success Card */}
            <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden transform transition duration-700 ${
              animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}>
              
              {/* Header with Checkmark */}
              <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 px-8 py-16 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition duration-300">
                      <span className="text-5xl">✅</span>
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Order Confirmed!</h1>
                  <p className="text-green-100 text-lg">Your service order has been successfully received</p>
                </div>
              </div>

              {/* Order ID Section */}
              <div className="px-8 py-8 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Order ID</p>
                    <p className="text-2xl md:text-3xl font-bold text-green-900 font-mono">{orderId}</p>
                  </div>
                  <div className="text-5xl">📋</div>
                </div>
              </div>

              {/* Details Section */}
              <div className="px-8 py-12">
                {/* Order Details Grid */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-2xl">📊</span> Order Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Service */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600 font-medium mb-1">Service</p>
                      <p className="text-lg font-bold text-gray-900">{service}</p>
                    </div>

                    {/* Client Name */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600 font-medium mb-1">Client Name</p>
                      <p className="text-lg font-bold text-gray-900">{fullName}</p>
                    </div>

                    {/* Business Name */}
                    {business && (
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <p className="text-sm text-gray-600 font-medium mb-1">Business Name</p>
                        <p className="text-lg font-bold text-gray-900">{business}</p>
                      </div>
                    )}

                    {/* Package */}
                    {packageName && (
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <p className="text-sm text-gray-600 font-medium mb-1">Package</p>
                        <p className="text-lg font-bold text-blue-600">{packageName}</p>
                      </div>
                    )}

                    {/* Email */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600 font-medium mb-1">Email</p>
                      <p className="text-base font-semibold text-gray-900 break-all">{email}</p>
                    </div>

                    {/* Phone */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600 font-medium mb-1">Phone</p>
                      <p className="text-base font-semibold text-gray-900">{phone}</p>
                    </div>

                    {/* Payment Method */}
                    {payment && (
                      <div className="bg-white rounded-xl p-4 shadow-sm md:col-span-2">
                        <p className="text-sm text-gray-600 font-medium mb-1">Payment Method</p>
                        <p className="text-lg font-bold text-emerald-600">
                          {payment === 'full' && '💳 Full Payment'}
                          {payment === 'advance' && '📅 50% Advance + 50% on Delivery'}
                          {payment === 'later' && '⏱️ Pay Later'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Confirmation Message */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-8 mb-8">
                  <div className="flex gap-4">
                    <div className="text-4xl flex-shrink-0">🎉</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Great News!</h3>
                      <p className="text-gray-700 mb-2">
                        Your <strong>{service}</strong> order has been successfully received!
                      </p>
                      <p className="text-gray-700">
                        Our team will review your request and contact you shortly at <strong className="text-emerald-600">{email}</strong> or <strong className="text-emerald-600">{phone}</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-2xl">📋</span> What's Next?
                  </h3>

                  <div className="space-y-4">
                    {[
                      { number: 1, title: 'Review', desc: 'Our team will review your order within 24 hours' },
                      { number: 2, title: 'Confirmation', desc: 'We\'ll send you a confirmation email with project details' },
                      { number: 3, title: 'Payment', desc: 'Payment processing will begin based on your selected option' },
                      { number: 4, title: 'Development', desc: 'Project development will start immediately' },
                    ].map((step) => (
                      <div key={step.number} className="flex gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {step.number}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{step.title}</p>
                          <p className="text-gray-600 text-sm">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      window.location.href = 'mailto:support@smartdigital.com';
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>📧</span>
                    <Link to="/contact" className="text-white hover:underline">Contact Support</Link>
                  </button>

                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>🏠</span>
                    Back to Home
                  </button>
                </div>
              </div>
            </div>

            {/* Support Message */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Need help? Contact us at <a href="mailto:support@smartdigital.com" className="text-emerald-600 font-bold hover:underline">support@smartdigital.com</a>
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Your order details have been saved. You can track your project status anytime.
              </p>
            </div>
          </>
        ) : (
          // Error State
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 via-red-600 to-orange-600 px-8 py-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
              </div>

              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-5xl">⚠️</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Oops!</h1>
                <p className="text-red-100 text-lg">Something went wrong</p>
              </div>
            </div>

            <div className="px-8 py-12 text-center">
              <p className="text-gray-700 text-lg mb-8">
                No order information found. Please try placing your order again.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/services')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  🛍️ Browse Services
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-xl transition duration-300"
                >
                  🏠 Go Home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSuccess;