import ProductsPageContent from "../../../src/components/layout/Productspagecontent";
import { notFound } from "next/navigation";

// This would be your actual data - replace with your JSON imports or API calls
const getProductData = async (category: string) => {
  try {
    // Dynamic import based on category
    const data = await import(`@/data/${category}.json`);
    return data.default;
  } catch (error) {
    // If the JSON file doesn't exist, return null
    return null;
  }
};

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Validate category
  const validCategories = ["instruments", "accessories", "softwares"];
  if (!validCategories.includes(category)) {
    notFound();
  }

  // Load data for this category
  const data = await getProductData(category);

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
