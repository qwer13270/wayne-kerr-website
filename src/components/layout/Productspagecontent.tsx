"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
const ITEMS_PER_PAGE = 9;
interface ProductItem {
  id: number;
  series: string;
  title: string;
  description: string;
  image: string;
  datasheet: string | null;
}

interface ProductsPageContentProps {
  data: ProductItem[];
  category: string;
}

export default function ProductsPageContent({
  data,
  category,
}: ProductsPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    return data.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.series.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get category title
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-[1400px] mx-auto pt-10 px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            Products - {categoryTitle}
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-[900px] mx-auto">
            The Analyzers, LCR Meters, and DC Bias Models, Ohm meter, Interlayer
            Short Circuit Tester
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 text-center">
          <div className="relative max-w-[600px] mx-auto">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary"
              size={20}
            />
            <input
              type="text"
              placeholder={`Search ${category} by name or category...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-5 py-4 border border-border rounded-xl bg-primary text-primary focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
          <div className="mt-4 text-sm text-secondary">
            {filteredProducts.length > 0 && (
              <>
                Showing {startIndex + 1}-
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)}{" "}
                of {filteredProducts.length} {category}
              </>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length === 0 ? (
          <div className="text-center py-24">
            <h3 className="text-2xl font-semibold text-secondary mb-3">
              No {category} found
            </h3>
            <p className="text-secondary">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className={`border border-[hsl(var(--border-ui))] rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col`}
              >
                {/* Product Image */}
                <div className="aspect-[4/3] bg-secondary overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Product Content */}
                <div className="p-6">
                  <div className="text-sm font-semibold uppercase tracking-wider text-blue-500 mb-2">
                    {product.series}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed mb-5">
                    {product.description}
                  </p>
                  <div className="flex gap-3">
                    {/* Datasheet button - show for all categories */}

                    {/* Datasheet button - show only if datasheet exists */}
                    {product.datasheet && (
                      <a
                        href={product.datasheet}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all"
                      >
                        Datasheet
                      </a>
                    )}

                    {/* Learn More button - only show for instruments */}
                    {category === "instruments" && (
                      <a
                        href="#"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-transparent text-blue-600 text-sm font-semibold rounded-lg border border-blue-600 hover:bg-blue-50 transition-all"
                      >
                        Learn More
                        <span>→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="min-w-[44px] h-[44px] flex items-center justify-center border border-border bg-primary text-primary font-semibold rounded-lg hover:bg-secondary hover:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary transition-all px-3"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`min-w-[44px] h-[44px] flex items-center justify-center font-semibold rounded-lg transition-all ${
                  currentPage === page
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border border-border bg-primary text-primary hover:bg-secondary hover:border-blue-500"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="min-w-[44px] h-[44px] flex items-center justify-center border border-border bg-primary text-primary font-semibold rounded-lg hover:bg-secondary hover:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary transition-all px-3"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
