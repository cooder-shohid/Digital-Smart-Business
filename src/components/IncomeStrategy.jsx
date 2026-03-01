import {
  FaCalendarCheck,
  FaShoppingCart,
  FaReceipt,
  FaWrench,
} from "react-icons/fa";

export default function IncomeStrategy() {
  const strategies = [
    {
      id: 1,
      icon: FaCalendarCheck,
      title: "Service Booking",
      description:
        "Customers can schedule and pay for digital services directly through our platform.",
    },
    {
      id: 2,
      icon: FaShoppingCart,
      title: "Product Selling",
      description:
        "Sell a wide range of tech products with competitive pricing and easy checkout.",
    },
    {
      id: 3,
      icon: FaReceipt,
      title: "Subscription Plan",
      description:
        "Offer recurring plans for premium tools and support with flexible billing.",
    },
    {
      id: 4,
      icon: FaWrench,
      title: "Maintenance Charge",
      description:
        "Optional maintenance packages ensure long-term reliability for clients.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Income Strategy</h2>
        <p className="text-lg text-gray-600 mb-12">
          We generate revenue through multiple, customer-friendly channels.
        </p>
        <div className="grid md:grid-cols-4 gap-8">
          {strategies.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="p-6 rounded-lg border hover:shadow-lg transition"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
