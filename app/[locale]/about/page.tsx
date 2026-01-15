"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Award,
  Target,
  Lightbulb,
  Heart,
  Shield,
  Globe as GlobeIcon,
  CheckCircle,
} from "lucide-react";
import globalLocations from "@/data/globalLocations.json";
import { BORDER_STYLES } from "@/src/styles/styles";
import type { Locale } from "@/i18n/request";

export default function AboutPage() {
  const params = useParams();
  const locale = params.locale as Locale;

  // Get translations
  const t = useTranslations("about");

  const milestones = [
    {
      year: "1946",
      title: t("journey.milestones.1946.title"),
      description: t("journey.milestones.1946.description"),
    },
    {
      year: "1960s",
      title: t("journey.milestones.1960s.title"),
      description: t("journey.milestones.1960s.description"),
    },
    {
      year: "1980s",
      title: t("journey.milestones.1980s.title"),
      description: t("journey.milestones.1980s.description"),
    },
    {
      year: "2000s",
      title: t("journey.milestones.2000s.title"),
      description: t("journey.milestones.2000s.description"),
    },
    {
      year: t("journey.milestones.today.year"),
      title: t("journey.milestones.today.title"),
      description: t("journey.milestones.today.description"),
    },
  ];

  const coreValues = [
    {
      icon: Lightbulb,
      title: t("coreValues.innovation.title"),
      description: t("coreValues.innovation.description"),
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Heart,
      title: t("coreValues.commitment.title"),
      description: t("coreValues.commitment.description"),
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Shield,
      title: t("coreValues.quality.title"),
      description: t("coreValues.quality.description"),
      color: "from-blue-600 to-blue-700",
    },
  ];

  const highlights = [
    {
      icon: Award,
      title: t("prestigious.title"),
      description: t("prestigious.description"),
    },
    {
      icon: Target,
      title: t("professional.title"),
      description: t("professional.description"),
    },
    {
      icon: GlobeIcon,
      title: t("worldwide.title"),
      description: t("worldwide.description"),
    },
  ];

  const missionValues = t.raw("mission.values") as string[];

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-[1400px] mx-auto pt-10 px-10">
        {/* Hero Section*/}
        <section>
          {/* Centered Content */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1
              className={`text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-tight text-primary`}
            >
              {t("title")}
            </h1>

            <p
              className={`text-2xl sm:text-3xl leading-relaxed font-light text-secondary`}
            >
              {t("subtitle")}
            </p>
          </div>

          {/* Floating Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className={`backdrop-blur-xl border ${BORDER_STYLES} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl p-8`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 mb-4">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3`}>
                    {highlight.title}
                  </h3>
                  <p className={`leading-relaxed`}>{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src="/images/about/mission-image.webp"
                  alt={t("mission.title")}
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
                <h2 className={`text-4xl sm:text-5xl font-bold mb-6`}>
                  {t("mission.title")}
                </h2>

                <div className="space-y-6">
                  <p className={`text-lg leading-relaxed`}>
                    {t("mission.description")}
                  </p>

                  {missionValues.map((value: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle
                        className="text-blue-600 flex-shrink-0 mt-1"
                        size={24}
                      />
                      <p className={`text-lg`}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6`}>
                {t("coreValues.title")}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto`}>
                {t("coreValues.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="group relative">
                    <div
                      className={`relative backdrop-blur-sm border ${BORDER_STYLES} rounded-3xl p-8 sm:p-10 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full`}
                    >
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${value.color} mb-6`}
                      >
                        <Icon className="text-white" size={32} />
                      </div>

                      <h3 className={`text-2xl sm:text-3xl font-bold mb-4`}>
                        {value.title}
                      </h3>

                      <p className={`text-lg leading-relaxed`}>
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
              <h2 className={`text-4xl sm:text-5xl font-bold mb-6`}>
                {t("journey.title")}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto`}>
                {t("journey.subtitle")}
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 hidden lg:block"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative pl-0 lg:pl-24">
                    {/* Timeline dot */}
                    <div className="absolute left-[26px] top-6 w-5 h-5 rounded-full bg-blue-600 border-4 border-[hsl(var(--border-ui))] hidden lg:block"></div>

                    <div
                      className={`border ${BORDER_STYLES} rounded-2xl p-6 sm:p-8`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold text-lg">
                          {milestone.year}
                        </span>
                        <h3 className={`text-2xl font-bold`}>
                          {milestone.title}
                        </h3>
                      </div>
                      <p className={`text-lg leading-relaxed`}>
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
