import React, { useEffect, useState } from 'react';
import { Instagram, Phone, ArrowRight, Target, TrendingUp, Zap, ChevronDown, User, Building, Mail, MessageSquare, Globe, ShoppingBag, Users, AlertCircle, Trophy, FileText, TrendingUp as TrendingUpRight, X } from 'lucide-react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    industry: '',
    website: '',
    sell: '',
    customer: '',
    structure: '',
    challenge: '',
    success: '',
    consent: false
  });
  const [testimonialFormData, setTestimonialFormData] = useState({
    name: '',
    role: '',
    company: '',
    email: '',
    testimonial: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const testimonials = [
    {
      name: "Amina Khalil",
      role: "Marketing Strategist",
      company: "Bold Agency",
      quote: "Working with MVRK helped me scale faster than I imagined. The strategic clarity and execution framework transformed how we approach growth. Our revenue increased by 240% in just 6 months.",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Nassim Benali",
      role: "Startup Founder",
      company: "Zentech Labs",
      quote: "They unlocked a level of strategic thinking we never knew we needed. The sales system implementation was flawless, and the results speak for themselves - we went from struggling to close deals to having a predictable revenue stream.",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Lina Meftahi",
      role: "Product Manager",
      company: "NorthEdge",
      quote: "MVRK helped us fix our sales process and grow with confidence. The marketing strategy completely repositioned our brand in the market. We now attract high-quality leads consistently and our conversion rates have tripled.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Omar Trabelsi",
      role: "E-commerce Director",
      company: "Digital Souk",
      quote: "The marketing strategy transformed our brand positioning completely. We went from being just another e-commerce store to becoming the go-to platform in our niche. Revenue increased by 180% in 4 months.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Sarah Ben Ali",
      role: "CEO",
      company: "InnovateTN",
      quote: "MVRK's sales system implementation was a game-changer for our startup. We finally have predictable growth and a clear path to scale. The team's expertise in both strategy and execution is unmatched.",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Karim Hadj",
      role: "Business Development",
      company: "TechFlow Solutions",
      quote: "The growth acceleration program exceeded all expectations. Within 3 months, we had clarity on our market position, optimized sales processes, and a marketing strategy that actually converts. Highly recommended.",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when showing form
  useEffect(() => {
    if (showForm || showTestimonialForm) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showForm, showTestimonialForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTestimonialInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTestimonialFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Testimonial Form Data:', testimonialFormData);
    // Reset form
    setTestimonialFormData({ name: '', role: '', company: '', email: '', testimonial: '' });
    alert('Thank you for sharing your experience! We\'ll review your testimonial and get back to you soon.');
    setShowTestimonialForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const hubspotData = {
        fields: [
          { name: "firstname", value: formData.firstName },
          { name: "lastname", value: formData.lastName },
          { name: "email", value: formData.email },
          { name: "phone", value: formData.phone },
          { name: "company", value: formData.businessName },
          { name: "industry", value: formData.industry },
          { name: "website", value: formData.website },
          { name: "what_do_you_sell_", value: formData.sell },
          { name: "who_is_your_customer_", value: formData.customer },
          { name: "what_is_your_company_s_size_and_structure_", value: formData.structure },
          { name: "what_is_your_company_s_current_state_and_your_biggest_challenge_", value: formData.challenge },
          { name: "what_would_success_look_like_in_3_months_", value: formData.success },
          { name: "i_agree_to_be_contacted_by_an_email_or_whatsapp_", value: formData.consent ? "Yes" : "No" }
        ]
      };

      const response = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/146366517/5c79dd5b-f128-4eaf-a4cc-ae74c449d620', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotData)
      });

      if (response.ok) {
        setFormSubmitted(true);
        // Clear form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          businessName: '',
          industry: '',
          website: '',
          sell: '',
          customer: '',
          structure: '',
          challenge: '',
          success: '',
          consent: false
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      businessName: '',
      industry: '',
      website: '',
      sell: '',
      customer: '',
      structure: '',
      challenge: '',
      success: '',
      consent: false
    });
    setFormSubmitted(false);
    setShowForm(false);
  };

  // Custom Growth Chart Icon Component
  const GrowthChartIcon = ({ className }: { className?: string }) => (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="currentColor"
    >
      <path d="M15 85 L15 65 L25 65 L25 85 Z" />
      <path d="M35 85 L35 50 L45 50 L45 85 Z" />
      <path d="M55 85 L55 35 L65 35 L65 85 Z" />
      <path d="M75 85 L75 20 L85 20 L85 85 Z" />
      <path d="M20 60 L40 45 L60 30 L75 20 L85 15" stroke="currentColor" strokeWidth="3" fill="none" />
      <path d="M75 25 L85 15 L85 25 Z" />
    </svg>
  );

  // Modern Performance Arrow Icon - sleek and minimal
  const PerformanceArrowIcon = ({ className }: { className?: string }) => (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Sleek upward arrow with performance lines */}
      <path d="M7 17L17 7" />
      <path d="M17 7H11" />
      <path d="M17 7V13" />
      {/* Performance indicator lines */}
      <path d="M3 12L7 8" strokeWidth="1.5" opacity="0.6" />
      <path d="M3 16L5 14" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );

  // Testimonial Form Page
  if (showTestimonialForm) {
    return (
      <div className="bg-black text-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <img 
              src="/582b3ba5-44a7-495b-99db-d934013589cf-removebg-preview.png" 
              alt="MVRK Logo" 
              className="h-16 mx-auto mb-8 filter drop-shadow-2xl"
            />
            <button 
              onClick={() => setShowTestimonialForm(false)}
              className="text-gray-400 hover:text-white transition-colors duration-300 mb-8"
            >
              ← Back to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              Share Your Experience
            </h1>
            <p className="text-xl text-gray-300">
              Help others discover the impact of working with MVRK
            </p>
          </div>

          {/* Testimonial Form */}
          <form onSubmit={handleTestimonialSubmit} className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 rounded-3xl border border-gray-700">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                  <User className="w-4 h-4" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={testimonialFormData.name}
                  onChange={handleTestimonialInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  placeholder="Your full name"
                />
              </div>

              {/* Role */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                  <Target className="w-4 h-4" />
                  Role/Position *
                </label>
                <input
                  type="text"
                  name="role"
                  value={testimonialFormData.role}
                  onChange={handleTestimonialInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  placeholder="Your role or position"
                />
              </div>

              {/* Company */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                  <Building className="w-4 h-4" />
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  value={testimonialFormData.company}
                  onChange={handleTestimonialInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  placeholder="Your company name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                  <Mail className="w-4 h-4" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={testimonialFormData.email}
                  onChange={handleTestimonialInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>

              {/* Testimonial */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                  <MessageSquare className="w-4 h-4" />
                  Your Testimonial *
                </label>
                <textarea
                  name="testimonial"
                  value={testimonialFormData.testimonial}
                  onChange={handleTestimonialInputChange}
                  required
                  rows={6}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300 resize-none"
                  placeholder="Share your experience working with MVRK. What results did you achieve? How did it impact your business?"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-12 text-center">
              <button
                type="submit"
                className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
              >
                <span className="flex items-center gap-3">
                  Submit Testimonial
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              <p className="text-gray-400 text-sm mt-4">
                We'll review your testimonial and may feature it on our website
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="bg-black text-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <img 
              src="/582b3ba5-44a7-495b-99db-d934013589cf-removebg-preview.png" 
              alt="MVRK Logo" 
              className="h-16 mx-auto mb-8 filter drop-shadow-2xl"
            />
            <button 
              onClick={() => {
                setShowForm(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-gray-400 hover:text-white transition-colors duration-300 mb-8"
            >
              ← Back to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              Request Your Free Strategy Plan
            </h1>
          </div>

          {formSubmitted ? (
            /* Confirmation Message */
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-3xl border border-gray-700 text-center">
              <div className="bg-gradient-to-br from-green-600 to-green-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-white">✅ Your free growth plan is on its way!</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                You'll receive your custom plan in the next 24 hours. Meanwhile, feel free to reach out on WhatsApp.
              </p>
              <div className="space-y-4">
                <a 
                  href="https://wa.me/21629707770?text=Hi%20Salim%2C%20I%E2%80%99d%20like%20help%20growing%20my%20business.%20Can%20we%20talk%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Message on WhatsApp
                </a>
                <div className="pt-4">
                  <button 
                    onClick={resetForm}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Custom Form */
            <form id="custom-form" onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 rounded-3xl border border-gray-700">
              <div className="grid md:grid-cols-2 gap-8">
                {/* First Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <User className="w-4 h-4" />
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                    placeholder="Your first name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <User className="w-4 h-4" />
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                    placeholder="Your last name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <Mail className="w-4 h-4" />
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                    placeholder="+216 XX XXX XXX"
                  />
                </div>

                {/* Business Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <Building className="w-4 h-4" />
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="business-name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                    placeholder="Your business name"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <Target className="w-4 h-4" />
                    Industry *
                  </label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                    placeholder="Your industry"
                  />
                </div>

                {/* Website URL */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <Globe className="w-4 h-4" />
                    Website URL (optional)
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                {/* What Do You Sell */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <ShoppingBag className="w-4 h-4" />
                    What Do You Sell? *
                  </label>
                  <textarea
                    id="sell"
                    name="sell"
                    value={formData.sell}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300 resize-none"
                    placeholder="Describe your products or services..."
                  />
                </div>

                {/* Who Is Your Customer */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <Users className="w-4 h-4" />
                    Who Is Your Customer? *
                  </label>
                  <textarea
                    id="customer"
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300 resize-none"
                    placeholder="Describe your target audience..."
                  />
                </div>

                {/* Company Size and Structure */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <Building className="w-4 h-4" />
                    What Is Your Company's Size and Structure? *
                  </label>
                  <textarea
                    id="structure"
                    name="structure"
                    value={formData.structure}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300 resize-none"
                    placeholder="Tell us about your company size, team structure, etc..."
                  />
                </div>

                {/* Current State and Biggest Challenge */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <AlertCircle className="w-4 h-4" />
                    What Is Your Company's Current State and Your Biggest Challenge? *
                  </label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300 resize-none"
                    placeholder="What's your current situation and what's holding you back?"
                  />
                </div>

                {/* Success in 3 months */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <Trophy className="w-4 h-4" />
                    What Would Success Look Like In 3 Months? *
                  </label>
                  <textarea
                    id="success"
                    name="success"
                    value={formData.success}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300 resize-none"
                    placeholder="What are your goals and expectations?"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="md:col-span-2">
                  <label className="flex items-start gap-3 text-sm text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                    />
                    <span>
                      I agree to be contacted by email or WhatsApp regarding my business growth strategy. *
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-12 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  <span className="flex items-center gap-3">
                    {isSubmitting ? 'Submitting...' : 'Get My Free Strategy Plan'}
                    {!isSubmitting && <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />}
                  </span>
                </button>
                <p className="text-gray-400 text-sm mt-4">
                  You'll receive your personalized plan within 24 hours
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-gray-600 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-gray-700 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* Logo */}
          <div className="mb-12 transform hover:scale-105 transition-transform duration-500">
            <img 
              src="/582b3ba5-44a7-495b-99db-d934013589cf-removebg-preview.png" 
              alt="MVRK Logo" 
              className="h-24 mx-auto filter drop-shadow-2xl"
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
              We Don't Just Grow Brands.
            </span>
            <br />
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              We Help You Sell More — Faster.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light tracking-wide">
            Strategy. Sales. Growth.
          </p>

          {/* CTA Button */}
          <a 
            href="https://wa.me/21629707770?text=Hi%20Salim%2C%20I%E2%80%99d%20like%20help%20growing%20my%20business.%20Can%20we%20talk%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
          >
            Work With Me
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Scroll indicator at bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <ChevronDown className="w-5 h-5 mx-auto text-gray-500 animate-bounce" />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              What I Offer
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              No buzzwords. Just tailored solutions to help you attract the right audience, close more deals, and unlock new levels of growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 - Marketing Strategy */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-red-500/25 transition-all duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Marketing Strategy</h3>
              <ul className="text-gray-300 leading-relaxed space-y-3">
                <li>• Focus on strategy and positioning</li>
                <li>• Define the Marketing ICP (the audience your brand content should attract)</li>
                <li>• Content direction + messaging clarity</li>
                <li>• Manage all production: photoshoots, graphic design, video editing</li>
                <li>• Design and launch complete marketing campaigns</li>
              </ul>
              <p className="text-sm text-gray-400 mt-4 italic">
                Marketing ICP = people to attract and nurture before the sale
              </p>
            </div>

            {/* Service 2 - Sales Strategy */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-red-500/25 transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Sales Strategy</h3>
              <ul className="text-gray-300 leading-relaxed space-y-3">
                <li>• Define the Sales ICP (ready-to-buy segment)</li>
                <li>• Build full CRM & sales systems using tools like HubSpot</li>
                <li>• Set up automated chatbots to increase closing chances</li>
                <li>• Design sales campaigns and outreach sequences</li>
                <li>• Optimize each touchpoint to turn leads into revenue</li>
              </ul>
              <p className="text-sm text-gray-400 mt-4 italic">
                Sales ICP = qualified buyers actively making decisions
              </p>
            </div>

            {/* Service 3 - Growth Acceleration */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-red-500/25 transition-all duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Growth Acceleration</h3>
              <ul className="text-gray-300 leading-relaxed space-y-3">
                <li>• Consulting-style service: 1-on-1 strategic clarity</li>
                <li>• Identify and resolve growth bottlenecks</li>
                <li>• Plan scale pathways and streamline decision-making</li>
                <li>• Available as a free trial: strategic insight delivered in 24 hours</li>
                <li>• Acts as your entry-point offer to build trust</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Real results from real businesses
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative overflow-hidden mb-16">
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 via-gray-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 via-gray-900 to-transparent z-10 pointer-events-none"></div>
            
            {/* Scrolling container */}
            <div className="flex animate-scroll hover:pause-animation">
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-4"
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 h-full">
                    <div className="mb-6">
                      <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                        <p className="text-gray-500 text-sm">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Share Your Experience CTA */}
          <div className="text-center">
            <button
              onClick={() => setShowTestimonialForm(true)}
              className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
            >
              <span className="flex items-center gap-3">
                Share Your Experience
                <MessageSquare className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent flex items-center justify-center gap-3">
            <PerformanceArrowIcon className="w-7 h-7 text-white flex-shrink-0" />
            Get a Free Growth Plan — Delivered in 24 Hours
          </h2>
          <p className="text-xl text-gray-300 mb-4 leading-relaxed">
            Not sure what's blocking your growth?
          </p>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Share a few quick details about your business, and I'll send you a personalized strategy plan — free, actionable, and tailored to your needs.
          </p>
          <p className="text-lg text-gray-400 mb-12">
            Delivered to your inbox within 24 hours.
          </p>
          
          <button 
            onClick={() => {
              setShowForm(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
          >
            <span className="flex items-center gap-3">
              Get My Free Strategy Plan
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-lg">
            © 2025 MVRK. Built for mavericks, by mavericks.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;