import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);  // Get cart items from Redux store
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      totalAmount += calculateTotalCost(item);  // Calculate the cost for each item
    });
    return totalAmount.toFixed(2);  // Round the total to two decimal places
  };

  // Handle continue shopping action
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();  // Call continue shopping function from the parent component
  };

  // Handle increment of quantity for a specific item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: 1 }));  // Dispatch to increment quantity by 1
  };

  // Handle decrement of quantity for a specific item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, amount: -1 }));  // Dispatch to decrement quantity by 1
    } else {
      dispatch(removeItem(item.name));  // Remove item if quantity is 1 and user tries to decrement
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));  // Dispatch to remove item from cart
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const itemPrice = parseFloat(item.cost.substring(1));  // Remove "$" and convert to number
    return (itemPrice * item.quantity).toFixed(2);  // Calculate total cost for this item
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}  // Decrease quantity
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}  // Increase quantity
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}  {/* Display the total for this item */}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}  // Remove item from cart
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={() => alert('Checkout functionality to be added.')}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
