import { motion } from 'framer-motion';
import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      title: "Upload License Details",
      description: "Provide information about your unused software licenses.",
      icon: "📄",
    },
    {
      title: "Get Instant Valuation",
      description: "Our system calculates your license's current market value.",
      icon: "💰",
    },
    {
      title: "Receive Payment",
      description: "Get paid quickly once your licenses are verified.",
      icon: "💳",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          How SoftSell Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700 hover:shadow-md transition duration-300"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}