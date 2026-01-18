import ProductsPageContent from "../../../../src/components/layout/Productspagecontent";
import { notFound } from "next/navigation";

// Load product data from locale-specific folder
const getProductData = async (locale: string, category: string) => {
  try {
    // Dynamic import based on locale and category
    const data = await import(`@/data/${locale}/${category}.json`);
    return data.default;
  } catch (error) {
    // If the JSON file doesn't exist, return null
    return null;
  }
};

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;

  // Validate category
  const validCategories = ["instruments", "accessories", "softwares"];
  if (!validCategories.includes(category)) {
    notFound();
  }

  // Load data for this category from locale-specific folder
  const data = await getProductData(locale, category);

  if (!data) {
    notFound();
  }

  return <ProductsPageContent data={data} category={category} />;
}

// Generate static params for all product categories
export function generateStaticParams() {
  return [
    { category: "instruments" },
    { category: "accessories" },
    { category: "softwares" },
  ];
}
