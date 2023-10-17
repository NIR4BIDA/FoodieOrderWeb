import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/CartContext'
import {useContext,useState} from 'react'
import CartItem from './CartItem'
import OrderForm from './OrderForm'
const Cart = (props) =>{ 
    const [isOrder,setIsOrder]=useState(false); 
    const cartCtx=useContext(CartContext);
    const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems=cartCtx.items.length>0;
    const cartItemRemoveHandler = (id) =>{
        cartCtx.removeItem(id);
    }
    const CartItemAddHandler = (item) =>{
        cartCtx.addItem({...item,amount:1});
    }
    const cartItems= (
    <ul className={classes['cart-items']}>
    {cartCtx.items.map(
        (item)=>(
        <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null,item.id)}
        onAdd={CartItemAddHandler.bind(null,item)}/>
    ))}
        
    </ul>
    );
    const closeHandler = () =>{
        props.setShowCart(false);
    }
    const orderHandler = ()=>{
        setIsOrder(true);
    }
    const actionsModal=<div className={classes.actions}>
    <button className={classes['button--alt']} onClick={closeHandler}>Close</button>
    {hasItems?<button className={classes.button} onClick={orderHandler}>Order</button>:''}
    </div>
    return (
        <Modal closeHandler={closeHandler}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isOrder?'':actionsModal}
            {isOrder?<OrderForm onClose={closeHandler}/>:''}
        </Modal>
    );
}

export default Cart;