import { useState } from 'react';

import { uid } from 'uid';

function UseItemQty() {
    const [item, setItem] = useState('')
    const [itemQty, setItemQty] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const [itemList, setItemList] = useState([]);
    const [isTouched, setIsTouched] = useState(false);

    let hasError = false;
    const isEmpty = item.trim() === "" || itemQty === "";

    if (item.trim().length > 0 || itemQty.trim().length > 0 || itemPrice.trim().length > 0) {
        if ((item.trim().length === 0 || itemQty.trim().length === 0) ||
        (item.trim().length === 0 && itemQty.trim().length === 0 && itemPrice.trim().length !== 0)) {
            hasError = true && isTouched;
        }
    }

    const initFields = (item, quantity, price) => {
        setItem(item);
        setItemQty(quantity);
        setItemPrice(price);
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

        setTotalCost(prevTotalcost => prevTotalcost + Number(itemPrice) * Number(itemQty));
    };

    const removeItem = deleteId => {
        console.log('Click', deleteId);
        itemList.forEach(item => {
            if (item.id === deleteId) {
                setTotalCost(prevTotalcost => prevTotalcost - Number(item.itemPrice) * Number(item.itemQty));
            }
        })
        setItemList(value => value.filter(v => v.id !== deleteId))
    }

    const updateItem = (listIndex, updatedItem) => {
        const newItemPrice = updatedItem.itemPrice * updatedItem.itemQty;
        const prevItemPrice = itemList[listIndex].itemPrice * itemList[listIndex].itemQty;
        const diff = Math.abs(newItemPrice - prevItemPrice);
        let newTotalCost = -1;

        if (newItemPrice > prevItemPrice) {
            newTotalCost = totalCost + diff;
        } else if (newItemPrice < prevItemPrice) {
            newTotalCost = totalCost - diff;
        }

        if (newTotalCost !== -1) {
            setTotalCost(newTotalCost);
        }

        const updatedList = itemList.map((itemObj, index) => {
            if (listIndex === index) {
                return updatedItem;
            }
            return itemObj;
        });
        setItemList(updatedList);
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
        totalCost,
        inputBlurHandler,
        itemList,
        appendItem,
        hasError,
        removeItem,
        reset,
        initFields,
        updateItem
    };

}

export default UseItemQty;