import React from "react";
import { ShoppingBag } from "lucide-react";
import Cart from "./Cart";

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-background border-b">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <ShoppingBag className="h-6 w-6 mr-2 text-primary" />
          <span className="font-semibold text-xl">CartSavvy</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-primary">Home</a>
          <a href="#" className="text-sm font-medium hover:text-primary">Shop</a>
          <a href="#" className="text-sm font-medium hover:text-primary">Categories</a>
          <a href="#" className="text-sm font-medium hover:text-primary">About</a>
          <a href="#" className="text-sm font-medium hover:text-primary">Contact</a>
        </nav>
        <div className="flex items-center gap-4">
          <Cart />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
