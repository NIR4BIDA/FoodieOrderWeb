import classes from './OrderForm.module.css'
import {useRef,useState} from 'react'
const OrderForm = (props) =>{
    const isEmpty = (word)=> {return word.trim()==='';};
    const isPostal=(postal)=>{return postal.trim().length===5;};
    const nameRef=useRef();
    const streetRef=useRef();
    const postalRef=useRef();
    const cityRef=useRef();
    const initialValid={nameValid:true,streetValid:true,postalValid:true,cityValid:true,};
    const [valid,setValid]=useState(initialValid);

    const submitHandler = (event)=>{
        event.preventDefault();
        const enteredName = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredPostalCode = postalRef.current.value;
        const enteredCity = cityRef.current.value;
        const isNameValid=!isEmpty(enteredName);
        const isStreetValid=!isEmpty(enteredStreet);
        const isPostalValid=isPostal(enteredPostalCode);
        const isCityValid=!isEmpty(enteredCity);
        setValid({nameValid:isNameValid,streetValid:isStreetValid,postalValid:isPostalValid,cityValid:isCityValid,});
        const isValidForm=isNameValid&&isStreetValid&&isPostalValid&&isCityValid;
        if(!isValidForm){
            return;
        }
        props.onSubmit({enteredName,enteredStreet,enteredPostalCode,enteredCity});
    }
    const classNameVal=`${classes.control} ${valid.nameValid?'':classes.invalid}`;
    const classStreetVal=`${classes.control} ${valid.streetValid?'':classes.invalid}`;
    const classPostalVal=`${classes.control} ${valid.postalValid?'':classes.invalid}`;
    const classCityVal=`${classes.control} ${valid.cityValid?'':classes.invalid}`;
    return (
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classNameVal}>
            <label htmlFor='name'>Your Name</label>
            <input ref={nameRef} type='text' id='name'/>
            {valid.nameValid?'':<p>please fill the name section.</p>}
          </div>
          <div className={classCityVal}>
            <label htmlFor='city'>City</label>
            <input ref={cityRef} type='text' id='city' />
            {valid.cityValid?'':<p>please fill the city section.</p>}
          </div>
          <div className={classStreetVal}>
            <label htmlFor='street'>Street</label>
            <input ref={streetRef} type='text' id='street' />
            {valid.streetValid?'':<p>please fill the street section.</p>}
          </div>
          <div className={classPostalVal}>
            <label htmlFor='postal'>Postal Code</label>
            <input ref={postalRef} type='text' id='postal' />
            {valid.postalValid?'':<p>please fill valid postal code.</p>}
          </div>
          <div className={classes.actions}>
            <button type='button' onClick={props.onClose}>
              Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
          </div>
        </form>
      );
    
}
export default OrderForm;