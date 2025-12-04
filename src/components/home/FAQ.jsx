import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openItems, setOpenItems] = useState([0]); // First item open by default

  const toggleItem = (index) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What makes LivForMor Media different from other marketing agencies?",
      answer: "We specialize exclusively in mental health clinics and understand your patients better than anyone. Our C.A.R.E. framework is specifically designed for Ketamine, TMS, Spravato, and Neurofeedback treatments. We don't just run generic ads - we build complete patient acquisition systems that respect the sensitive nature of mental health care."
    },
    {
      question: "How do you measure campaign success?",
      answer: "We focus on booked appointments and treatment-ready patients, not just leads or clicks. Our primary metrics include cost per qualified patient, show-up rates, treatment completion rates, and overall ROI. We provide transparent reporting with real-time dashboards so you can see exactly how your investment is performing."
    },
    {
      question: "Do you work with clinics outside your local area?",
      answer: "Yes, we serve mental health clinics across the United States. Our digital-first approach and deep understanding of mental health regulations allow us to effectively serve clients nationwide. We're familiar with state-specific regulations and advertising requirements for mental health practices."
    },
    {
      question: "Is your pricing model flexible?",
      answer: "Absolutely. We offer both flat-rate monthly packages and performance-based options. Our pricing scales with your clinic size and goals. We believe in transparent pricing with no hidden fees, and we'll work with you to find a structure that fits your budget and growth objectives."
    },
    {
      question: "Do you provide ongoing support and optimization?",
      answer: "Yes, continuous optimization is core to our service. We provide 24/7 campaign monitoring, weekly optimization updates, monthly strategy sessions, and quarterly business reviews. Your dedicated account manager is always available to discuss performance and strategic adjustments."
    },
    {
      question: "How quickly can we expect to see results?",
      answer: "Most clients see initial improvements within 30-45 days, with significant results typically appearing within 60-90 days. However, building a sustainable patient pipeline takes time. We focus on long-term growth rather than quick wins, ensuring your success is sustainable and scalable."
    },
    {
      question: "Are your marketing practices HIPAA compliant?",
      answer: "Yes, all our marketing practices are fully HIPAA compliant. We understand the sensitive nature of mental health information and ensure all campaigns, landing pages, and data collection methods meet strict healthcare privacy standards. We also provide ongoing compliance monitoring."
    },
    {
      question: "What if we're not satisfied with the results?",
      answer: "We stand behind our work with a 90-day satisfaction guarantee. If you're not seeing meaningful improvements in your patient acquisition within the first 90 days, we'll work with you to adjust our strategy or provide a full refund. Your success is our reputation."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 text-teal-700 font-medium mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Quick Answers to
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"> Common Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about working with LivForMor Media
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-2xl"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-6 h-6 text-teal-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 border border-teal-100"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Schedule a free strategy call to discuss your specific needs and goals
          </p>
          <button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Book a Free Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
}