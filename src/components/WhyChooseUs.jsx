import { motion } from 'framer-motion';
import React from 'react';

export default function WhyChooseUs() {
  const benefits = [
    {
      title: "Best Prices",
      description: "We offer competitive rates based on current market demand.",
      icon: "🏆",
    },
    {
      title: "Fast Payments",
      description: "Get paid within 24 hours after verification.",
      icon: "⚡",
    },
    {
      title: "Secure Process",
      description: "Bank-level security for all your transactions.",
      icon: "🔒",
    },
    {
      title: "Dedicated Support",
      description: "Our team is available to help at every step.",
      icon: "👨‍💻",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          Why Choose SoftSell
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="text-3xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}