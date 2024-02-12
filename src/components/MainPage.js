import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './style.css';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import { FaShoppingCart } from 'react-icons/fa';
import Dishes from "./Dishes";

const MainPage = () => {
  const [products, setProducts] = useState(Dishes);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [lastSearchTerm, setLastSearchTerm] = useState('');

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }

    setCartCount(cartCount + 1);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.product.id !== product.id);
    setCart(updatedCart);
    setCartCount(cartCount - 1);
  };

  const incrementQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
  };

  const decrementQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item.product.id === product.id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };
  const clearCart = () => {
    // Logic to clear the entire cart
    setCart([]);
    setCartCount(0);
  };



const handleSearch = () => {
  // If searchInput is empty, show all products
  if (searchInput.trim() === '') {
    setProducts(Dishes);
  } else {

    const filteredProducts = Dishes.filter(product =>
     
      product.category.toLowerCase().includes(searchInput.toLowerCase())
    );

  
    setProducts(filteredProducts);
    setLastSearchTerm(searchInput);
  }
};
return (

<Router>
<div className="navbar">
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/cart">
          <FaShoppingCart /> Cart ({cartCount})
        </Link>
      </li>
     
    </ul>
        {/* Add search input and button */}
        <div className='search-container'>

      
        <input type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      
  </nav>
  <Routes>
    <Route
      path="/cart"
      element={
        <ShoppingCart
          cart={cart}
          removeFromCart={removeFromCart}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          clearCart={clearCart}
          lastSearchTerm={lastSearchTerm}
        />
      }
    />
    <Route
      path="/"
      element={<ProductList products={products} addToCart={addToCart} cartCount={cartCount} />}
    />
  </Routes>
</div>
</Router>
  );
};

export default MainPage;
