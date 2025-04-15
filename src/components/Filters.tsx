
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface FiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceRangeChange: (range: [number, number]) => void;
  sortOption: string;
  onSortChange: (option: string) => void;
  onResetFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  maxPrice,
  onPriceRangeChange,
  sortOption,
  onSortChange,
  onResetFilters,
}) => {
  const handlePriceChange = (values: number[]) => {
    onPriceRangeChange([values[0], values[1] || maxPrice]);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-4 mb-8">
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Select
          value={selectedCategory}
          onValueChange={onCategoryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 lg:col-span-2">
        <div className="flex justify-between">
          <label className="text-sm font-medium">Price Range</label>
          <span className="text-sm text-muted-foreground">
            ${priceRange[0].toFixed(0)} - ${priceRange[1].toFixed(0)}
          </span>
        </div>
        <Slider
          defaultValue={[0, maxPrice]}
          max={maxPrice}
          step={1}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={handlePriceChange}
          className="py-4"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Sort By</label>
        <Select
          value={sortOption}
          onValueChange={onSortChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort Products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="title-asc">Name: A to Z</SelectItem>
            <SelectItem value="title-desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="lg:col-span-4 flex justify-end">
        <Button variant="outline" onClick={onResetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default Filters;
