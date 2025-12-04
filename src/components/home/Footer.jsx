import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">LM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">LivForMor Media</h1>
                <p className="text-teal-400 font-medium">Mental Health Marketing Specialists</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
              Helping people-first Ketamine, TMS & Spravato clinics build sustainable patient pipelines and heal the world, one patient at a time.
            </p>

            <div className="flex items-center text-gray-400 mb-2">
              <Heart className="w-5 h-5 mr-2 text-red-400" />
              <span>Made with care for mental health clinics</span>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <a 
                href="mailto:orielmor@livformor.com"
                className="flex items-center text-gray-300 hover:text-teal-400 transition-colors group"
              >
                <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                orielmor@livformor.com
              </a>
              <a 
                href="tel:+13214155268"
                className="flex items-center text-gray-300 hover:text-teal-400 transition-colors group"
              >
                <Phone className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                +1 (321) 415-5268
              </a>
              <div className="flex items-start text-gray-300">
                <MapPin className="w-5 h-5 mr-3 mt-0.5" />
                <span>30 N Gould St, Sheridan, WY 82801</span>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-6">Ready to Grow?</h3>
            <p className="text-gray-300 mb-6">
              Book a free strategy call and discover how we can help your clinic thrive.
            </p>
            <Button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white rounded-full font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 group">
              Schedule Free Call
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <div className="mb-4 md:mb-0">
              © {currentYear} LivForMor Media. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-teal-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}