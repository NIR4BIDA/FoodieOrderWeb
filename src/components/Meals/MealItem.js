import {Fragment,useContext} from 'react'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../store/CartContext'
const MealItem = (props) => {
    const cartContext=useContext(CartContext);
    const onAddToCart= (amount) =>{
        cartContext.addItem(
            {
                id:props.meal.id,
                name:props.meal.name,
                amount:amount,
                price:props.meal.price,
            }
        );
    }
    const price=`$${props.meal.price.toFixed(2)}`
    return(
    <Fragment>
        <li className={classes.meal}>
            <div>
                <div><h3>{props.meal.name}</h3></div>
                <div className={classes.description}>{props.meal.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.meal.id} onAddToCart={onAddToCart}/>
            </div>
        </li>
    </Fragment>
    );
}
export default MealItem;