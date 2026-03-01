import {
  FaShieldAlt,
  FaRocket,
  FaHeadset,
  FaClock,
  FaCheck,
  FaGlobeAmericas,
} from "react-icons/fa";

export default function WhyChooseUs() {
  const reasons = [
    {
      id: 1,
      icon: FaShieldAlt,
      title: "Secure & Trusted",
      description: "100% secure transactions with encrypted payment processing",
    },
    {
      id: 2,
      icon: FaRocket,
      title: "Fast Delivery",
      description: "Quick delivery within 24-48 hours across Bangladesh",
    },
    {
      id: 3,
      icon: FaHeadset,
      title: "24/7 Support",
      description: "Dedicated customer support available round the clock",
    },
    {
      id: 4,
      icon: FaClock,
      title: "Quality Guarantee",
      description: "Premium quality products with warranty on all items",
    },
    {
      id: 5,
      icon: FaCheck,
      title: "Easy Returns",
      description: "Hassle-free returns and refunds within 30 days",
    },
    {
      id: 6,
      icon: FaGlobeAmericas,
      title: "Wide Selection",
      description: "Extensive range of digital products and services",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what makes Smart Digital the preferred choice for thousands
            of customers across Bangladesh
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.id}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-600 text-white p-4 rounded-full">
                    <Icon className="text-3xl" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Benefits Section */}
        <div className="mt-16 bg-blue-600 text-white rounded-lg p-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <FaCheck className="text-2xl" />
                  <span>Best price guarantee</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaCheck className="text-2xl" />
                  <span>Original products only</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaCheck className="text-2xl" />
                  <span>Expert service team</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaCheck className="text-2xl" />
                  <span>Flexible payment options</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Customer Success</h3>
              <ul className="space-y-3">
                <li className="text-4xl font-bold">50K+</li>
                <li className="text-xl">Happy Customers</li>
                <li className="text-4xl font-bold mt-6">4.8/5</li>
                <li className="text-xl">Average Rating</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
