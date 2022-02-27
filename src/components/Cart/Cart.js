import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  console.log(totalAmount);
  const hasItem = cartCtx.items.length > 0;
  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitFormHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-dd02a-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItem: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const actionButton = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={props.onCloseCart}
          onFormSubmit={submitFormHandler}
        />
      )}
      {!isCheckout && actionButton}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Submitting cart data...</p>
  const didSubmitModalContent = <React.Fragment>
    <p>Successfully sent the order...</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onCloseCart}>
        Close
      </button>
    </div>
  </React.Fragment>
  return <Modal onClose={props.onCloseCart}>
    { !isSubmitting && !didSubmit && cartModalContent }
    { isSubmitting && isSubmittingModalContent }
    { didSubmit && !isSubmitting && didSubmitModalContent }
  </Modal>;
};

export default Cart;
