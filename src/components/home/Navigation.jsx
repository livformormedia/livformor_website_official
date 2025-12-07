import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation({ isScrolled, onOpenResourceForm }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'The C.A.R.E. Framework', href: '#care' },
    { name: 'YouTube', href: '#youtube' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={"fixed top-0 left-0 right-0 z-50 transition-all duration-300 " + (isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100" : "bg-transparent")}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/687b95cb6d123a0324ad6637/b6fc53ddd_LivForMorMediaLogo.png"
              alt="LivForMor Media"
              className="h-12 sm:h-16 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={"font-medium transition-colors duration-200 relative group text-sm " + (isScrolled ? "text-gray-700 hover:text-teal-600" : "text-white/80 hover:text-white")}
              >
                {item.name}
                <span className={"absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full " + (isScrolled ? "bg-teal-600" : "bg-teal-400")}></span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-3">
            <Button 
              onClick={onOpenResourceForm}
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              <Gift className="w-4 h-4 mr-2 hidden sm:block" />
              Get Free Resources
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}