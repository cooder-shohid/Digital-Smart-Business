import {
  FaMobileAlt,
  FaCloud,
  FaUsers,
  FaLaptop,
} from "react-icons/fa";

export default function AdditionalServices() {
  const items = [
    {
      id: 1,
      icon: FaMobileAlt,
      title: "App Development",
      description: "Custom mobile applications for Android and iOS platforms.",
    },
    {
      id: 2,
      icon: FaCloud,
      title: "Cloud Hosting",
      description: "Reliable and scalable cloud solutions for your business.",
    },
    {
      id: 3,
      icon: FaUsers,
      title: "Virtual Assistance",
      description: "Professional assistants to handle administrative tasks.",
    },
    {
      id: 4,
      icon: FaLaptop,
      title: "IT Consulting",
      description: "Expert advice to streamline your tech infrastructure.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to- from-indigo-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">More Services</h2>
          <p className="text-gray-600 mt-2">
            Explore additional offerings tailored for growing businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-1"
              >
                <div className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-indigo-600 text-white p-3 rounded-full">
                      <Icon className="text-2xl" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{s.description}</p>
                  <button className="text-indigo-600 font-medium hover:underline">
                    Learn More →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
