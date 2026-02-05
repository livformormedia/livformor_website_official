import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Play, Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ThankYou() {
  const [showVideos, setShowVideos] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState('');

  useEffect(() => {
    document.title = 'Thank You! | LivForMor Media';
    
    // Track page view
    if (typeof fbq !== 'undefined') {
      fbq('track', 'ViewContent', { content_name: 'Thank You Page' });
    }
  }, []);

  const handleChallengeSubmit = () => {
    // Track conversion
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: 'Quick Question Answered',
        content_category: 'Lead Generation',
        challenge: selectedChallenge
      });
    }

    setShowVideos(true);
  };

  const videos = [
    {
      title: 'How We Reverse Engineered a $100K/Month Clinic Funnel',
      thumbnail: 'https://img.youtube.com/vi/BUZTxaAu79I/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/BUZTxaAu79I'
    },
    {
      title: 'How to 3X Your Clinic\'s Lead Quality in Less Than 10 Minutes',
      thumbnail: 'https://img.youtube.com/vi/J4S0nqjbo30/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/J4S0nqjbo30'
    },
    {
      title: 'Patient Acquisition Strategies That Actually Work',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  if (showVideos) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Here Are Your Free Resources! 🎁
            </h1>
            <p className="text-xl text-gray-300">
              Watch these videos to transform your clinic's patient acquisition
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm leading-tight">{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Button 
              onClick={() => window.open('https://www.youtube.com/@LivForMorMedia', '_blank')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Youtube className="mr-2 w-5 h-5" />
              See More Free Training on YouTube
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            We Got Your Details! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            Before we show you the best resources for your clinic...
          </p>
        </div>

        <div className="mb-8">
          <label className="block text-gray-900 font-bold text-xl mb-4 text-center">
            What's your #1 marketing challenge right now?
          </label>
          <div className="space-y-3">
            {[
              'Not enough patient leads',
              'Leads are low quality',
              'High cost per patient',
              'Don\'t know where to start',
              'Need to scale what\'s working'
            ].map((option) => (
              <label 
                key={option} 
                className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:border-teal-600 hover:bg-teal-50 transition-all"
              >
                <input
                  type="radio"
                  name="challenge"
                  value={option}
                  checked={selectedChallenge === option}
                  onChange={(e) => setSelectedChallenge(e.target.value)}
                  className="w-5 h-5 text-teal-600 focus:ring-teal-500"
                />
                <span className="ml-3 text-gray-700 font-medium">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleChallengeSubmit}
          disabled={!selectedChallenge}
          className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <Play className="mr-2 w-5 h-5" />
          Open My Resources Now
        </Button>

        <p className="text-center text-gray-500 text-sm mt-4">
          You'll get instant access to our top 3 training videos
        </p>
      </motion.div>
    </div>
  );
}