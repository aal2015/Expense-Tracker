import Button from '../UI/Button';
import styles from './AddItem.module.css';

import Grid from '@mui/material/Grid';
import FormTextInput from "../UI/FormTextInput";

function AddItem(props) {
    return (
        <>
            <h3>Add Items</h3>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <FormTextInput
                        label="Item" value={props.itemNameValue} variant={props.variant} inputType="text"
                        changeHandler={props.itemNameChangeHandler} blurHandler={props.inputBlurHandler}
                        hasError={props.hasError}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormTextInput
                        label="Qty" value={props.itemQty} variant={props.variant} inputType="number"
                        changeHandler={props.itemQtyChangeHandler} blurHandler={props.inputBlurHandler}
                        hasError={props.hasError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="button"
                        buttonStyle="addTransaction-addItem-button"
                        clickHandler={props.appendItem}
                        disableStatus={props.itemIsEmpty}
                    >
                        Add Item
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default AddItem;