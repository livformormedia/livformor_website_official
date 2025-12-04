import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Target, Radio, BookOpen, ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function CareFramework() {
  const [openStep, setOpenStep] = useState(null);

  const frameworkSteps = [
    {
      icon: Brain,
      letter: 'C',
      title: 'Clarity',
      subtitle: 'Define Your Ideal Patients',
      longDescription: 'We dive deep into understanding your ideal patient demographics, psychographics, and pain points. This clarity allows us to create messaging that resonates on an emotional level and drives action.',
      benefits: ['Precise patient targeting', 'Higher conversion rates', 'Reduced acquisition costs', 'Better patient-clinic fit'],
      results: [
        { label: 'Targeting Precision', value: '+94%' },
        { label: 'Message Relevance', value: '+87%' },
        { label: 'Conversion Rate', value: '+156%' }
      ],
      colorClasses: 'from-purple-500 to-indigo-600',
      bgColorClass: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      icon: Target,
      letter: 'A',
      title: 'Authority',
      subtitle: 'Build Trust & Credibility',
      longDescription: 'We establish your clinic as the go-to authority in mental health treatments through strategic content, social proof, and thought leadership positioning.',
      benefits: ['Enhanced credibility', 'Increased patient confidence', 'Premium positioning', 'Competitive advantage'],
      results: [
        { label: 'Trust Score', value: '+89%' },
        { label: 'Premium Pricing', value: '+34%' },
        { label: 'Referral Rate', value: '+67%' }
      ],
      colorClasses: 'from-blue-500 to-cyan-600',
      bgColorClass: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: Radio,
      letter: 'R',
      title: 'Reach',
      subtitle: 'Targeted Patient Acquisition',
      longDescription: 'Our precision-targeted advertising campaigns reach the right people at the right time with the right message, ensuring maximum ROI and quality patient acquisition.',
      benefits: ['Consistent patient flow', 'Optimized ad performance', 'Scalable growth', 'Measurable results'],
      results: [
        { label: 'Patient Volume', value: '+247%' },
        { label: 'Cost per Patient', value: '-42%' },
        { label: 'ROI', value: '+389%' }
      ],
      colorClasses: 'from-green-500 to-teal-600',
      bgColorClass: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      icon: BookOpen,
      letter: 'E',
      title: 'Education',
      subtitle: 'Content That Converts',
      longDescription: 'We develop educational content strategies that nurture prospects, address concerns, and guide them through their decision-making journey.',
      benefits: ['Reduced patient objections', 'Faster decision-making', 'Higher show-up rates', 'Improved patient outcomes'],
      results: [
        { label: 'Show-up Rate', value: '+76%' },
        { label: 'Patient Satisfaction', value: '+92%' },
        { label: 'Treatment Completion', value: '+84%' }
      ],
      colorClasses: 'from-orange-500 to-red-600',
      bgColorClass: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const toggleStep = (index) => {
    setOpenStep(openStep === index ? null : index);
  };

  return (
    <section id="care" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 text-teal-700 font-medium mb-6">
            <Target className="w-4 h-4 mr-2" />
            Our Proven Framework
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            The <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">C.A.R.E.</span> Framework
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the framework behind our clients' growth. A systematic approach to building sustainable patient pipelines.
          </p>
        </motion.div>

        {/* Accordion Framework */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {frameworkSteps.map((step, index) => {
            const isOpen = openStep === index;
            const IconComponent = step.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleStep(index)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={"w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r " + step.colorClasses}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={"text-2xl font-bold " + step.textColor}>{step.letter}</span>
                        <span className="text-2xl font-bold text-gray-900">— {step.title}</span>
                      </div>
                      <p className="text-gray-600">{step.subtitle}</p>
                    </div>
                  </div>
                  <ChevronDown className={"w-6 h-6 text-gray-400 transition-transform duration-300 " + (isOpen ? "rotate-180" : "")} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                              {step.longDescription}
                            </p>
                            <div className="space-y-2">
                              {step.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                  <span className="text-gray-700">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className={"rounded-xl p-6 " + step.bgColorClass}>
                            <h4 className="font-bold text-gray-900 mb-4">Typical Results</h4>
                            <div className="space-y-3">
                              {step.results.map((result, i) => (
                                <div key={i} className="flex justify-between items-center">
                                  <span className="text-gray-600">{result.label}</span>
                                  <span className={"font-bold " + step.textColor}>{result.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-12 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            Book a Strategy Call
            <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}