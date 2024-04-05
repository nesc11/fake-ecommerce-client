import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartState, CartItem } from "@/utils";

// const defaultCart = {
//   cartItems: [],
//   numItemsInCart: 0,
//   cartTotal: 0,
//   shipping: 500,
//   tax: 0,
//   orderTotal: 0,
// };

// const getCartFromLocalStorage = () => {
//   const cart = localStorage.getItem("cart");
//   return cart ? JSON.parse(cart) : defaultCart;
// };

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: (() => {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    })(),
    taxPercentage: 0.12,
    shipping: 500,
  } as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemInCart = state.cart.find(
        (item) => item.itemId === action.payload.itemId,
      );
      if (itemInCart) {
        itemInCart.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      console.log("remove executed");
      state.cart = state.cart.filter((item) => item.itemId !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
    editQuantity: (
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>,
    ) => {
      const itemInCart = state.cart.find(
        (item) => item.itemId === action.payload.itemId,
      );
      if (itemInCart) itemInCart.quantity = action.payload.quantity;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, removeFromCart, clearCart, editQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
