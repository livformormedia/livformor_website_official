import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function FounderSection() {
  const founders = [
    {
      name: 'Oriel Mor',
      role: 'Co-Founder & CEO',
      initials: 'OM',
      bio: 'After managing over $500,000 in paid campaigns and spending 6 years in sales and advertising, Oriel shifted his focus to helping mental health clinics grow ethically and sustainably.',
      specialty: 'Marketing & Strategy'
    },
    {
      name: 'Matt Rodriguez',
      role: 'Co-Founder & COO',
      initials: 'MR',
      bio: 'With extensive experience in operations and business development, Matt ensures our clients receive seamless execution and measurable results from every campaign.',
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
              <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{founder.initials}</span>
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
            Book a Strategy Call
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}