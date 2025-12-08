import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function FounderSection() {
  const founders = [
    {
      name: 'Oriel Mor',
      role: 'Co-Founder & CEO',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/687b95cb6d123a0324ad6637/c45d6010d_WhatsAppImage2025-12-08at124721.jpg',
      bio: 'After managing over $1M in paid campaigns and spending 6 years in sales and advertising, Oriel shifted his focus to helping mental health clinics grow ethically and sustainably.',
      specialty: 'Marketing & Strategy'
    },
    {
      name: 'Matt Rodriguez',
      role: 'Co-Founder & COO',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/687b95cb6d123a0324ad6637/cd0092663_1758778991047.jpg',
      bio: 'As a TMS clinic manager in Utah and former Head of Marketing at Greenbrook TMS for 2 years, Matt brings deep industry expertise and insider knowledge to help clinics scale effectively.',
      specialty: 'Operations & Growth'
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 text-teal-700 font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            Meet the Founders
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Passionate About
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"> Healing Lives</span>
          </h2>
        </motion.div>

        {/* Founders Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
            >
              <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden">
                <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{founder.name}</h3>
              <p className="text-teal-600 font-semibold mb-2">{founder.role}</p>
              <p className="text-sm text-gray-500 mb-4">{founder.specialty}</p>
              <p className="text-gray-600 leading-relaxed">{founder.bio}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl p-8 lg:p-12 border border-teal-100 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-xl text-gray-700 leading-relaxed">
              "Every mental health clinic deserves to reach the patients who need them most. Our job is to bridge that gap with ethical, effective marketing that honors both the clinic's values and the patient's journey to healing."
            </p>
            <div className="flex items-center justify-center mt-8">
              <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full"></div>
              <span className="mx-4 text-gray-500 font-medium">Oriel & Matt</span>
              <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
            Get Free Practical Resources
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}