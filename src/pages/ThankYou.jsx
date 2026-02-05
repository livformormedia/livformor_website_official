import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ThankYou() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    biggest_challenge: '',
    current_patient_volume: '',
    growth_goal: '',
    biggest_obstacle: ''
  });

  useEffect(() => {
    document.title = 'Thank You! | LivForMor Media';
    
    // Track page view
    if (typeof fbq !== 'undefined') {
      fbq('track', 'ViewContent', { content_name: 'Thank You Page' });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Track conversion
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: 'Questionnaire Completed',
        content_category: 'Lead Generation'
      });
    }

    setSubmitted(true);

    // Redirect to YouTube after 2 seconds
    setTimeout(() => {
      window.location.href = 'https://www.youtube.com/@LivForMorMedia';
    }, 2000);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-12 shadow-2xl text-center max-w-md"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect! 🎉</h2>
          <p className="text-lg text-gray-600 mb-4">
            Redirecting you to our YouTube channel with free training...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-teal-600 border-t-transparent mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            You're All Set! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            Your resources are being prepared and will be emailed to you shortly.
          </p>
        </motion.div>

        {/* Questionnaire */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              One More Thing...
            </h2>
            <p className="text-gray-600">
              Help us personalize your experience by answering a few quick questions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question 1 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-teal-600" />
                What's your biggest marketing challenge right now?
              </label>
              <div className="space-y-2">
                {[
                  'Not enough patient leads',
                  'Leads are low quality',
                  'High cost per patient',
                  'Don\'t know where to start',
                  'Need to scale what\'s working'
                ].map((option) => (
                  <label key={option} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-teal-600 hover:bg-teal-50 transition-all">
                    <input
                      type="radio"
                      name="biggest_challenge"
                      value={option}
                      checked={formData.biggest_challenge === option}
                      onChange={(e) => handleChange('biggest_challenge', e.target.value)}
                      className="w-5 h-5 text-teal-600 focus:ring-teal-500"
                      required
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-600" />
                How many new patients are you getting per month?
              </label>
              <div className="space-y-2">
                {[
                  '0-5 patients',
                  '6-15 patients',
                  '16-30 patients',
                  '31-50 patients',
                  '50+ patients'
                ].map((option) => (
                  <label key={option} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-teal-600 hover:bg-teal-50 transition-all">
                    <input
                      type="radio"
                      name="current_patient_volume"
                      value={option}
                      checked={formData.current_patient_volume === option}
                      onChange={(e) => handleChange('current_patient_volume', e.target.value)}
                      className="w-5 h-5 text-teal-600 focus:ring-teal-500"
                      required
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                What's your growth goal for the next 6 months?
              </label>
              <div className="space-y-2">
                {[
                  'Get first patients (just starting)',
                  'Double current patient volume',
                  'Triple or more current volume',
                  'Stabilize and optimize current flow',
                  'Scale to multiple locations'
                ].map((option) => (
                  <label key={option} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-teal-600 hover:bg-teal-50 transition-all">
                    <input
                      type="radio"
                      name="growth_goal"
                      value={option}
                      checked={formData.growth_goal === option}
                      onChange={(e) => handleChange('growth_goal', e.target.value)}
                      className="w-5 h-5 text-teal-600 focus:ring-teal-500"
                      required
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 4 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-teal-600" />
                What's the biggest obstacle preventing you from growing faster?
              </label>
              <div className="space-y-2">
                {[
                  'Limited marketing budget',
                  'Don\'t know how to market effectively',
                  'No time to manage marketing',
                  'Previous marketing didn\'t work',
                  'Compliance/HIPAA concerns'
                ].map((option) => (
                  <label key={option} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-teal-600 hover:bg-teal-50 transition-all">
                    <input
                      type="radio"
                      name="biggest_obstacle"
                      value={option}
                      checked={formData.biggest_obstacle === option}
                      onChange={(e) => handleChange('biggest_obstacle', e.target.value)}
                      className="w-5 h-5 text-teal-600 focus:ring-teal-500"
                      required
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              Get My Free Resources
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </motion.div>

        {/* Value Reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 text-gray-500 text-sm"
        >
          <p>We'll redirect you to our YouTube channel with exclusive training videos</p>
        </motion.div>
      </div>
    </div>
  );
}