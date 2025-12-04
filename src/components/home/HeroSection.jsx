import React from 'react';
import { Button } from "@/components/ui/button";
import { Gift, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection({ onOpenResourceForm }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gray-950 pt-20 overflow-hidden">
      {/* Animated Glowing Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary glow orb - teal - morphing and color shifting */}
        <motion.div
          animate={{
            x: [0, 150, -100, 50, 0],
            y: [0, -120, 80, -50, 0],
            scale: [1, 1.4, 0.8, 1.2, 1],
            opacity: [0.3, 0.5, 0.25, 0.45, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-400 rounded-full blur-[100px]"
        />
        {/* Secondary glow orb - blue - faster movement */}
        <motion.div
          animate={{
            x: [0, -120, 100, -60, 0],
            y: [0, 100, -80, 120, 0],
            scale: [1, 0.7, 1.3, 0.9, 1],
            opacity: [0.35, 0.5, 0.2, 0.4, 0.35],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-blue-500 rounded-full blur-[100px]"
        />
        {/* Third orb - purple - pulsing */}
        <motion.div
          animate={{
            x: [0, 80, -60, 100, 0],
            y: [0, -80, 100, -40, 0],
            scale: [1, 1.5, 0.6, 1.3, 1],
            opacity: [0.25, 0.4, 0.15, 0.35, 0.25],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[120px]"
        />
        {/* Fourth orb - cyan accent - quick pulses */}
        <motion.div
          animate={{
            x: [0, -100, 80, -40, 0],
            y: [0, 60, -100, 80, 0],
            scale: [0.8, 1.2, 0.6, 1.4, 0.8],
            opacity: [0.2, 0.45, 0.1, 0.35, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-cyan-400 rounded-full blur-[90px]"
        />
        {/* Fifth orb - indigo deep */}
        <motion.div
          animate={{
            x: [0, 60, -80, 40, 0],
            y: [0, -40, 60, -80, 0],
            scale: [1.1, 0.7, 1.4, 0.9, 1.1],
            opacity: [0.2, 0.35, 0.15, 0.3, 0.2],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 left-1/3 w-[550px] h-[550px] bg-indigo-600 rounded-full blur-[110px]"
        />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="w-full relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-teal-400 font-medium mb-8"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            #1 Mental Health Marketing Agency
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Growing Clinics That{' '}
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Actually Change Lives
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            We help people-first Ketamine, TMS & Spravato clinics build sustainable patient pipelines — and{' '}
            <span className="font-semibold text-teal-400">heal the world</span>.
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
            className="flex justify-center gap-8 md:gap-16 pt-12 mt-12 border-t border-white/10"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">$500K+</div>
              <div className="text-sm text-gray-400">Ad Spend Managed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">6+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-400">ROI Focused</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}