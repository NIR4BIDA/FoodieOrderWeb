import classes from './Modal.module.css'
import {Fragment} from 'react'
import ReactDOM from 'react-dom'
const Backdrop=(props)=>{
    return <div className={classes.backdrop} onClick={props.closeHandler}></div>
}
const Modaloverlay = (props) =>{
    return(
    <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
    )
}
const Modal = (props) =>{
    const portalElement=document.getElementById("overlays");
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop closeHandler={props.closeHandler}/>,portalElement)}
            {ReactDOM.createPortal(<Modaloverlay>{props.children}</Modaloverlay>,portalElement)}
        </Fragment>
    );
}
export default Modal;