import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';  // Import addItem from CartSlice
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
    const dispatch = useDispatch();
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({}); // Track added items

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Calming scent, used in aromatherapy.",
                    cost: "$20"
                }
            ]
        }
    ];

    // Function to handle adding a plant to the cart
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant)); // Dispatch to Redux store
        setAddedToCart((prevState) => ({
            ...prevState,
            [plant.name]: true // Mark item as added
        }));
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <div className="navbar">
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={(e) => handleHomeClick(e)}>
                            <div>
                                <h3>Paradise Nursery</h3>
                                <i>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="nav-links">
                    <a href="#" onClick={(e) => handleCartClick(e)}>🛒 Cart</a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((categoryItem, categoryIndex) => (
                        <div key={categoryIndex}>
                            <h2>{categoryItem.category}</h2>
                            <div className="plant-list">
                                {categoryItem.plants.map((plant, plantIndex) => (
                                    <div key={plantIndex} className="plant-card">
                                        <img src={plant.image} alt={plant.name} className="plant-image" />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p className="plant-cost">{plant.cost}</p>
                                        <button
                                            className={`add-to-cart-btn ${addedToCart[plant.name] ? 'added' : ''}`}
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
