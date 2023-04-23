import { createContext, useContext, useEffect, useState } from "react";
import { CartContextType, CartItemType } from "../types/Cart";
import { PropsType } from "../types";

const CartContext = createContext<CartContextType>({
  showCart: false,
  setShowCart: () => {},
  qty: 0,
  increaseQty: () => {},
  decreaseQty: () => {},
  addToCart: () => {},
  totalQuantities: 0,
  cartItems: [],
  updateCartItemQty: () => {},
  removeCartItem: () => {},
});

export const CartProvider = ({ children }: PropsType) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [qty, setQty] = useState(1);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);

  function increaseQty() {
    setQty((currentQty) => {
      return currentQty + 1;
    });
  }

  function decreaseQty() {
    if (qty <= 1) return qty;
    setQty((currentQty) => {
      return currentQty - 1;
    });
  }

  function addToCart(product: CartItemType, qty: number) {
    const sameItem = cartItems.find((item) => item._id === product._id);

    setTotalQuantities((currentTotalQuantities) => {
      return currentTotalQuantities + qty;
    });

    if (!sameItem) {
      return setCartItems((currentItems) => {
        setQty(1);
        return [...currentItems, product];
      });
    }

    setCartItems((currentItems) => {
      return currentItems.map((item) => {
        if (item._id === product._id) {
          setQty(1);
          return { ...item, quantity: item.quantity + qty };
        }
        return item;
      });
    });
  }

  function updateCartItemQty(itemId: string, value: string) {
    if (value === "increment") {
      setCartItems((currentItems) => {
        return currentItems.map((item) => {
          if (item._id === itemId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      });
      setTotalQuantities(
        (currentTotalQuantities) => currentTotalQuantities + 1
      );
    } else if (value === "decrement") {
      setCartItems((currentItems) => {
        return currentItems.map((item) => {
          if (item._id === itemId) {
            if (item.quantity <= 1) return item;
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      });
      setTotalQuantities((currentTotalQuantities) => {
        if (currentTotalQuantities <= 1) return currentTotalQuantities;
        return currentTotalQuantities - 1;
      });
    }
  }

  function removeCartItem(itemId: string, qty: number) {
    setCartItems((currentCartItems) => {
      return currentCartItems.filter((item) => item._id !== itemId);
    });
    setTotalQuantities((currentTotalQuantities) => {
      return currentTotalQuantities - qty;
    });
  }

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const value: CartContextType = {
    showCart,
    setShowCart,
    qty,
    increaseQty,
    decreaseQty,
    addToCart,
    totalQuantities,
    cartItems,
    updateCartItemQty,
    removeCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
