import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Target, Zap, Shield } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Target,
      title: 'High-Quality, Treatment-Ready Patients',
      description: 'We build ad systems that deliver high-quality, treatment-ready patients every month.',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Users,
      title: 'Direct-to-Pain Messaging',
      description: 'We craft messaging that speaks directly to pain points and builds instant credibility.',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Zap,
      title: 'Automated Efficiency',
      description: 'From automated funnels to pre-qualification — we increase efficiency without overloading your team.',
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  const additionalFeatures = [
    'HIPAA-compliant campaign management',
    'Real-time performance dashboards',
    '24/7 campaign monitoring & optimization',
    'Weekly strategy sessions',
    'Custom landing page creation',
    'Custom, unique ads tailored to your clinic'
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 text-teal-700 font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Why Choose LivForMor Media
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Ketamine, TMS, Spravato & Psychedelic Therapy
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"> Marketing Specialists</span>
          </h2>
        </motion.div>

        {/* Main Benefits */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={"w-16 h-16 rounded-2xl bg-gradient-to-r flex items-center justify-center mb-6 " + benefit.gradient}>
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100 max-w-5xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Everything You Need to Scale
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our comprehensive approach ensures every aspect of your patient acquisition is optimized for maximum results and minimum stress on your team.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {additionalFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 text-center">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Grow Your Clinic?</h4>
                  <p className="text-gray-600 mb-6">Let us build a custom patient acquisition system for your Ketamine, TMS, Spravato, or Psychedelic Therapy clinic.</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Free strategy consultation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Custom growth roadmap</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">No obligation to work with us</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}