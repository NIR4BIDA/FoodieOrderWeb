import classes from'./Header.module.css'
import mealsPicture from '../../assets/meals.jpg'
import {Fragment,useContext} from 'react'
import CartButton from './CartButton'
import CartContext from '../../store/CartContext' 
const Header = (props) =>
{
    const cartcontext=useContext(CartContext);
    const numItems=cartcontext.items.reduce(
        (cur,item)=>{
            return cur+item.amount;
        }
        ,0);
    return(
    <Fragment>
        <header  className={classes.header}>
            <h1>ReactMeals</h1>
            <CartButton totalAmount={numItems} setShowCart={props.setShowCart}/>
        </header>
        
        <div className={classes['main-image']}>
        <img src={mealsPicture} alt='mealsPicture'/>
        </div>
    </Fragment>
    );
}
export default Header;