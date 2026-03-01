import { FaStar } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Hassan",
      role: "Business Owner",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
      rating: 5,
      text: "Smart Digital has transformed my business. Their products are top quality and the customer service is exceptional. Highly recommended!",
    },
    {
      id: 2,
      name: "Fatima Khan",
      role: "Tech Enthusiast",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
      rating: 5,
      text: "Amazing experience! Fast delivery, great prices, and the products are exactly as described. Will definitely shop again.",
    },
    {
      id: 3,
      name: "Rajib Ahmed",
      role: "Freelancer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajib",
      rating: 4,
      text: "Great selection of products and very competitive prices. The support team helped me quickly when I had questions.",
    },
    {
      id: 4,
      name: "Sadia Akter",
      role: "Programmer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sadia",
      rating: 5,
      text: "Best online store I've found. The checkout process is smooth, and my order arrived faster than expected!",
    },
    {
      id: 5,
      name: "Karim Uddin",
      role: "Startup Founder",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
      rating: 5,
      text: "Reliable vendor with excellent quality products. We've been ordering from them for 6 months now with zero issues.",
    },
    {
      id: 6,
      name: "Nadia Islam",
      role: "Student",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia",
      rating: 4,
      text: "Affordable prices and genuine products. Perfect for students like me. Thank you Smart Digital!",
    },
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < rating ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Smart Digital for
            their digital needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Stars */}
              <div className="mb-4">{renderStars(testimonial.rating)}</div>

              {/* Testimonial Text */}
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center space-x-4 border-t pt-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <p className="text-4xl font-bold text-blue-600 mb-2">50,000+</p>
            <p className="text-gray-600 text-lg">Happy Customers</p>
          </div>
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <p className="text-4xl font-bold text-blue-600 mb-2">4.8/5</p>
            <p className="text-gray-600 text-lg">Average Rating</p>
          </div>
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <p className="text-4xl font-bold text-blue-600 mb-2">100%</p>
            <p className="text-gray-600 text-lg">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
