"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { X } from "lucide-react";
import {
  TEXT_SECONDARY,
  TOGGLE_CONTAINER_STYLES,
  MODAL_TAB_ACTIVE_TEXT,
  MODAL_TAB_ACTIVE_BG,
  MODAL_TAB_INACTIVE_TEXT,
  MODAL_TAB_INACTIVE_BG,
  MODAL_TAB_HOVER_TEXT,
  MODAL_TAB_HOVER_BG,
  MODAL_TABS_CONTAINER_BG,
  MODAL_TABS_CONTAINER_BORDER,
} from "../../styles/styles";

interface ProductDetails {
  id: string;
  series: string;
  title: string;
  subtitle?: string;
  image: string;
  overview: {
    paragraphs: string[];
  };
  features: {
    title: string;
    description: string;
  }[];
  specifications: {
    heading: string;
    functions?: {
      symbol: string;
      name: string;
    }[];
    content: string[];
    modelVariants?: {
      model: string;
      spec: string;
    }[];
    list?: string[];
    note?: string;
  }[];
  options?: {
    title: string;
    description: string;
    pdfUrl: string;
  }[];
  datasheet?: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}

export default function ProductModal({
  isOpen,
  onClose,
  productId,
}: ProductModalProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "features" | "specifications" | "options"
  >("overview");
  const [productData, setProductData] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/data/products/${productId}.json`);
      if (!response.ok) {
        throw new Error("Failed to load product details");
      }
      const data = await response.json();
      setProductData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching product data:", err);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  // Fetch product data when modal opens
  useEffect(() => {
    if (isOpen && productId) {
      fetchProductData();
    }
  }, [isOpen, productId, fetchProductData]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Define available tabs based on product data
  const availableTabs = useMemo(
    () =>
      [
        "overview",
        "features",
        "specifications",
        ...(productData?.options ? ["options"] : []),
      ] as const,
    [productData?.options]
  );

  // Reset activeTab if current tab is not available
  useEffect(() => {
    if (productData && !availableTabs.includes(activeTab)) {
      setActiveTab("overview");
    }
  }, [productData, activeTab, availableTabs]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`${TOGGLE_CONTAINER_STYLES} rounded-3xl w-[900px] h-[750px] overflow-hidden shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-start p-10 ${MODAL_TABS_CONTAINER_BORDER}`}
        >
          <div>
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wide">
              {productData?.series || "Loading..."}
            </div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              {productData?.title || "Product Details"}
            </h2>
            {productData?.subtitle && (
              <p className={`text-sm ${TEXT_SECONDARY}`}>
                {productData.subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 ${TEXT_SECONDARY} hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 flex items-center justify-center hover:rotate-90`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div
          className={`flex gap-2 px-10 ${MODAL_TABS_CONTAINER_BG} ${MODAL_TABS_CONTAINER_BORDER} overflow-x-auto`}
        >
          {availableTabs.map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(
                  tab as "overview" | "features" | "specifications" | "options"
                )
              }
              className={`relative px-8 py-4 text-sm font-semibold rounded-sm transition-all duration-300 ${
                activeTab === tab
                  ? `${MODAL_TAB_ACTIVE_TEXT} ${MODAL_TAB_ACTIVE_BG}`
                  : `${MODAL_TAB_INACTIVE_TEXT} ${MODAL_TAB_INACTIVE_BG} ${MODAL_TAB_HOVER_TEXT} ${MODAL_TAB_HOVER_BG}`
              }`}
            >
              <span className="capitalize">{tab}</span>
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 dark:bg-blue-500" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-10">
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className={`mt-4 ${TEXT_SECONDARY}`}>
                Loading product details...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-600 dark:text-red-400 font-semibold">
                {error}
              </p>
              <button
                onClick={fetchProductData}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && productData && (
            <>
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="animate-fadeIn">
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    Product Overview
                  </h3>
                  {productData.overview.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={`${TEXT_SECONDARY} leading-relaxed mb-4`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Features Tab */}
              {activeTab === "features" && (
                <div className="animate-fadeIn">
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-0">
                    {productData.features.map((feature, index) => (
                      <li
                        key={index}
                        className={`pl-8 py-3 relative ${TEXT_SECONDARY} leading-relaxed border-b border-border last:border-b-0`}
                      >
                        <span className="absolute left-0 text-blue-600 dark:text-blue-400 font-bold text-xl">
                          ✓
                        </span>
                        <strong className="text-primary">
                          {feature.title}:
                        </strong>{" "}
                        {feature.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === "specifications" && (
                <div className="animate-fadeIn">
                  <h3 className="text-2xl font-bold text-primary mb-6">
                    Technical Specifications
                  </h3>
                  {productData.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="mb-8 pb-8 border-b border-border last:border-b-0"
                    >
                      <h4 className="text-lg font-bold text-primary mb-3">
                        {spec.heading}
                      </h4>

                      {/* Model Variants */}

                      {spec.functions && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {spec.functions.map((func, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-border"
                            >
                              <span className="font-bold text-blue-600 dark:text-blue-400 text-lg w-6">
                                {func.symbol}
                              </span>
                              <span className="text-sm text-secondary">
                                {func.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {spec.modelVariants && (
                        <div className="bg-gray-50 dark:bg-slate-800 border border-border rounded-xl p-6 mb-4">
                          {spec.modelVariants.map((variant, idx) => (
                            <div
                              key={idx}
                              className={`py-2 ${TEXT_SECONDARY} text-sm`}
                            >
                              <strong className="text-primary font-semibold inline-block min-w-[100px]">
                                {variant.model}
                              </strong>{" "}
                              {variant.spec}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Content Lines */}
                      {spec.content &&
                        spec.content.map((line, idx) => (
                          <p
                            key={idx}
                            className={`${TEXT_SECONDARY} leading-relaxed`}
                          >
                            {line}
                          </p>
                        ))}

                      {/* List Items */}
                      {spec.list && (
                        <ul className="mt-2 space-y-1">
                          {spec.list.map((item, idx) => (
                            <li
                              key={idx}
                              className={`pl-6 relative ${TEXT_SECONDARY} text-sm leading-relaxed`}
                            >
                              <span className="absolute left-2 text-blue-600 font-bold">
                                •
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Note */}
                      {spec.note && (
                        <p
                          className={`mt-2 text-sm italic ${TEXT_SECONDARY}/80`}
                        >
                          {spec.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Options Tab */}
              {activeTab === "options" && productData.options && (
                <div className="animate-fadeIn">
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    Available Options
                  </h3>
                  <p className={`${TEXT_SECONDARY} leading-relaxed mb-8`}>
                    Enhance your system with these optional features. Click any
                    option to view detailed specifications.
                  </p>

                  <div className="space-y-4 mb-8">
                    {productData.options.map((option, index) => (
                      <a
                        key={index}
                        href={option.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-4 p-6 bg-gray-50 dark:bg-slate-800 border border-border rounded-xl transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:border-blue-600 hover:translate-x-2 group`}
                      >
                        <div className="flex-1">
                          <div className="text-base font-bold text-primary mb-1">
                            {option.title}
                          </div>
                        </div>
                        <div className="text-blue-600 text-2xl transition-transform duration-300 group-hover:translate-x-2">
                          →
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
