import classes from './CartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import {useEffect,useState,useContext} from 'react'
import CartContext from '../../store/CartContext'
const CartButton = (props) => {
    const CartCtx=useContext(CartContext);
    const [buttonLight,setButtonLight]=useState(false);
    const cartHandler=()=>{
        props.setShowCart(true);
    }
    const buttonClasses=`${classes.button} ${buttonLight?classes.bump:''}`;
    useEffect(()=>{
        if(CartCtx.items.length===0){
            return;
        }
        setButtonLight(true);
        const timer= setTimeout(()=>{setButtonLight(false)},300);
        return ()=>clearTimeout(timer);
    },[CartCtx.items]);
    return (
        <button 
            className={buttonClasses}
            onClick={cartHandler}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {props.totalAmount}
            </span>
        </button>
    );
}
export default CartButton;