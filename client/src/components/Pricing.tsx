import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, Sparkles, Shield, Lock } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for individual content creators',
    monthlyPrice: 0,
    yearlyPrice: 0,
    popular: false,
    features: [
      { name: 'AI article generation', included: true, limit: '5 articles/month' },
      { name: 'SEO keyword research', included: true },
      { name: 'Plagiarism checker', included: true, limit: '5 checks/month' },
      { name: 'Bulk content generation', included: false },
      { name: 'Team collaboration', included: false },
      { name: 'API access', included: false },
      { name: 'Export to WordPress', included: true },
      { name: 'Priority support', included: false },
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800',
  },
  {
    name: 'Pro',
    description: 'For SEO agencies and growing teams',
    monthlyPrice: 49,
    yearlyPrice: 39,
    popular: true,
    features: [
      { name: 'AI article generation', included: true, limit: 'Unlimited' },
      { name: 'SEO keyword research', included: true },
      { name: 'Plagiarism checker', included: true, limit: 'Unlimited' },
      { name: 'Bulk content generation', included: true, limit: '50 articles/batch' },
      { name: 'Team collaboration', included: true, limit: 'Up to 5 members' },
      { name: 'API access', included: false },
      { name: 'Export to WordPress', included: true },
      { name: 'Priority support', included: true },
    ],
    cta: 'Upgrade Now',
    ctaStyle: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl hover:scale-105',
  },
  {
    name: 'Business',
    description: 'Enterprise-grade for large organizations',
    monthlyPrice: 149,
    yearlyPrice: 119,
    popular: false,
    features: [
      { name: 'AI article generation', included: true, limit: 'Unlimited' },
      { name: 'SEO keyword research', included: true },
      { name: 'Plagiarism checker', included: true, limit: 'Unlimited' },
      { name: 'Bulk content generation', included: true, limit: 'Unlimited' },
      { name: 'Team collaboration', included: true, limit: 'Unlimited members' },
      { name: 'API access', included: true },
      { name: 'Export to WordPress', included: true },
      { name: 'Priority support', included: true, limit: '24/7 dedicated' },
    ],
    cta: 'Contact Sales',
    ctaStyle: 'border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800',
  },
];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your content needs. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 transition-all duration-300 ${
                plan.popular
                  ? 'border-blue-500 shadow-2xl scale-105'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {plan.description}
                </p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Billed annually (${plan.yearlyPrice * 12}/year)
                  </p>
                )}
              </div>

              <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${plan.ctaStyle} mb-6`}>
                {plan.cta}
              </button>

              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <span className={`text-sm ${
                        feature.included
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-400 dark:text-gray-600 line-through'
                      }`}>
                        {feature.name}
                      </span>
                      {feature.limit && feature.included && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          ({feature.limit})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-3 gap-6"
        >
          <div className="flex items-center gap-3 justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <Shield className="w-6 h-6 text-green-500" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm">Money-Back Guarantee</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">30-day refund policy</div>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <Lock className="w-6 h-6 text-blue-500" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm">SOC 2 Compliant</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Enterprise security</div>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <Shield className="w-6 h-6 text-purple-500" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm">GDPR Ready</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Data protection certified</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
