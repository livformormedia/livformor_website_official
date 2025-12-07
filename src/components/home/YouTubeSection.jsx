import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Play, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function YouTubeSection() {
  const videos = [
    {
      title: 'How We Reverse Engineered a $100K/Month Clinic Funnel',
      description: 'See exactly how we broke down and rebuilt a winning marketing funnel.',
      thumbnail: 'https://img.youtube.com/vi/BUZTxaAu79I/maxresdefault.jpg',
      videoUrl: 'https://youtu.be/BUZTxaAu79I?si=y3TTtVP-FumzKt1q',
      featured: true
    },
    {
      title: 'How to 3X Your Clinic\'s Lead Quality in Less Than 10 Minutes',
      description: 'Learn the strategies that help clinics attract quality patients fast.',
      thumbnail: 'https://img.youtube.com/vi/J4S0nqjbo30/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=J4S0nqjbo30',
      featured: false
    }
  ];

  return (
    <section id="youtube" className="py-20 bg-gray-900">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 font-medium mb-6">
            <Youtube className="w-4 h-4 mr-2" />
            Free Training
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Watch Our <span className="text-red-500">YouTube Channel</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Get valuable insights and proven strategies for growing your mental health clinic — completely free.
          </p>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 group cursor-pointer hover:border-gray-600 transition-colors"
              onClick={() => window.open(video.videoUrl, '_blank')}
            >
              <div className="relative aspect-video">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                  </div>
                </div>
                {video.featured && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button 
            onClick={() => window.open('https://www.youtube.com/@LivForMorMedia', '_blank')}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <Youtube className="mr-2 w-5 h-5" />
            Get More Practical Insights
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}