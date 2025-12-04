'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Mail, MapPin, ArrowRight, Award, TrendingUp, Users, Globe, Shield, Target, Zap, Sun, Moon, Shuffle } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import Globe3D from '@/src/components/home/Globe3D';
import clients from '@/data/clients.json';
import { useTheme } from 'next-themes';
import globalLocations from '@/data/globalLocations.json';


export default function WayneKerrHomepage() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const darkMode = theme === 'dark';

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  // Wait for theme to be ready
  useEffect(() => {
    setMounted(true);
  }, []);

    // Typewriter states
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter configuration
  const baseText = "Leader in LCR Meters and ";
  const rotatingWords = [
    "Impedance Analyzers",
    "Precision Testing",
    "Measurement Solutions"
  ];
  // Typewriter effect with word rotation
  useEffect(() => {
    const currentWord = rotatingWords[currentWordIndex];

    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentWord) {
      // Finished typing, wait before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      // Finished deleting, move to next word
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    } else if (!isDeleting) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      }, 100); // Typing speed
    } else {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
      }, 50); // Deleting speed (faster)
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  const stats = [
    {
      value: '78+',
      label: 'Years of Excellence',
      icon: Award,
      description: 'Industry leadership'
    },
    {
      value: '45+',
      label: 'Machine Options',
      icon: TrendingUp,
      description: 'Diverse solutions'
    },
    {
      value: '57',
      label: 'Countries',
      icon: Globe,
      description: 'Global presence'
    },
    {
      value: '16',
      label: 'Distributors',
      icon: Users,
      description: 'Worldwide support'
    }
  ];

  const features = [
    {
      title: 'Exceptional Quality',
      description: 'Designed for durability and consistent performance in demanding environments.',
      icon: Shield
    },
    {
      title: 'Precision Accuracy',
      description: 'Guarantee highest level of accuracy, ensuring flawless measurements.',
      icon: Target
    },
    {
      title: 'Multi-Functional',
      description: 'Engineered to handle a wide range of measurement tasks across various industries.',
      icon: Shuffle
    }
  ];

  const productCategories = [
    {
      name: 'Instruments',
      count: '19+ Models',
      description: 'Diverse selection of machines designed to meet different measurement needs.'
    },
    {
      name: 'Accessories',
      count: '24+ Items',
      description: 'Range of accessories, tailored to complement and extend the capabilities of our instruments.'
    },
    {
      name: 'Softwares',
      count: '3+ Packages',
      description: 'Specialized software, enabling machine control and data analysis directly from your computer.'
    }
  ];

  const marqueeClients = [...clients, ...clients, ...clients];

  const bgColor = darkMode ? 'bg-black' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200';
  const navBg = darkMode ? 'bg-black/80' : 'bg-white/95';
  const heroBg = darkMode ? 'from-blue-950 via-blue-900 to-indigo-950' : 'from-blue-600 via-blue-700 to-indigo-700';

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} overflow-x-hidden transition-colors duration-300`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero/hero_bg.webp"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          {/* Blur + Overlay */}
          <div className={`absolute inset-0 backdrop-blur-sm transition-all duration-500 ${darkMode
            ? 'bg-gradient-to-br from-black/75 via-gray-900/65 to-black/75'
            : 'bg-gradient-to-br from-blue-900/80 via-black-800/30 to-black-900/80'
            }`}></div>
        </div>

        {/* Animated overlay effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Rest of hero content stays the same */}
          <div className="space-y-8">

            <div className="hidden sm:inline-block">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white mb-6">
                🏆 Trusted by industry leaders for 78+ years
              </div>
            </div>

            {/* Typewriter with Rotating Words */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight min-h-[180px] sm:min-h-[240px] flex flex-col items-center justify-center text-center">
              <span className="block">{baseText}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mt-2">
                {displayedText}
                <span className="animate-blink">|</span>
              </span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-blue-100 max-w-4xl mx-auto">
              Where Accuracy Meets Innovation
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button className="group bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all flex items-center gap-2 w-full sm:w-auto">
                Explore Products
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-outline-light px-8 py-4 text-lg w-full sm:w-auto">
                Get Quote
              </button>
            </div>
          </div>

        </div>



        {/* Half-circle bridge into next section */}
        <div
          className={`absolute bottom-[-40%] left-1/2 -translate-x-1/2 w-[160%] h-[50%] rounded-[999px] blur-2xl opacity-100 pointer-events-none transition-colors duration-500 ${darkMode ? 'bg-black' : 'bg-white'
            }`}
          style={{
            boxShadow: darkMode
              ? '0 -60px 140px rgba(0,0,0,0.85)'
              : '0 -60px 140px rgb(255, 255, 255)'
          }}
        />



      </section>

      {/* Our Clients Section */}
      <section className={`py-12 sm:py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className={`text-xl sm:text-2xl mb-12 ${textColor}`}>
              Trusted by <span className="font-bold tracking-tight">Industry Leaders Worldwide</span>
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className={`pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r ${darkMode ? 'from-black-900/90' : 'from-white'} to-transparent`} />
            <div className={`pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l ${darkMode ? 'from-black-900/90' : 'from-white'} to-transparent`} />

            <div className="flex gap-10 animate-client-marquee py-6">
              {marqueeClients.map((client, index) => (
                <div key={`${client.name}-${index}`} className="flex-shrink-0 w-32 sm:w-40 flex items-center justify-center">
                  <img
                    src={`/images/clients/${client.name.toLowerCase().replace(' ', '-')}.png`}
                    alt={client.name}
                    className={`h-14 sm:h-16 w-auto object-contain transition ${darkMode ? 'opacity-90' : 'brightness-0 contrast-125'
                      }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${textColor}`}>
              Powering Innovation Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative"
                >
                  <div className={`relative ${cardBg} backdrop-blur-sm border rounded-3xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2`}>
                    <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 mb-4">
                      <Icon className="text-white" size={24} />
                    </div>

                    <div className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      {stat.value}
                    </div>

                    <div className={`text-lg sm:text-xl font-semibold ${textColor} mb-1`}>
                      {stat.label}
                    </div>

                    <div className={`text-sm ${textSecondary}`}>
                      {stat.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className={`py-20 sm:py-32`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${textColor}`}>
              Explore Our Products
            </h2>
            <p className={`text-xl ${textSecondary} max-w-3xl mx-auto`}>
              Industry-leading measurement solutions engineered for excellence
            </p>
          </div>

          {/* 3 Column Grid - Horizontal on Desktop, Vertical on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {productCategories.map((category, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className={`relative ${cardBg} border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col`}>

                  {/* Image Area */}
                  <div className="relative h-64 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
                    {/* Replace this with your actual image */}
                    <img
                      src={`/images/products/${category.name.toLowerCase().replace(' ', '-')}.webp`}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                        // Fallback to emoji if image doesn't exist yet
                      }}
                    />

                    {/* Count Badge */}
                    <div className="absolute top-4 right-4 bg-transparent border border-white/40 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      {category.count}
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className={`text-2xl sm:text-3xl font-bold ${textColor} mb-3`}>
                      {category.name}
                    </h3>

                    <p className={`${textSecondary} mb-6 text-lg flex-grow`}>
                      {category.description}
                    </p>

                    <button className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all self-start">
                      Explore Range
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${textColor}`}>
              Why Choose Wayne Kerr?
            </h2>
            <p className={`text-xl ${textSecondary} max-w-3xl mx-auto`}>
              Seven decades of innovation driving the future of precision measurement
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative"
                >
                  <div className={`relative ${cardBg} backdrop-blur-sm border rounded-3xl p-8 sm:p-10 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full`}>
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 mb-6">
                      <Icon className="text-white" size={32} />
                    </div>

                    <h3 className={`text-2xl sm:text-3xl font-bold ${textColor} mb-4`}>
                      {feature.title}
                    </h3>

                    <p className={`${textSecondary} text-lg leading-relaxed`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Global Operations & Support - 3D Globe */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${textColor}`}>
              Global Operations & Support
            </h2>
            <p className={`text-xl ${textSecondary}`}>
              Serving customers across 57 countries worldwide
            </p>
          </div>

          {/* 3D Globe Component */}

          <Globe3D darkMode={darkMode} />

        </div>
      </section>
    </div>
  );
}