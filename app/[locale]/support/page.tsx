"use client";

import React, { useState, useMemo } from "react";
import { Search, Phone, Mail, MapPin } from "lucide-react";
import salesData from "@/data/sales-support.json";
import technicalData from "@/data/technical-support.json";
import SearchBar from "../../../src/components/ui/SearchBar";
import { TOGGLE_CONTAINER_STYLES } from "../../../src/styles/styles";

interface ContactData {
  id: number;
  country: string;
  flag: string;
  region: string;
  phone: string;
  fax: string;
  address: string;
  contactPerson: string;
  email: string;
}

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<"sales" | "technical">("sales");
  const [searchQuery, setSearchQuery] = useState("");

  // Get current data based on active tab
  const currentData = activeTab === "sales" ? salesData : technicalData;

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return currentData;

    const query = searchQuery.toLowerCase();
    return currentData.filter(
      (contact: ContactData) =>
        contact.country.toLowerCase().includes(query) ||
        contact.region.toLowerCase().includes(query) ||
        contact.contactPerson.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query)
    );
  }, [currentData, searchQuery]);

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-[1400px] mx-auto pt-10 px-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4 text-primary">
            Service, Repair & Sales Contacts
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-[900px] mx-auto">
            For any technical and sales support, please contact us with detailed
            information about your product and the assistance needed.
          </p>
        </div>

        {/* Option 3: Underline Tabs Toggle */}
        <div className="flex justify-center mb-8">
          <div
            className={`inline-flex gap-2 rounded-xl p-2 ${TOGGLE_CONTAINER_STYLES}`}
          >
            {" "}
            <button
              onClick={() => {
                setActiveTab("sales");
                setSearchQuery("");
              }}
              className={`relative px-8 py-3.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                activeTab === "sales"
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-secondary hover:bg-bg-secondary hover:text-primary"
              }`}
            >
              Sales Support
              <span
                className={`ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full ${
                  activeTab === "sales"
                    ? "bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-400"
                    : "bg-bg-secondary text-secondary"
                }`}
              >
                {salesData.length}
              </span>
              {/* Underline indicator */}
              {activeTab === "sales" && (
                <span className="absolute bottom-2 left-[20%] right-[20%] h-[3px] bg-blue-600 dark:bg-blue-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab("technical");
                setSearchQuery("");
              }}
              className={`relative px-8 py-3.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                activeTab === "technical"
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-secondary hover:bg-bg-secondary hover:text-primary"
              }`}
            >
              Technical Support
              <span
                className={`ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full ${
                  activeTab === "technical"
                    ? "bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-400"
                    : "bg-bg-secondary text-secondary"
                }`}
              >
                {technicalData.length}
              </span>
              {/* Underline indicator */}
              {activeTab === "technical" && (
                <span className="absolute bottom-2 left-[20%] right-[20%] h-[3px] bg-blue-600 dark:bg-blue-500 rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-primary rounded-b-2xl p-8">
          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by region, country, or contact person..."
            maxWidth="500px"
            showResultsCount={true}
            resultsCount={filteredData.length}
            resultsLabel={`Showing ${filteredData.length} ${
              activeTab === "sales" ? "sales" : "technical"
            } support locations`}
          />

          {/* Contact Cards Grid */}
          {filteredData.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-secondary mb-2">
                No contacts found
              </h3>
              <p className="text-secondary">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((contact: ContactData) => (
                <div
                  key={contact.id}
                  className="bg-card-bg border border-border rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500 group"
                >
                  {/* Flag and Region */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-3xl">{contact.flag}</div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-bold uppercase tracking-wider text-blue-500 mb-2">
                      {contact.region}
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-1">
                      {contact.country}
                    </h3>
                    <div className="text-base font-semibold text-primary">
                      {contact.contactPerson}
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-3 mb-4">
                    {contact.phone && (
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex items-start gap-3 text-sm text-secondary"
                      >
                        <Phone size={16} className="mt-0.5 flex-shrink-0" />
                        <span>{contact.phone}</span>
                      </a>
                    )}

                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="flex items-start gap-3 text-sm text-secondary hover:text-blue-500 transition-colors group/item break-all"
                      >
                        <Mail
                          size={16}
                          className="mt-0.5 flex-shrink-0 group-hover/item:text-blue-500"
                        />
                        <span>{contact.email}</span>
                      </a>
                    )}

                    {contact.address && (
                      <div className="flex items-start gap-3 text-sm text-secondary">
                        <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                        <span>{contact.address}</span>
                      </div>
                    )}
                  </div>

                  {/* Contact Button */}
                  <a
                    href={`mailto:${contact.email}?subject=${
                      activeTab === "sales" ? "Sales" : "Technical"
                    } Support`}
                    className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all"
                  >
                    <Mail size={16} />
                    Contact
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
