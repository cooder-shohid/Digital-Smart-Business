import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-blue-500 text-white py-24 text-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Grow Your Business With Smart Digital Solutions
      </h1>
      <p className="mb-6">
        Digital Services & Quality Products in One Place
      </p>
      <button className="bg-orange-500 px-6 py-2 rounded mr-3">
        <a href="/services">Get Service</a>
      </button>
      <button className="bg-white text-blue-600 px-6 py-2 rounded">
        <a href="/shop">Shop Now</a>
      </button>
    </motion.section>
  );
}