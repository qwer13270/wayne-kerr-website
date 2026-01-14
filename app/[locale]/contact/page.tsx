"use client";

import React, { useState } from "react";
import { Send, X, CheckCircle } from "lucide-react";

export default function ContactFormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    topic: "",
    model: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Show toast notification
        setShowToast(true);

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          country: "",
          topic: "",
          model: "",
          message: "",
        });

        // Auto-hide toast after 5 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      } else {
        alert("Failed to send request. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <>
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-[900px] mx-auto pt-10 px-10">
          {/* Form Container */}
          <div>
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-5xl font-bold mb-4 text-primary">
                Contact Us
              </h1>
              <p className="text-lg text-secondary">
                We&apos;ll respond within one business day
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary focus:outline-none focus:border-blue-500 focus:bg-blue-50/50 dark:focus:bg-blue-950/20 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary focus:outline-none focus:border-blue-500 focus:bg-blue-50/50 dark:focus:bg-blue-950/20 transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary focus:outline-none focus:border-blue-500 focus:bg-blue-50/50 dark:focus:bg-blue-950/20 transition-all"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Inc."
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary focus:outline-none focus:border-blue-500 focus:bg-blue-50/50 dark:focus:bg-blue-950/20 transition-all"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary focus:outline-none focus:border-blue-500 focus:bg-blue-50/50 dark:focus:bg-blue-950/20 transition-all"
                  >
                    <option value="">Please select</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="TW">Taiwan</option>
                    <option value="CN">China</option>
                    <option value="DE">Germany</option>
                    <option value="JP">Japan</option>
                    <option value="KR">Korea</option>
                    <option value="SG">Singapore</option>
                    <option value="IN">India</option>
                    <option value="DK">Denmark</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Topic */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Topic <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="topic"
                    required
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary focus:outline-none focus:border-blue-500 focus:bg-blue-50/50 dark:focus:bg-blue-950/20 transition-all"
                  >
                    <option value="">Please select</option>
                    <option value="pricing">Pricing Inquiry</option>
                    <option value="trade-in">Trade-In Program</option>
                    <option value="calibration">Calibration Service</option>
                    <option value="rental">Rental Service</option>
                    <option value="technical">
                      Technical Discussion / Solution Consultation
                    </option>
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g., 6500B"
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary focus:outline-none focus:border-blue-500 focus:bg-blue-50/50 dark:focus:bg-blue-950/20 transition-all"
                  />
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your requirements or questions..."
                    rows={5}
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary focus:outline-none focus:border-blue-500 focus:bg-blue-50/50 dark:focus:bg-blue-950/20 transition-all resize-vertical"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3"
              >
                {isSubmitting ? "Sending..." : "Submit Quote Request"}
                {!isSubmitting && <Send size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 animate-slideIn">
          <div className="bg-blue-600 border-l-4 border-blue-400 rounded-xl shadow-xl p-5 pr-12 min-w-[350px] max-w-md">
            <button
              onClick={closeToast}
              className="absolute top-4 right-4 text-white hover:text-blue-100 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <CheckCircle className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">
                  Request Sent Successfully!
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  We&apos;ve received your quote request. Our team will get back
                  to you within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
