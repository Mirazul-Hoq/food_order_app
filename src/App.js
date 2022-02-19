import React, { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {

  const [cartIsShown, setCartisShown] = useState();

  const showCartHandler = () => { setCartisShown(true) };
  const hideCartHandler = () => { setCartisShown(false) };

  return (
    <CartProvider>
      { cartIsShown && <Cart onCloseCart={hideCartHandler} /> }
      <Header onShowCart = { showCartHandler }/>
      <main>
        <Meals />
      </main>
      </CartProvider>
  );
}

export default App;
