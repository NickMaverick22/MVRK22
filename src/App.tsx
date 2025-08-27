import React, { useEffect, useState } from 'react';
import { CheckCircle, Target, TrendingUp, Zap, ArrowRight, User, Mail, Phone, Building, Globe, ShoppingBag, Calendar, Clock, BarChart3, Users, Award, Star } from 'lucide-react';
import { AuthProvider, useAuth } from './components/AuthContext';
import OnboardingFlow from './components/OnboardingFlow';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';

function MainApp() {
  const { user, isAuthenticated } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    brandName: '',
    monthlyRevenue: '',
    adSpend: '',
    challenge: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        brandName: '',
        monthlyRevenue: '',
        adSpend: '',
        challenge: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show onboarding flow for new users
  if (showOnboarding) {
    return (
      <OnboardingFlow 
        onComplete={() => {
          setShowOnboarding(false);
        }} 
      />
    );
  }

  // Show login form
  if (showLogin) {
    return (
      <LoginForm 
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowOnboarding(true);
        }}
        onLoginSuccess={() => {
          setShowLogin(false);
        }}
      />
    );
  }

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left spacer for balance */}
            <div className="flex-1"></div>
            
            {/* Centered Logo */}
            <div className="flex-1 flex justify-center">
              <img 
                src="/582b3ba5-44a7-495b-99db-d934013589cf-removebg-preview.png" 
                alt="MVRK Logo" 
                className="h-14 filter drop-shadow-lg"
              />
            </div>
            
            {/* User Actions */}
            <div className="flex-1 flex justify-end">
              <div className="flex items-center gap-4">
                {isAuthenticated && user ? (
                  <button
                    onClick={() => setShowProfile(true)}
                    className="flex items-center gap-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="bg-gradient-to-br from-red-600 to-red-700 w-8 h-8 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden sm:block">{user.firstName}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowLogin(true)}
                      className="text-gray-300 hover:text-white font-medium transition-colors duration-300"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setShowOnboarding(true)}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* User Profile Modal */}
      {showProfile && (
        <UserProfile onClose={() => setShowProfile(false)} />
      )}

      {/* 1. Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-gray-600 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-gray-700 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
              We Scale E-Commerce Brands Into 6 & 7 Figures.
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light tracking-wide">
            Performance-based. If we don't grow your revenue profitably, you don't pay.
          </p>

          <a 
            href="#application"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
          >
            Apply to Work With Us
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </section>

      {/* 2. About the Founder */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              Led by Salim Soussi, Brand Scaling Expert.
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-red-600 to-red-700 w-3 h-3 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  I scale e-commerce brands with one focus: profitable growth.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-red-600 to-red-700 w-3 h-3 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  I only work with brands I believe in — no exceptions.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-red-600 to-red-700 w-3 h-3 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Growth should be predictable, profitable, and performance-driven.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700">
                <img 
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop"
                  alt="Salim Soussi presenting at a brand scaling workshop"
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Scaling System */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              The Scaling Framework That Works.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105 text-center">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-red-500/25 transition-all duration-300">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <div className="flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Audit & Research</h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Spot opportunities in your store & ads.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105 text-center">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-red-500/25 transition-all duration-300">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Setup & Optimization</h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Build audiences, creatives, tracking.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105 text-center">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-red-500/25 transition-all duration-300">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Scaling & Reporting</h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Scale budgets profitably with live dashboards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Aligned Incentives */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            Your Growth = Our Growth.
          </h2>

          <div className="space-y-8 mb-16">
            <div className="flex items-start gap-4 justify-center">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-3 h-3 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl text-center">
                No flat retainers. No empty promises.
              </p>
            </div>
            <div className="flex items-start gap-4 justify-center">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-3 h-3 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl text-center">
                Our success is tied directly to your results.
              </p>
            </div>
            <div className="flex items-start gap-4 justify-center">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-3 h-3 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl text-center">
                If you don't grow profitably, we don't get paid.
              </p>
            </div>
          </div>

          <a 
            href="#application"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
          >
            Apply Now – See If You Qualify
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </section>

      {/* 5. Qualification Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              We Only Work With Brands Ready to Scale.
            </h2>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-3xl border border-gray-700">
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-lg md:text-xl text-gray-300">Shopify store</p>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-lg md:text-xl text-gray-300">£10K+ proven sales</p>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-lg md:text-xl text-gray-300">Healthy margins</p>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-lg md:text-xl text-gray-300">Consistent stock levels</p>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-lg md:text-xl text-gray-300">Cashflow to increase ad spend</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xl md:text-2xl text-white font-semibold">
                If you meet these conditions, we can scale you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Case Studies */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              Proven Scaling Results.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105">
              <div className="bg-gray-700 h-32 rounded-xl mb-6 flex items-center justify-center opacity-50">
                <BarChart3 className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">E-commerce Brand</h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Scaled a brand from £10K → £50K ad spend in 90 days (3.2x ROAS).
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105">
              <div className="bg-gray-700 h-32 rounded-xl mb-6 flex items-center justify-center opacity-50">
                <TrendingUp className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Fashion Store</h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Helped a fashion store grow revenue +187% YoY.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105">
              <div className="bg-gray-700 h-32 rounded-xl mb-6 flex items-center justify-center opacity-50">
                <Award className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Supplement Brand</h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Took a supplement brand to £100K+ profitable monthly revenue.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg md:text-xl text-gray-300 italic">
              These results represent the outcomes we deliver. Yours could be next.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Process Timeline */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              What Working With Us Looks Like.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 text-center">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Discovery Call</h3>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 text-center">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Audit & Qualification</h3>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 text-center">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Contract & Kickoff</h3>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 text-center">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Onboarding (2 weeks)</h3>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 text-center">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-white">5</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Creative & Tracking Setup</h3>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 text-center">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-white">6</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Scaling Phase</h3>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="#application"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
            >
              Apply Now to Begin
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. Application Form */}
      <section id="application" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              Ready to Scale Your Brand?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              We only take on a limited number of clients each quarter. Apply below — if you qualify, we'll reach out to schedule your first call.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-3xl border border-gray-700 text-center">
              <div className="bg-gradient-to-br from-green-600 to-green-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-white">Application Submitted!</h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                Thank you for applying. If your brand qualifies, we'll contact you within 48 hours to schedule your strategy call.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 rounded-3xl border border-gray-700">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <User className="w-4 h-4" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <Phone className="w-4 h-4" />
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                    placeholder="+44 XXX XXX XXXX"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <Globe className="w-4 h-4" />
                    Brand Name & Website *
                  </label>
                  <input
                    type="text"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                    placeholder="Shopify link preferred"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <BarChart3 className="w-4 h-4" />
                    Monthly Revenue Range *
                  </label>
                  <select
                    name="monthlyRevenue"
                    value={formData.monthlyRevenue}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  >
                    <option value="">Select revenue range</option>
                    <option value="£10K–£25K">£10K–£25K</option>
                    <option value="£25K–£50K">£25K–£50K</option>
                    <option value="£50K–£100K">£50K–£100K</option>
                    <option value="£100K+">£100K+</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <TrendingUp className="w-4 h-4" />
                    Average Ad Spend (per month)
                  </label>
                  <input
                    type="text"
                    name="adSpend"
                    value={formData.adSpend}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                    placeholder="e.g., £5K per month"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <Target className="w-4 h-4" />
                    Biggest Current Challenge *
                  </label>
                  <select
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  >
                    <option value="">Select your biggest challenge</option>
                    <option value="Traffic">Traffic</option>
                    <option value="Conversions">Conversions</option>
                    <option value="Scaling">Scaling</option>
                    <option value="Creatives">Creatives</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-12 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  <span className="flex items-center gap-3">
                    {isSubmitting ? 'Submitting Application...' : '👉 Submit Application'}
                    {!isSubmitting && <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />}
                  </span>
                </button>
              </div>
            </form>
          )}
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

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;