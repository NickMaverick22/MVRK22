import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, User, Building, Target, Users, Calendar, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

interface OnboardingFlowProps {
  onComplete: () => void;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  position: string;
  businessName: string;
  industry: string;
  companySize: string;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { register, updateProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    position: '',
    businessName: '',
    industry: '',
    companySize: ''
  });

  const steps = [
    {
      title: "Welcome to MVRK",
      subtitle: "Let's get started with your account",
      fields: ['email', 'password', 'confirmPassword']
    },
    {
      title: "Tell us about yourself",
      subtitle: "Help us personalize your experience",
      fields: ['firstName', 'lastName', 'dateOfBirth']
    },
    {
      title: "Your professional details",
      subtitle: "Understanding your role helps us serve you better",
      fields: ['position', 'businessName']
    },
    {
      title: "About your business",
      subtitle: "Final step to complete your profile",
      fields: ['industry', 'companySize']
    }
  ];

  const industryOptions = [
    'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 
    'Manufacturing', 'Real Estate', 'Consulting', 'Marketing', 'Other'
  ];

  const companySizeOptions = [
    'Just me (1)', 'Small team (2-10)', 'Growing business (11-50)', 
    'Medium company (51-200)', 'Large enterprise (200+)'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: number): boolean => {
    const currentFields = steps[step].fields;
    
    for (const field of currentFields) {
      if (!formData[field as keyof FormData]) {
        return false;
      }
    }

    // Additional validation for step 0 (account creation)
    if (step === 0) {
      if (formData.password.length < 6) return false;
      if (formData.password !== formData.confirmPassword) return false;
      if (!formData.email.includes('@')) return false;
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Register user
      const success = await register(formData.email, formData.password);
      
      if (success) {
        // Update profile with additional information
        updateProfile({
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          position: formData.position,
          businessName: formData.businessName,
          industry: formData.industry,
          companySize: formData.companySize,
          profileComplete: true
        });
        
        onComplete();
      } else {
        alert('Registration failed. Email might already be in use.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
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
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                <Lock className="w-4 h-4" />
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  placeholder="Minimum 6 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                <Lock className="w-4 h-4" />
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-400 text-sm mt-2">Passwords do not match</p>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                  <User className="w-4 h-4" />
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  placeholder="Your first name"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                  <User className="w-4 h-4" />
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  placeholder="Your last name"
                  required
                />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                <Calendar className="w-4 h-4" />
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                <Target className="w-4 h-4" />
                Your Position *
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                placeholder="e.g., CEO, Marketing Manager, Founder"
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                <Building className="w-4 h-4" />
                Business Name *
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                placeholder="Your company or business name"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                <Target className="w-4 h-4" />
                Industry *
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                required
              >
                <option value="">Select your industry</option>
                {industryOptions.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                <Users className="w-4 h-4" />
                Company Size *
              </label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                required
              >
                <option value="">Select company size</option>
                {companySizeOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-12">
          <img 
            src="/582b3ba5-44a7-495b-99db-d934013589cf-removebg-preview.png" 
            alt="MVRK Logo" 
            className="h-16 mx-auto mb-8 filter drop-shadow-2xl"
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-red-600 to-red-700 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 rounded-3xl border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              {steps[currentStep].title}
            </h1>
            <p className="text-xl text-gray-300">
              {steps[currentStep].subtitle}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="min-h-[300px]">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  currentStep === 0
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>

              {currentStep === steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!validateStep(currentStep) || isSubmitting}
                  className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                >
                  <span className="flex items-center gap-3">
                    {isSubmitting ? 'Creating Account...' : 'Complete Setup'}
                    {!isSubmitting && <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                >
                  <span className="flex items-center gap-3">
                    Continue
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Step Indicator */}
        <div className="text-center mt-8">
          <p className="text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;