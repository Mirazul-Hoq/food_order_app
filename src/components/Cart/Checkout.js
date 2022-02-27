import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim().length === 0;
const isFiveChar = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputIsValid, setFormInputIsValid] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = isFiveChar(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputIsValid({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid
        });

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;
        if (!formIsValid) {
            return;
        }
        props.onFormSubmit({
            name: enteredName,
            city: enteredCity,
            street: enteredStreet,
            postalCode: enteredPostalCode
        });
    };

    const nameControlClasses = `${classes.control} ${formInputIsValid.name ? '' : classes.invalid }`;
    const streetControlClasses = `${classes.control} ${formInputIsValid.street ? '' : classes.invalid }`;
    const postalCodeControlClasses = `${classes.control} ${formInputIsValid.postalCode ? '' : classes.invalid }`;
    const cityControlClasses = `${classes.control} ${formInputIsValid.city ? '' : classes.invalid }`;

    return <form onSubmit={confirmHandler} className={classes.form}>
        <div className={nameControlClasses}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id="name" ref={nameInputRef}/>
            {!formInputIsValid.name && <p>Please enter a valid name</p>}
        </div>
        <div className={streetControlClasses}>
            <label htmlFor='street'>Street</label>
            <input type='text' id="street" ref={streetInputRef}/>
            {!formInputIsValid.street && <p>Please enter a valid street</p>}
        </div>
        <div className={postalCodeControlClasses}>
            <label htmlFor='postal-code'>Postal Code</label>
            <input type='text' id="postal-code" ref={postalCodeInputRef}/>
            {!formInputIsValid.postalCode && <p>Please enter a valid postal code (5 Characters long)</p>}
        </div>
        <div className={cityControlClasses}>
            <label htmlFor='city'>City</label>
            <input type='text' id="city" ref={cityInputRef}/>
            {!formInputIsValid.city && <p>Please enter a valid city</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button>Confirm</button>
        </div>
    </form>
}

export default Checkout;