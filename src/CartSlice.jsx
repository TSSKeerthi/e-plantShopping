import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add a new item to the cart or increase its quantity if it already exists
    addItem: (state, action) => {
      const newItem = action.payload; // This will be the plant details passed from ProductList.jsx
      const existingItem = state.items.find(item => item.name === newItem.name);

      // If the plant is already in the cart, increase its quantity
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // If it's a new plant, add it to the cart with quantity set to 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },

    // Remove an item from the cart based on its name
    removeItem: (state, action) => {
      const itemName = action.payload; // Item name to be removed
      state.items = state.items.filter(item => item.name !== itemName); // Filter out the item
    },

    // Update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Get the item's name and new quantity from the payload
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity = quantity; // Update the quantity
      }
    },
  },
});

// Export the action creators for use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer for use in the store configuration
export default CartSlice.reducer;
