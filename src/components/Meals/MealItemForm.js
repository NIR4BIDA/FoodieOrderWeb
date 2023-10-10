import classes from './MealItemForm.module.css'
import Input from '../UI/Input'
import {useRef,useState} from 'react'
const MealItemForm = (props) =>
{
    const [validateAmount,setValidateAmount]=useState(true);
    const amountRef=useRef();
    const submitHandler= (event) =>{
        event.preventDefault();
        const enteredAmount=amountRef.current.value;
        const enteredAmountNum=+enteredAmount;
        if(enteredAmount.trim().length===0 || enteredAmountNum<1 ||enteredAmountNum>5){
            setValidateAmount(false);
            return;
        }
        props.onAddToCart(enteredAmountNum);
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input 
            ref={amountRef}
            label='Amount' 
            input=
            {{
                id:'amount',
                type:'number',
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1',}}/>
            <button>+ Add</button>
            {validateAmount?'':<p>please enter a valid amount (1-5).</p>}
        </form>
    );
}
export default MealItemForm;