
import React from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-4 pb-0">
        <div className="relative pt-[100%] w-full overflow-hidden rounded-md bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="absolute top-0 left-0 h-full w-full object-contain p-4"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-6">
        <Badge className="mb-2">{product.category}</Badge>
        <h3 className="text-lg font-semibold line-clamp-2 mb-1">{product.title}</h3>
        <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm">{product.rating.rate} ({product.rating.count})</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
