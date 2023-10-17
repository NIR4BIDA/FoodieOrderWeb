import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/CartContext'
import React,{useContext,useState} from 'react'
import CartItem from './CartItem'
import OrderForm from './OrderForm'
const Cart = (props) =>{ 
    const [isOrder,setIsOrder]=useState(false); 
    const cartCtx=useContext(CartContext);
    const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems=cartCtx.items.length>0;
    const [isSubmit,setIsSubmit]=useState(false);
    const [isSubmited,setIsSubmited]=useState(false);
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
    const httpHandler = async (userDetails) =>{
        setIsSubmit(true);
        const response=await fetch('https://react-http-b994f-default-rtdb.firebaseio.com/orders.json',
        {method:'POST',
        body:JSON.stringify(
        {
            user:userDetails,
            items:cartCtx.items,
        })});
        setIsSubmit(false);
        setIsSubmited(true);
        cartCtx.clearCart();
    }
    const actionsModal=<div className={classes.actions}>
    <button className={classes['button--alt']} onClick={closeHandler}>Close</button>
    {hasItems?<button className={classes.button} onClick={orderHandler}>Order</button>:''}
    </div>
    const modalContent=
    <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isOrder?'':actionsModal}
            {isOrder?<OrderForm onClose={closeHandler} onSubmit={httpHandler}/>:''}
    </React.Fragment>
    let content='';
    if(!isSubmited&&!isSubmit){
        content=modalContent;
    }
    if(isSubmited){
        content=
        <React.Fragment>
        <p>send succesfully.</p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={closeHandler}>Close</button>
        </div>
        </React.Fragment>
    }
    if(isSubmit){
        <p>sending...</p>
    }
    return (
        <Modal closeHandler={closeHandler}>
            {content}
        </Modal>
    );
}

export default Cart;