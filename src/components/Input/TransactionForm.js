import { useState, useEffect } from "react";
import AddItem from "./AddItem";
import ItemAddedDisplay from "./ItemAddedDisplay";
import ContentBox from "../UI/ContentBox";
import Button from "../UI/Button";
import FormTextInput from "../UI/FormTextInput";
import FormSelect from "../UI/FormSelect";
import FormDatePicker from "../UI/FormDatePicker";
import FormMultiLineTextInput from "../UI/FormMultiLineTextInput";
import ItemDialog from "../Edit/ItemDialog";
import AmountWarningDialog from "./AmountWarningDialog";
import useInput from "../../hooks/use-input";
import UseItemQty from "../../hooks/use-itemQty";
import UseDatePicker from "../../hooks/use-datePicker";
import styles from './AddTransaction.module.css';
import { typeColor } from "../Transaction/TransactionDisplay";

import { Link, useLocation } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';

const isNotEmpty = value => value.trim() !== "";
const properDateFormat = value => dayjs(value, 'DD/MM/YYYY').isValid();

function TransactionForm(props) {
    const [open, setOpen] = useState(false);
    const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
    const [itemIndexEdit, setItemIndexEdit] = useState(null);
    const [amountDiffConfirm, setAmountDiffConfirm] = useState(false);
    const { state } = useLocation();
    const variant = "outlined";

    const {
        initHandler: entityInitHandler, value: entityValue, isValid: entityIsValid,
        hasError: entityHasError, valueChangeHandler: entityChangeHandler,
        inputBlurHandler: entityBlurHandler, reset: resetEntity,
    } = useInput(isNotEmpty);
    const {
        initHandler: typeInitHandler, value: typeValue, isValid: typeIsValid, hasError: typeHasError,
        valueChangeHandler: typeChangeHandler, inputBlurHandler: typeBlurHandler,
        reset: resetType,
    } = useInput(isNotEmpty);
    const {
        initHandler: cashFlowInitHandler, value: cashFlowValue, isValid: cashFlowIsValid,
        hasError: cashFlowHasError, valueChangeHandler: cashFlowChangeHandler,
        inputBlurHandler: cashFlowBlurHandler, reset: resetCashFlow,
    } = useInput(isNotEmpty);
    const {
        initHandler: amountInitHandler, value: amountValue, isValid: amountIsValid,
        hasError: amountHasError, valueChangeHandler: amountChangeHandler,
        inputBlurHandler: amountBlurHandler, reset: resetAmount,
    } = useInput(isNotEmpty);
    const {
        initHandler: currencyInitHandler, value: currencyValue, isValid: currencyIsValid, hasError: currencyHasError,
        valueChangeHandler: currencyChangeHandler, inputBlurHandler: currencyBlurHandler,
        reset: resetCurrency,
    } = useInput(isNotEmpty);
    const {
        initDate: transactionInitDate, date: transactionDateValue, isValid: transactionIsValid,
        dateChangeHandler: transactionDateChangeHandler, reset: resetTransactionDate,
    } = UseDatePicker(properDateFormat);
    const {
        initHandler: descriptionInitHandler, value: descriptionValue, valueChangeHandler: descriptionChangeHandler, reset: resetDescription,
    } = useInput(() => true);
    const {
        item: itemNameValue, itemChangeHandler: itemNameChangeHandler, itemQty, itemPrice,
        itemPriceChangeHandler, itemQtyChangeHandler, totalCost: itemTotalCost, isEmpty: itemIsEmpty,
        inputBlurHandler, itemList, appendItem, hasError: itemHasError, removeItem, reset: resetItem,
        updateItem, initItemList
    } = UseItemQty()

    const typeList = Object.keys(typeColor);
    const cashFlowList = ["in", "out"];
    const currencyCodeList = ["THB", "INR", "USD", "EUR"]

    const saveTransactionInput = () => {
        const day = transactionDateValue.date()
        const month = transactionDateValue.month()
        const year = transactionDateValue.year()

        const submitData = {
            type: typeValue,
            cashFlow: cashFlowValue,
            entity: entityValue.trim(),
            amount: amountValue,
            currency: currencyValue,
            transactionDate: Timestamp.fromDate(new Date(`${year}-${month + 1}-${day}`)),
            description: descriptionValue.trim(),
            items: itemList
        }
        props.onSubmit(submitData);
    }

    const handleClickOpen = id => {
        setItemIndexEdit(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAcceptedSubmitDialog = () => {
        setAmountDiffConfirm(true);
        saveTransactionInput();
    }

    const handleCloseSubmitDialog = () => {
        setOpenSubmitDialog(false);
    }

    const init = () => {
        const date = state.transactionDate;
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        entityInitHandler(state.entity); typeInitHandler(state.type); cashFlowInitHandler(state.cashFlow);
        amountInitHandler(state.amount); currencyInitHandler(state.currency);
        transactionInitDate(day, month, year); descriptionInitHandler(state.description);
        initItemList(state.items);
    }

    let formIsValid = false;
    if (entityIsValid && typeIsValid && cashFlowIsValid && amountIsValid && currencyIsValid && transactionIsValid) {
        formIsValid = true;
    }

    useEffect(() => {
        if (props.mode === "Edit") {
            init();
        }
    }, [])

    const clearFormHandler = () => {
        resetEntity(); resetType(); resetCashFlow(); resetAmount(); resetCurrency();
        resetDescription(); resetTransactionDate(); resetItem();
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        } else if (!amountDiffConfirm && (Number(amountValue) !== Number(itemTotalCost)) &&
            Number(itemTotalCost) > 0) {
            setOpenSubmitDialog(true);
            return
        }
        saveTransactionInput();
    }

    return (
        <div id={styles["background"]}>
            <ContentBox>
                <div id={styles["backButtonAlign"]}>
                    <Link to={'..'}>
                        <Button buttonStyle="backButton">
                            <KeyboardBackspaceIcon />
                        </Button>
                    </Link>
                </div>

                <h1>{props.titleAction} Transaction Record</h1>
                <form onSubmit={submitHandler}>
                    {/* Row 1 */}
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <FormSelect
                                label="Type *" value={typeValue} itemValues={typeList} variant={variant}
                                hasError={typeHasError} changeHandler={typeChangeHandler} blurHandler={typeBlurHandler}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <FormSelect
                                label="Cash Flow *" value={cashFlowValue} itemValues={cashFlowList} variant={variant}
                                changeHandler={cashFlowChangeHandler} blurHandler={cashFlowBlurHandler}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <FormTextInput
                                label="Entity *" value={entityValue} variant={variant} inputType="text"
                                hasError={entityHasError} changeHandler={entityChangeHandler} blurHandler={entityBlurHandler}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormTextInput
                                label="Amount *" value={amountValue} variant={variant} inputType="number"
                                hasError={amountHasError} changeHandler={amountChangeHandler} blurHandler={amountBlurHandler}
                            />
                        </Grid>

                        {/* Row 2 */}
                        <Grid item xs={2}>
                            <FormSelect
                                label="Currency *" value={currencyValue} itemValues={currencyCodeList} variant={variant}
                                hasError={currencyHasError} changeHandler={currencyChangeHandler} blurHandler={currencyBlurHandler}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormDatePicker
                                label="Transaction Date *" value={transactionDateValue}
                                changeHandler={transactionDateChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <FormMultiLineTextInput
                                label="Description (Optional)" value={descriptionValue} variant={variant} rows="2"
                                changeHandler={descriptionChangeHandler}
                            />
                        </Grid>

                        {/* Row 3 */}
                        <Grid item xs={6}>
                            <AddItem
                                itemNameValue={itemNameValue} itemNameChangeHandler={itemNameChangeHandler}
                                itemQty={itemQty} itemQtyChangeHandler={itemQtyChangeHandler} resetItemName={resetItem}
                                itemPrice={itemPrice} itemPriceChangeHandler={itemPriceChangeHandler}
                                variant={variant} appendItem={appendItem} inputBlurHandler={inputBlurHandler}
                                hasError={itemHasError} itemIsEmpty={itemIsEmpty}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ItemAddedDisplay
                                itemList={itemList}
                                removeItem={removeItem}
                                itemTotalCost={itemTotalCost}
                                handleClickOpen={handleClickOpen}
                            />
                        </Grid>

                        {/* Row 4 */}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                buttonStyle="addTransaction-submit-button"
                                disableStatus={!formIsValid}
                            >Submit</Button> | <Button
                                type="button"
                                buttonStyle="addTransaction-clear-button"
                                clickHandler={clearFormHandler}
                            >Clear Form</Button> | <Link to={'..'}><Button
                                type="button"
                                buttonStyle="addTransaction-cancel-button"
                            >Cancel</Button></Link>
                        </Grid>
                    </Grid>
                </form>
            </ContentBox>

            <ItemDialog
                open={open} setOpen={setOpen} handleClose={handleClose}
                item={itemList[itemIndexEdit]} itemIndexEdit={itemIndexEdit}
                updateItem={updateItem}
            />

            <AmountWarningDialog
                open={openSubmitDialog} setOpen={setOpenSubmitDialog}
                handleClose={handleCloseSubmitDialog} 
                handleAccept= {handleAcceptedSubmitDialog}
            />
        </div>
    )
}

export default TransactionForm; 