import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const packages = {
  'Website Development': [
    { name: 'Basic', price: 10000 },
    { name: 'Standard', price: 20000 },
    { name: 'Premium', price: 35000 },
  ],
  'Facebook Marketing': [
    { name: 'Basic', price: 5000 },
    { name: 'Standard', price: 10000 },
    { name: 'Premium', price: 20000 },
  ],
  'Graphic Design': [
    { name: 'Basic', price: 3000 },
    { name: 'Standard', price: 7000 },
    { name: 'Premium', price: 15000 },
  ],
  'SEO Optimization': [
    { name: 'Basic', price: 8000 },
    { name: 'Standard', price: 15000 },
    { name: 'Premium', price: 30000 },
  ],
  'Video Production': [
    { name: 'Basic', price: 15000 },
    { name: 'Standard', price: 30000 },
    { name: 'Premium', price: 50000 },
  ],
  'Email Marketing': [
    { name: 'Basic', price: 4000 },
    { name: 'Standard', price: 8000 },
    { name: 'Premium', price: 12000 },
  ],
  'Data Analytics': [
    { name: 'Basic', price: 10000 },
    { name: 'Standard', price: 20000 },
    { name: 'Premium', price: 40000 },
  ],
  'Cybersecurity': [
    { name: 'Basic', price: 20000 },
    { name: 'Standard', price: 40000 },
    { name: 'Premium', price: 60000 },
  ],
};

const ServiceOrderPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const service = searchParams.get('service') || '';

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    business: '',
    website: '',
    budget: '',
    deadline: '',
    description: '',
    package: '',
    payment: 'full',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.fullName || form.fullName.trim() === '') {
      newErrors.fullName = 'Full name is required';
    }
    if (!form.email || form.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.phone || form.phone.trim() === '') {
      newErrors.phone = 'Phone is required';
    }
    if (!form.business || form.business.trim() === '') {
      newErrors.business = 'Business name is required';
    }
    if (!form.budget || form.budget.trim() === '') {
      newErrors.budget = 'Budget range is required';
    }
    if (!form.deadline || form.deadline.trim() === '') {
      newErrors.deadline = 'Project deadline is required';
    }
    if (!form.description || form.description.trim() === '') {
      newErrors.description = 'Project description is required';
    }

    setErrors(newErrors);
    console.log('Validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');
    
    // Validate form first
    if (!validateForm()) {
      console.log('❌ Form validation failed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    console.log('✅ Form validation passed');
    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      
      const orderData = {
        orderId: orderId,
        service: service,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        business: form.business,
        website: form.website,
        budget: form.budget,
        deadline: form.deadline,
        description: form.description,
        package: form.package,
        payment: form.payment,
        submittedAt: new Date().toISOString(),
      };

      console.log('📤 Submitting order:', orderData);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      setSuccessMessage('✅ Order submitted successfully!');
      console.log('✅ Order submitted successfully with ID:', orderId);

      // Wait and redirect
      setTimeout(() => {
        navigate('/order-success', { state: orderData });
      }, 1500);

    } catch (error) {
      console.error('❌ Error submitting order:', error);
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 px-8 py-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>
            <div className="relative z-10">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <span className="text-white text-sm font-semibold">📋 New Order</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Service Order Form</h1>
              <p className="text-blue-100 text-lg">Complete your order details below</p>
            </div>
          </div>

          {/* Service Details Section */}
          <div className="px-8 py-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                ✓
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Selected Service</p>
                {service ? (
                  <p className="text-2xl font-bold text-blue-900">{service}</p>
                ) : (
                  <p className="text-amber-700 font-semibold">⚠️ Please select a service first</p>
                )}
              </div>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="px-8 py-4 bg-green-50 border-b border-green-200">
              <p className="text-green-700 font-semibold text-center">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="px-8 py-4 bg-red-50 border-b border-red-200">
              <p className="text-red-700 font-semibold text-center">{errors.submit}</p>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit} noValidate className="px-8 py-12">
            
            {/* Client Information Section */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Client Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-3">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3.5 border-2 rounded-lg focus:outline-none transition duration-200 ${
                      errors.fullName 
                        ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200' 
                        : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-xs font-semibold mt-2">❌ {errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3.5 border-2 rounded-lg focus:outline-none transition duration-200 ${
                      errors.email 
                        ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200' 
                        : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs font-semibold mt-2">❌ {errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXXXXXXXX"
                    className={`w-full px-4 py-3.5 border-2 rounded-lg focus:outline-none transition duration-200 ${
                      errors.phone 
                        ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200' 
                        : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs font-semibold mt-2">❌ {errors.phone}</p>
                  )}
                </div>

                {/* Business Name */}
                <div>
                  <label htmlFor="business" className="block text-sm font-semibold text-gray-700 mb-3">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="business"
                    name="business"
                    value={form.business}
                    onChange={handleChange}
                    placeholder="Your Company Name"
                    className={`w-full px-4 py-3.5 border-2 rounded-lg focus:outline-none transition duration-200 ${
                      errors.business 
                        ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200' 
                        : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {errors.business && (
                    <p className="text-red-600 text-xs font-semibold mt-2">❌ {errors.business}</p>
                  )}
                </div>

                {/* Website */}
                <div className="md:col-span-2">
                  <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-3">
                    Website (Optional)
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 bg-white"
                  />
                </div>

                {/* Budget Range */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-3">
                    Budget Range <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 border-2 rounded-lg focus:outline-none transition duration-200 appearance-none bg-white ${
                      errors.budget 
                        ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                  >
                    <option value="">-- Select Budget --</option>
                    <option value="0-10000">0 – 10,000৳</option>
                    <option value="10000-50000">10,000 – 50,000৳</option>
                    <option value="50000-100000">50,000 – 100,000৳</option>
                    <option value="100000+">100,000+৳</option>
                  </select>
                  {errors.budget && (
                    <p className="text-red-600 text-xs font-semibold mt-2">❌ {errors.budget}</p>
                  )}
                </div>

                {/* Deadline */}
                <div>
                  <label htmlFor="deadline" className="block text-sm font-semibold text-gray-700 mb-3">
                    Project Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 border-2 rounded-lg focus:outline-none transition duration-200 ${
                      errors.deadline 
                        ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200' 
                        : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {errors.deadline && (
                    <p className="text-red-600 text-xs font-semibold mt-2">❌ {errors.deadline}</p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Tell us about your project requirements..."
                    rows="5"
                    className={`w-full px-4 py-3.5 border-2 rounded-lg focus:outline-none transition duration-200 resize-none ${
                      errors.description 
                        ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200' 
                        : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-600 text-xs font-semibold mt-2">❌ {errors.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Package Selection Section */}
            {packages[service] && (
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Package Selection</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {packages[service].map((pkg) => (
                    <label
                      key={pkg.name}
                      className={`relative cursor-pointer p-6 border-2 rounded-2xl transition duration-300 transform hover:scale-105 ${
                        form.package === pkg.name
                          ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg ring-2 ring-blue-200'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <input
                        type="radio"
                        name="package"
                        value={pkg.name}
                        checked={form.package === pkg.name}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition ${
                          form.package === pkg.name
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-gray-400'
                        }`}>
                          {form.package === pkg.name && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        {form.package === pkg.name && (
                          <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            Selected
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      <p className="text-4xl font-bold text-blue-600 mb-2">
                        {pkg.price.toLocaleString()}
                        <span className="text-lg font-semibold text-gray-600">৳</span>
                      </p>
                      <p className="text-xs text-gray-600">One-time payment</p>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Option Section */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Payment Option</h2>
              </div>

              <div className="space-y-3">
                {[
                  { value: 'full', label: 'Full Payment', icon: '💳' },
                  { value: 'advance', label: '50% Advance + 50% on Delivery', icon: '📅' },
                  { value: 'later', label: 'Pay Later (Manual Confirmation)', icon: '⏱️' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative cursor-pointer flex items-center p-4 border-2 rounded-xl transition duration-200 ${
                      form.payment === option.value
                        ? 'border-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option.value}
                      checked={form.payment === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center flex-shrink-0 transition ${
                      form.payment === option.value
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-400'
                    }`}>
                      {form.payment === option.value && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="ml-4 text-lg font-semibold text-gray-900 flex items-center">
                      <span className="mr-3 text-2xl">{option.icon}</span>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
              <button 
                type="submit" 
                className={`flex-1 text-white font-bold py-4 px-6 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    Submit Order
                  </>
                )}
              </button>
              <button 
                type="button" 
                className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => navigate('/')}
                disabled={isSubmitting}
              >
                ✕ Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">🔒 Your information is secure and confidential</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceOrderPage;