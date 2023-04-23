import * as React from "react";

export interface CartContextType {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  qty: number;
  increaseQty: () => void;
  decreaseQty: () => void;
  addToCart: (product: CartItemType, qty: number) => void;
  totalQuantities: number;
  cartItems: Array<CartItemType>;
  updateCartItemQty: (itemId: string, value: string) => void;
  removeCartItem: (itemId: string, qty: number) => void;
}

export interface CartItemType {
  _id: string;
  name: string;
  price: number;
  image: any;
  quantity: number;
}
