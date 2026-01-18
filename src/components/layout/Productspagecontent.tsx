"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import SearchBar from "../ui/SearchBar";
import ProductModal from "./ProductModal";

const ITEMS_PER_PAGE = 9;

interface ProductItem {
  id: number;
  series: string;
  title: string;
  description: string;
  image: string;
  datasheet: string | null;
  productId?: string; // Add this for modal data fetching
}

interface ProductsPageContentProps {
  data: ProductItem[];
  category: string;
}

export default function ProductsPageContent({
  data,
  category,
}: ProductsPageContentProps) {
  const t = useTranslations("products");
  const tNav = useTranslations("navigation");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  // Get translated category name
  const categoryName = tNav(
    category as "instruments" | "accessories" | "softwares"
  );

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

  const handleLearnMore = (productId: string) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-[1400px] mx-auto pt-10 px-10">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
              {t("hero.title", { category: categoryName })}
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-[900px] mx-auto">
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t("search.placeholder", { category: categoryName })}
            maxWidth="600px"
            showResultsCount={filteredProducts.length > 0}
            resultsCount={filteredProducts.length}
            resultsLabel={t("search.resultsLabel", {
              start: startIndex + 1,
              end: Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredProducts.length
              ),
              total: filteredProducts.length,
              category: categoryName,
            })}
          />

          {/* Products Grid */}
          {currentProducts.length === 0 ? (
            <div className="text-center py-24">
              <h3 className="text-2xl font-semibold text-secondary mb-3">
                {t("emptyState.title", { category: categoryName })}
              </h3>
              <p className="text-secondary">{t("emptyState.message")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className={`border border-gray-200 dark:border-white/30 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col`}
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
                      {/* Datasheet button - show only if datasheet exists */}
                      {product.datasheet && (
                        <a
                          href={product.datasheet}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all"
                        >
                          {t("buttons.datasheet")}
                        </a>
                      )}

                      {/* Learn More button - only show for instruments */}
                      {category === "instruments" && product.productId && (
                        <button
                          onClick={() => handleLearnMore(product.productId!)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-transparent text-blue-600 text-sm font-semibold rounded-lg border border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all"
                        >
                          {t("buttons.learnMore")}
                          <span>→</span>
                        </button>
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

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}

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

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={selectedProductId}
      />
    </>
  );
}
