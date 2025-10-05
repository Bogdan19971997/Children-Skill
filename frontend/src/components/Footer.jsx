import React from 'react';
import { Heart, Star, BookOpen } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-200 to-yellow-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-orange-700">KidsLearn</span>
            </div>
            <p className="text-orange-600 text-lg font-medium">
              Making learning fun for children aged 4-10!
            </p>
          </div>

          {/* Learning Areas */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-orange-700 mb-4">Learning Areas</h3>
            <ul className="space-y-2 text-orange-600 font-medium">
              <li>📚 Interactive Stories</li>
              <li>🔢 Math Adventures</li>
              <li>🌟 Life Skills</li>
              <li>🎮 Fun Exercises</li>
            </ul>
          </div>

          {/* Fun Facts */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold text-orange-700 mb-4">Fun & Safe</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-end space-x-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-orange-600 font-medium">Kid-Friendly Content</span>
              </div>
              <div className="flex items-center justify-center md:justify-end space-x-2">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <span className="text-orange-600 font-medium">Made with Love</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-orange-300 text-center">
          <p className="text-orange-600 font-medium text-lg">
            © 2025 KidsLearn - Helping children learn and grow! 🌱
          </p>
        </div>
      </div>
    </footer>
  );
};