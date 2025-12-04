import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function FloatingCTA({ onOpenResourceForm }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <Button 
            onClick={onOpenResourceForm}
            className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 py-4 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            <Gift className="mr-2 w-5 h-5" />
            Get Free Resources
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}