import classes from './OrderForm.module.css'
import {useRef} from 'react'
const OrderForm = (props) =>{
    const nameRef=useRef();
    const streetRef=useRef();
    const postalRef=useRef();
    const cityRef=useRef();
    const submitHandler = (event)=>{
        event.preventDefault();
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input ref={nameRef} type='text' id='name'/>
          </div>
          <div className={classes.control}>
            <label htmlFor='street'>Street</label>
            <input ref={streetRef} type='text' id='street' />
          </div>
          <div className={classes.control}>
            <label htmlFor='postal'>Postal Code</label>
            <input ref={postalRef} type='text' id='postal' />
          </div>
          <div className={classes.control}>
            <label htmlFor='city'>City</label>
            <input ref={cityRef} type='text' id='city' />
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