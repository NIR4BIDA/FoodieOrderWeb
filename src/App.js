import React,{useState} from 'react'
import Meals from './components/Meals/Meals'
import Header from './components/Layout/Header'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'
function App() {
  const [showCart,setShowCart]=useState(false);
  return (
    <CartProvider>
      {showCart?<Cart setShowCart={setShowCart}/>:''}
      <Header setShowCart={setShowCart}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}
export default App;
