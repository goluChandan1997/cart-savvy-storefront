
import React, { useState, useEffect, useMemo } from "react";
import { Product, SortOption } from "@/types/product";
import { CartProvider } from "@/context/CartContext";
import { fetchProducts, fetchCategories } from "@/services/api";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import Filters from "@/components/Filters";

const PRODUCTS_PER_PAGE = 6;

const Index: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("price-asc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
        
        // Find the maximum price from products
        if (productsData.length > 0) {
          const highestPrice = Math.ceil(
            Math.max(...productsData.map((product) => product.price))
          );
          setMaxPrice(highestPrice);
          setPriceRange([0, highestPrice]);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesCategory && matchesPriceRange;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "title-asc":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
  }, [products, selectedCategory, sortOption, priceRange]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortOption, priceRange]);

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSortOption("price-asc");
    setPriceRange([0, maxPrice]);
    setCurrentPage(1);
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <div className="container py-8 px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Shop All Products</h1>
              <p className="text-muted-foreground">
                Browse our collection of high-quality products
              </p>
            </div>

            <Filters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              maxPrice={maxPrice}
              onPriceRangeChange={setPriceRange}
              sortOption={sortOption}
              onSortChange={(value) => setSortOption(value as SortOption)}
              onResetFilters={handleResetFilters}
            />

            <ProductGrid products={paginatedProducts} isLoading={isLoading} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>

        <footer className="border-t py-8">
          <div className="container px-4 text-center">
            <p className="text-muted-foreground">
              © 2025 CartSavvy. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
};

export default Index;
