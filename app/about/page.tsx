"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Award,
  Target,
  Lightbulb,
  Heart,
  Shield,
  TrendingUp,
  Users,
  Globe as GlobeIcon,
  ArrowRight,
  CheckCircle,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Navigation from "@/src/components/layout/Navigation";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const darkMode = theme === "dark";
  const [mounted, setMounted] = useState(false);

  // Wait for theme to be ready
  useEffect(() => {
    setMounted(true);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bgColor = darkMode ? "bg-black" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
  const cardBg = darkMode
    ? "bg-white/5 border-white/10"
    : "bg-white border-gray-200";
  const navBg = darkMode ? "bg-black/80" : "bg-white/95";

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null;
  }

  const milestones = [
    {
      year: "1946",
      title: "Foundation in London",
      description:
        "Wayne Kerr Electronics was established in London, UK, beginning our journey in precision measurement.",
    },
    {
      year: "1960s",
      title: "Industry Recognition",
      description:
        "Gained worldwide recognition for quality and accuracy in component measurement products.",
    },
    {
      year: "1980s",
      title: "Global Expansion",
      description:
        "Established regional offices across continents to provide worldwide technical support.",
    },
    {
      year: "2000s",
      title: "Technology Leadership",
      description:
        "Became the world's leading manufacturer of electronic test equipment and LCR meters.",
    },
    {
      year: "Today",
      title: "78+ Years of Excellence",
      description:
        "Continuing to innovate and serve customers across 57 countries with precision solutions.",
    },
  ];

  const coreValues = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We pioneer advanced measurement technologies that set new industry standards for accuracy and reliability.",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Heart,
      title: "Commitment",
      description:
        "Our dedication to customer success drives us to deliver great service and support, ensuring satisfaction and trust.",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Shield,
      title: "Quality",
      description:
        "Every product we offer is a testament to our commitment to quality, designed for durability and performance.",
      color: "from-blue-600 to-blue-700",
    },
  ];

  const highlights = [
    {
      icon: Award,
      title: "Prestigious",
      description:
        "Founded in 1946 in London, UK, Wayne Kerr Electronics has become the world's leading manufacturer of electronic test equipment over the past 78 years.",
    },
    {
      icon: Target,
      title: "Professional",
      description:
        "Specialized in providing the high accuracy, quality, and capabilities in component testing equipment (LCR Meter, Impedance Analyzer, High Frequency LCR Meter)",
    },
    {
      icon: GlobeIcon,
      title: "Worldwide",
      description:
        "Wayne Kerr Electronics has established regional offices in U.S.A, Germany, Singapore, India, Japan, China, and Taiwan for worldwide technical supports and services",
    },
  ];

  const globalOffices = [
    { region: "United States", city: "Regional Office" },
    { region: "Germany", city: "European Hub" },
    { region: "Singapore", city: "Asia Pacific" },
    { region: "India", city: "South Asia" },
    { region: "Japan", city: "East Asia" },
    { region: "China", city: "Greater China" },
    { region: "Taiwan", city: "Regional Support" },
  ];

  return (
    <div
      className={`min-h-screen ${bgColor} ${textColor} overflow-x-hidden transition-colors duration-300`}
    >
      {/* Navigation*/}
      <Navigation />

      {/* Hero Section*/}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        {/* Full Background - Solid color based on dark mode */}
        <div
          className={`absolute inset-0 ${darkMode ? "bg-black" : "bg-white"}`}
        >
          {/* Optional: Subtle gradient overlay for depth */}
          <div
            className={`absolute inset-0 ${
              darkMode
                ? "bg-gradient-to-b from-black via-gray-900/50 to-black"
                : "bg-gradient-to-b from-white via-gray-50/50 to-white"
            } opacity-50`}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          {/* Centered Content */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1
              className={`text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-tight ${textColor}`}
            >
              About Us
            </h1>

            <p
              className={`text-2xl sm:text-3xl leading-relaxed font-light ${textSecondary}`}
            >
              Acknowledged worldwide for the quality, accuracy and capability of
              component measurement products
            </p>
          </div>

          {/* Floating Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className={`${cardBg} backdrop-blur-xl border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl p-8`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 mb-4">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${textColor}`}>
                    {highlight.title}
                  </h3>
                  <p className={`leading-relaxed ${textSecondary}`}>
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/images/about/mission-image.webp"
                alt="Our Mission"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                onError={(e) => {
                  // Fallback gradient background
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:rgb(59,130,246);stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:rgb(99,102,241);stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="500" fill="url(%23grad)"/%3E%3C/svg%3E';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
            </div>

            <div>
              <h2
                className={`text-4xl sm:text-5xl font-bold mb-6 ${textColor}`}
              >
                Our Mission
              </h2>

              <div className="space-y-6">
                <p className={`text-lg ${textSecondary} leading-relaxed`}>
                  Our mission is to revolutionize the field of component
                  measurement through innovation, quality, and commitment. We
                  aim to empower industries worldwide with precision tools that
                  enhance efficiency and reliability.
                </p>

                <p className={`text-lg ${textSecondary} leading-relaxed`}>
                  By continuously advancing our technologies and services, we
                  strive to exceed the expectations of our clients. Our focus on
                  customer success is the driving force behind our pursuit of
                  excellence in everything we do.
                </p>

                <div className="flex items-start gap-3 pt-4">
                  <CheckCircle
                    className="text-blue-600 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <p className={`text-lg ${textSecondary}`}>
                    Empowering industries with precision measurement solutions
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle
                    className="text-blue-600 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <p className={`text-lg ${textSecondary}`}>
                    Continuously advancing technologies and services
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle
                    className="text-blue-600 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <p className={`text-lg ${textSecondary}`}>
                    Exceeding client expectations through excellence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${textColor}`}
            >
              Core Values
            </h2>
            <p className={`text-xl ${textSecondary} max-w-3xl mx-auto`}>
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="group relative">
                  <div
                    className={`relative ${cardBg} backdrop-blur-sm border rounded-3xl p-8 sm:p-10 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full`}
                  >
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${value.color} mb-6`}
                    >
                      <Icon className="text-white" size={32} />
                    </div>

                    <h3
                      className={`text-2xl sm:text-3xl font-bold ${textColor} mb-4`}
                    >
                      {value.title}
                    </h3>

                    <p className={`${textSecondary} text-lg leading-relaxed`}>
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${textColor}`}>
              Our Journey
            </h2>
            <p className={`text-xl ${textSecondary} max-w-3xl mx-auto`}>
              78 years of innovation and excellence in precision measurement
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 hidden lg:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative pl-0 lg:pl-24">
                  {/* Timeline dot */}
                  <div className="absolute left-[26px] top-6 w-5 h-5 rounded-full bg-blue-600 border-4 border-white dark:border-black hidden lg:block"></div>

                  <div
                    className={`${cardBg} border rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold text-lg">
                        {milestone.year}
                      </span>
                      <h3 className={`text-2xl font-bold ${textColor}`}>
                        {milestone.title}
                      </h3>
                    </div>
                    <p className={`${textSecondary} text-lg leading-relaxed`}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${textColor}`}>
              Global Presence
            </h2>
            <p className={`text-xl ${textSecondary} max-w-3xl mx-auto`}>
              Regional offices providing worldwide technical support and
              services
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {globalOffices.map((office, index) => (
              <div
                key={index}
                className={`${cardBg} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start gap-3">
                  <MapPin
                    className="text-blue-600 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <h3 className={`text-xl font-bold ${textColor} mb-1`}>
                      {office.region}
                    </h3>
                    <p className={`${textSecondary}`}>{office.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => router.push("/support")}
              className="btn-gradient px-8 py-4 text-lg inline-flex items-center gap-2"
            >
              View All Locations
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
