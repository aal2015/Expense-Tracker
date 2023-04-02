import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import currency_symbols from "./CurrencySymbol";
import styles from './TransactionDisplay.module.css';
import CurrencyContext from "../../context/currency-context";

import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import FlightIcon from '@mui/icons-material/Flight';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EventIcon from '@mui/icons-material/Event';

import { Convert } from "easy-currencies";

export const typeIcons = {
    "Food/Drink": <FastfoodIcon />, "Grocery": <LocalGroceryStoreIcon />,
    "Bill": <ReceiptLongIcon />, "Travel": <FlightIcon />,
    "Institution": <AccountBalanceIcon />, "Other": <PostAddIcon />,
    "Event": <EventIcon />
};

export const typeColor = {
    "Food/Drink": "red", "Grocery": "orange", "Institution": "brown", "Bill": "green",
    "Travel": "#0073cf", "Other": "Gray", "Event": "#0081C9"
}

export const months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

function TransactionDisplay(props) {
    const initCurrencySymbol = currency_symbols[props.details.currency];
    const [currencySymbol, setCurrencySymbol] = useState(initCurrencySymbol);
    const [amount, setAmount] = useState(props.details.amount);

    const currencyCtx = useContext(CurrencyContext);
    const date = props.details.transactionDate;

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    const convertCurrency = (base, finalCur, amount) => {
        Convert(amount).from(base).to(finalCur)
            .then(convertedAmount => {
                const convertedCurrency = currency_symbols[finalCur];
                setAmount(Math.round(convertedAmount));
                setCurrencySymbol(convertedCurrency);
            });
}

if (props.sameCurrency === "Yes" && props.details.currency !== currencyCtx.currencyCode) {
    convertCurrency(props.details.currency, currencyCtx.currencyCode, props.details.amount);
} else if (props.sameCurrency === "No") {
    if (amount !== props.details.amount) {
        setAmount(props.details.amount);
        setCurrencySymbol(initCurrencySymbol);
    }
}

return (
    <Link
        to={"transactionDetail/" + props.docRef}
        state={props.details}
        className={styles.linkStyle}
    >
        <button
            className={`${styles["button-list"]} 
                ${styles["grid-container"]}`}
            style={{ borderLeft: `6px solid ${typeColor[props.details.type]}` }}
        >
            <p>{typeIcons[props.details.type]}</p>
            <div>
                <h2>{props.details.entity}</h2>
                <p className={styles["time-format"]}>{day} {month} {year}</p>
            </div>
            <p className={styles['amount-format']}>
                {currencySymbol} {amount}
            </p>
        </button>
    </Link>
);
}

export default TransactionDisplay;