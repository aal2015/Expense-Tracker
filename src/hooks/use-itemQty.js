import { useState } from 'react';

import { uid } from 'uid';

function UseItemQty() {
    const [item, setItem] = useState('')
    const [itemQty, setItemQty] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemList, setItemList] = useState([]);
    const [isTouched, setIsTouched] = useState(false);

    let hasError = false;
    const isEmpty = item.trim() === "" || itemQty === "";

    if (item.trim().length > 0 || itemQty.trim().length > 0 || itemPrice.trim().length > 0) {
        if ((item.trim().length === 0 || itemQty.trim().length === 0) ||
        (item.trim().length === 0 && itemQty.trim().length === 0 && itemPrice.trim().length != 0)) {
            hasError = true && isTouched;
        }
    }

    const itemChangeHandler = event => {
        setItem(event.target.value);
    };

    const itemQtyChangeHandler = event => {
        setItemQty(event.target.value);
    };

    const itemPriceChangeHandler = event => {
        setItemPrice(event.target.value);
    }

    const inputBlurHandler = () => {
        setIsTouched(true);
    }

    const appendItem = () => {
        setItemList(prevItem => [...prevItem, {id: uid(), item, itemQty, itemPrice }])
        setItem('');
        setItemQty('');
        setItemPrice('');
    };

    const removeItem = deleteId => {
        console.log('Click', deleteId);
        setItemList(value => value.filter(v => v.id !== deleteId))
    }

    const reset = () => {
        setItem('')
        setItemQty('');
        setItemPrice('');
        setItemList([]);
    }

    return {
        item,
        itemChangeHandler,
        isEmpty,
        itemQty,
        itemQtyChangeHandler,
        itemPrice,
        itemPriceChangeHandler,
        inputBlurHandler,
        itemList,
        appendItem,
        hasError,
        removeItem,
        reset
    };

}

export default UseItemQty;