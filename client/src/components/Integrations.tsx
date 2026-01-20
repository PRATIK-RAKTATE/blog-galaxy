import { motion } from 'motion/react';

const logos = [
  { name: 'WordPress', width: 'w-32' },
  { name: 'Medium', width: 'w-28' },
  { name: 'Shopify', width: 'w-32' },
  { name: 'Webflow', width: 'w-32' },
  { name: 'Ghost', width: 'w-24' },
  { name: 'Notion', width: 'w-28' },
];

export function Integrations() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Seamless Integrations
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Publish directly to your favorite platforms or export anywhere.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center"
            >
              <div className={`${logo.width} h-12 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-300 dark:border-gray-700`}>
                <span className="text-gray-600 dark:text-gray-400 font-semibold text-sm">
                  {logo.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Plus API access for custom integrations
          </p>
          <button className="text-blue-500 hover:text-blue-600 font-semibold">
            View All Integrations →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
