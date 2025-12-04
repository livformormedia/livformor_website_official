import React from 'react';
import { Button } from "@/components/ui/button";
import { Gift, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection({ onOpenResourceForm }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-teal-50 pt-20">
      <div className="w-full">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 text-teal-700 font-medium mb-8"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            #1 Mental Health Marketing Agency
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
          >
            Growing Clinics That{' '}
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Actually Change Lives
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            We help people-first Ketamine, TMS & Spravato clinics build sustainable patient pipelines — and{' '}
            <span className="font-semibold text-teal-600">heal the world</span>.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button 
              onClick={onOpenResourceForm}
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-6 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Gift className="mr-2 w-5 h-5" />
              Get Free Growth Resources
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-8 md:gap-16 pt-12 mt-12 border-t border-gray-200"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">$500K+</div>
              <div className="text-sm text-gray-600">Ad Spend Managed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">6+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">ROI Focused</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}