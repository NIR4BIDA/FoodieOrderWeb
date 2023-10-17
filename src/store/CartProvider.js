import CartContext from './CartContext'
import {useReducer} from 'react'
const defaultItem = {items:[],totalAmount:0};
const reducerFunc = (state,action) => {
    if(action.type==='add'){
        const updatedTotalAmount=state.totalAmount+action.item.amount*action.item.price;
        const existingItemIndex=state.items.findIndex((item)=>item.id===action.item.id);
        const existingItem=state.items[existingItemIndex];
        let updatedItems;
        if(existingItem){
            const updatedItem={ ...existingItem,
            amount: action.item.amount+existingItem.amount
            }
            updatedItems=[...state.items];
            updatedItems[existingItemIndex]=updatedItem;
        }
        else{
            updatedItems=state.items.concat(action.item);
        }
        return (
            {
                items:updatedItems,
                totalAmount:updatedTotalAmount,
            }
        );
    }
    if(action.type==='remove'){
        const existingItemIndex=state.items.findIndex((item)=>item.id===action.id);
        const existingItem=state.items[existingItemIndex];
        const updatedTotalAmount=state.totalAmount-existingItem.price;
        let updatedItems;
        if(existingItem.amount>1){
            const updatedItem={ ...existingItem,
            amount: existingItem.amount-1
            }
            updatedItems=[...state.items];
            updatedItems[existingItemIndex]=updatedItem;
        }
        else{
            updatedItems=state.items.filter((item)=>item.id!=action.id);
        }
        return (
            {
                items:updatedItems,
                totalAmount:updatedTotalAmount,
            }
        );
    }
    if(action.type==='reset'){
        return defaultItem;
    }
}
const CartProvider = (props) =>
{
    const [cartState,dispatchCart] = useReducer(reducerFunc,defaultItem);
    const addItemCart = (item)=>{
        dispatchCart({type:'add',item:item})
    };
    const removeItemCart = (id)=>{
        dispatchCart({type:'remove',id:id});
    };const resetItemCart = ()=>{
        dispatchCart({type:'reset'});
    };
    const cartContext={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemCart,
        removeItem: removeItemCart,
        clearCart:resetItemCart,
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider;