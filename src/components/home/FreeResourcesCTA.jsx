import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Gift } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function FreeResourcesCTA({ onOpenResourceForm }) {
  const benefits = [
    'Customized growth recommendations',
    'Industry-specific insights',
    'Actionable strategies',
    'No cost, no obligation'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-teal-600 to-blue-700">
      <div className="w-full">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Gift className="w-8 h-8 text-white" />
            </div>

            {/* Header */}
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Free Resources
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"> Tailored to Your Clinic</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              Fill out a short questionnaire and get valuable, practical resources at your fingertips — at no cost.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto mb-8 text-left">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button 
              onClick={onOpenResourceForm}
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Get Your Free Resources
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <p className="text-gray-500 text-sm mt-4">
              Takes less than 2 minutes • 100% Free
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}