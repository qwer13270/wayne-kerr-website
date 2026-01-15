"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  MapPin,
  ArrowRight,
  Award,
  TrendingUp,
  Users,
  Globe,
  Shield,
  Target,
  Shuffle,
} from "lucide-react";
import clients from "@/data/clients.json";
import { useTranslations } from "next-intl";
import globalLocations from "@/data/globalLocations.json";
import { BORDER_STYLES, TEXT_SECONDARY } from "@/src/styles/styles";
import Link from "next/link";
import type { Locale } from "@/i18n/request";
import {
  HERO_SECTION_BG,
  HALF_CIRCLE_BRIDGE_SHADOW,
  HALF_CIRCLE_BRIDGE_BG,
  CLIENT_LOGO_STYLES,
} from "@/src/styles/styles";

export default function WayneKerrHomepage() {
  // In client components, useParams() returns params directly (not a Promise!)
  const params = useParams();
  const locale = params.locale as Locale;

  // Get translations
  const t = useTranslations("home");
  const tNav = useTranslations("navigation");

  const [currentSlide, setCurrentSlide] = useState(0);

  const globalOffices = globalLocations.map((location) => ({
    region: location.name,
    city: t("globalPresence.regionalOffice"),
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Typewriter states
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter configuration with translations
  const baseText = t("hero.typewriter.base");
  const rotatingWords = [
    t("hero.typewriter.word1"),
    t("hero.typewriter.word2"),
    t("hero.typewriter.word3"),
  ];

  // Typewriter effect with word rotation
  useEffect(() => {
    const currentWord = rotatingWords[currentWordIndex];

    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    } else if (!isDeleting) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
      }, 50);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex, rotatingWords]);

  const stats = [
    {
      value: "78+",
      label: t("stats.yearsLabel"),
      icon: Award,
      description: t("stats.yearsDesc"),
    },
    {
      value: "45+",
      label: t("stats.modelsLabel"),
      icon: TrendingUp,
      description: t("stats.modelsDesc"),
    },
    {
      value: "57",
      label: t("stats.countriesLabel"),
      icon: Globe,
      description: t("stats.countriesDesc"),
    },
    {
      value: "16",
      label: t("stats.distributorsLabel"),
      icon: Users,
      description: t("stats.distributorsDesc"),
    },
  ];

  const features = [
    {
      title: t("features.quality.title"),
      description: t("features.quality.description"),
      icon: Shield,
    },
    {
      title: t("features.precision.title"),
      description: t("features.precision.description"),
      icon: Target,
    },
    {
      title: t("features.multifunctional.title"),
      description: t("features.multifunctional.description"),
      icon: Shuffle,
    },
  ];

  const productCategories = [
    {
      name: tNav("instruments"),
      count: t("products.instruments.count"),
      description: t("products.instruments.description"),
      link: "instruments",
    },
    {
      name: tNav("accessories"),
      count: t("products.accessories.count"),
      description: t("products.accessories.description"),
      link: "accessories",
    },
    {
      name: tNav("softwares"),
      count: t("products.softwares.count"),
      description: t("products.softwares.description"),
      link: "softwares",
    },
  ];

  const marqueeClients = [...clients, ...clients, ...clients];

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300`}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero/hero_bg.webp"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 backdrop-blur-sm transition-all duration-500 ${HERO_SECTION_BG}`}
          ></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div
              className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="space-y-8">
            <div className="hidden sm:inline-block">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white mb-6">
                {t("hero.badge")}
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight min-h-[180px] sm:min-h-[240px] flex flex-col items-center justify-center text-center">
              <span className="block">{baseText}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mt-2">
                {displayedText}
                <span className="animate-blink">|</span>
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-blue-100 max-w-4xl mx-auto">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href={`/${locale}/products/instruments`}>
                <button className="group bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all flex items-center gap-2 w-full sm:w-auto">
                  {t("hero.cta.explore")}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <button className="group bg-blue-600/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600/20 transition-all flex items-center gap-2 w-full sm:w-auto">
                  {t("hero.cta.contact")}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Half-circle bridge into next section */}
        <div
          className={`absolute bottom-[-40%] left-1/2 -translate-x-1/2 w-[160%] h-[50%] rounded-[999px] blur-2xl opacity-100 pointer-events-none transition-colors duration-500 ${HALF_CIRCLE_BRIDGE_BG} ${HALF_CIRCLE_BRIDGE_SHADOW}`}
        />
      </section>

      {/* Trusted By Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className={`text-xl sm:text-2xl mb-12`}>
              {t("trustedBy.prefix")}{" "}
              <span className="font-bold tracking-tight">
                {t("trustedBy.highlight")}
              </span>
            </p>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex gap-10 animate-client-marquee py-6">
              {marqueeClients.map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0 w-32 sm:w-40 flex items-center justify-center"
                >
                  <img
                    src={`/images/clients/${client.name
                      .toLowerCase()
                      .replace(" ", "-")}.png`}
                    alt={client.name}
                    className={`h-14 sm:h-16 w-auto object-contain transition ${CLIENT_LOGO_STYLES}`}
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
            <h2 className={`text-4xl sm:text-5xl font-bold mb-4`}>
              {t("stats.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="group relative">
                  <div
                    className={`backdrop-blur-sm border ${BORDER_STYLES} rounded-3xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2`}
                  >
                    <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 mb-4">
                      <Icon className="text-white" size={24} />
                    </div>

                    <div className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      {stat.value}
                    </div>

                    <div className={`text-lg sm:text-xl font-semibold mb-1`}>
                      {stat.label}
                    </div>

                    <div className={`text-sm ${TEXT_SECONDARY}`}>
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
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6`}>
              {t("products.title")}
            </h2>
            <p className={`text-xl ${TEXT_SECONDARY} max-w-3xl mx-auto`}>
              {t("products.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {productCategories.map((category, index) => (
              <div key={index} className="group relative">
                <div
                  className={`border ${BORDER_STYLES} rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col`}
                >
                  <div className="relative h-64 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={`/images/products/${category.link}.webp`}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />

                    <div className="absolute top-4 right-4 bg-transparent border border-white/40 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      {category.count}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className={`text-2xl sm:text-3xl font-bold mb-3`}>
                      {category.name}
                    </h3>

                    <p className={`${TEXT_SECONDARY} mb-6 text-lg flex-grow`}>
                      {category.description}
                    </p>

                    <Link href={`/${locale}/products/${category.link}`}>
                      <button className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all self-start">
                        {t("products.exploreButton")}
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    </Link>
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
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6`}>
              {t("features.title")}
            </h2>
            <p className={`text-xl ${TEXT_SECONDARY} max-w-3xl mx-auto`}>
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group relative">
                  <div
                    className={`${BORDER_STYLES} backdrop-blur-sm border rounded-3xl p-8 sm:p-10 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full`}
                  >
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 mb-6">
                      <Icon className="text-white" size={32} />
                    </div>

                    <h3 className={`text-2xl sm:text-3xl font-bold mb-4`}>
                      {feature.title}
                    </h3>

                    <p className={`${TEXT_SECONDARY} text-lg leading-relaxed`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6`}>
              {t("globalPresence.title")}
            </h2>
            <p className={`text-xl ${TEXT_SECONDARY} max-w-3xl mx-auto`}>
              {t("globalPresence.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {globalOffices.map((office, index) => (
              <div
                key={index}
                className={`border ${BORDER_STYLES} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start gap-3">
                  <MapPin
                    className="text-blue-600 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <h3 className={`text-xl font-bold mb-1`}>
                      {office.region}
                    </h3>
                    <p className={`${TEXT_SECONDARY}`}>{office.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={`/${locale}/support`}>
              <button className="bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 inline-flex items-center justify-center gap-2">
                {t("globalPresence.viewAllButton")}
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
