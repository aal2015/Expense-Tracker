import { useEffect } from 'react';

import FormTextInput from '../UI/FormTextInput';
import Button from '../UI/Button';
import UseItemQty from '../../hooks/use-itemQty';
import styles from './ItemDialog.module.css';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';

function ItemDialog(props) {
    const {
        item: itemNameValue, itemChangeHandler: itemNameChangeHandler, itemQty, itemPrice,
        itemPriceChangeHandler, itemQtyChangeHandler, isEmpty: itemIsEmpty, inputBlurHandler, 
        hasError: itemHasError, initFields
    } = UseItemQty();

    const variant = "outlined";

    const onSaveHandler = () => {
        const updatedItem = {id: props.item.id , item: itemNameValue, itemQty, itemPrice}
        props.updateItem(props.itemIndexEdit, updatedItem);
        props.handleClose();
    }

    useEffect(() => {
        if (props.open) {
            initFields(props.item.item, props.item.itemQty, props.item.itemPrice);
        }
        
    }, [props.open]);
    
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogContent id={styles.dialogContent}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormTextInput
                            label="Item *" value={itemNameValue} variant={variant} inputType="text"
                            changeHandler={itemNameChangeHandler} blurHandler={inputBlurHandler}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormTextInput
                            label="Qty *" value={itemQty} variant={variant} inputType="number"
                            changeHandler={itemQtyChangeHandler} blurHandler={inputBlurHandler}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormTextInput
                            label="Price" value={itemPrice} variant={variant} inputType="number"
                            changeHandler={itemPriceChangeHandler} blurHandler={inputBlurHandler}
                        />
                    </Grid>

                    <Grid item xs={12} id={styles.centerButtons}>
                        <Button
                            type="button"
                            buttonStyle="transactionDetail-edit"
                            clickHandler={props.handleClose}
                        >
                            Cancel
                        </Button> | <Button
                            type="button"
                            buttonStyle="edit-item-added-before-save-button"
                            clickHandler={onSaveHandler}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default ItemDialog;