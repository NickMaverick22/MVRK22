import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useTestimonials } from '../hooks/useSanity';
import { urlFor } from '../lib/sanity';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  rating?: number;
  photo?: {
    asset: {
      _id: string;
      url: string;
    };
  };
}

export default function TestimonialSection() {
  const { data: testimonials, loading, error } = useTestimonials();

  if (loading) {
    return (
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            Client Success Stories
          </h2>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-3xl border border-gray-700">
            <p className="text-gray-400 text-lg">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            Client Success Stories
          </h2>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-3xl border border-gray-700">
            <p className="text-gray-400 text-lg">
              Success stories coming soon. Meanwhile, let's discuss your growth goals.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            Client Success Stories
          </h2>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-3xl border border-gray-700">
            <p className="text-gray-400 text-lg">
              Success stories and client testimonials will be featured here soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real results from real businesses that trusted us to accelerate their growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial: Testimonial) => (
            <div 
              key={testimonial._id}
              className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-red-500 opacity-60" />
              </div>

              {/* Testimonial Quote */}
              <blockquote className="text-gray-300 text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Rating */}
              {testimonial.rating && (
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating! 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {testimonial.photo && (
                  <img 
                    src={urlFor(testimonial.photo)}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                  />
                )}
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}