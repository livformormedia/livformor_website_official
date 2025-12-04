import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection({ onOpenResourceForm }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50 overflow-x-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 text-teal-700 font-medium mb-6"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              #1 Mental Health Marketing Agency
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6 break-words"
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
              className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed"
            >
              We help people-first Ketamine, TMS & Spravato clinics build sustainable patient pipelines — and{' '}
              <span className="font-semibold text-teal-600">heal the world</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                onClick={onOpenResourceForm}
                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                <Gift className="mr-2 w-5 h-5" />
                Get Free Growth Resources
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-4 sm:gap-8 pt-10 mt-10 border-t border-gray-200"
            >
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">$500K+</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Ad Spend Managed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">6+</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Years Experience</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">100%</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">ROI Focused</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative bg-gradient-to-br from-teal-500 to-blue-600 rounded-3xl p-6 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="text-gray-900 font-semibold">Campaign Performance</div>
                  <div className="text-green-600 font-bold text-lg">↗ +247%</div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 text-sm">Treatment-Ready Patients</span>
                      <span className="font-bold text-gray-900">+156%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="bg-gradient-to-r from-teal-500 to-blue-600 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 text-sm">Cost Per Acquisition</span>
                      <span className="font-bold text-green-600">-42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ delay: 1.4, duration: 1 }}
                        className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 text-sm">Monthly Revenue</span>
                      <span className="font-bold text-blue-600">+289%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ delay: 1.6, duration: 1 }}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}