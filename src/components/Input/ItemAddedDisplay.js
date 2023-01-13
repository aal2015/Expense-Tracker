import React from 'react';
import styles from './ItemAddedDisplay.module.css';
import Button from '../UI/Button';
import ButtonGroup from '../UI/ButtonGroup';

import Grid from '@mui/material/Grid';

function ItemAddedDisplay(props) {
    const header = (
        <Grid container spacing={1}>
            <Grid item xs={5}>
                <h5>Item</h5>
            </Grid>
            <Grid item xs={2}>
                <h5>Qty</h5>
            </Grid>
            <Grid item xs={3}>
                <h5>Price</h5>
            </Grid>
            <Grid item xs={2}>
                <h5>Edit/Delete</h5>
            </Grid>
        </Grid>
    );

    const items = (
        <>
            {props.itemList.map((item, id) => (
                <>
                    <div key={id} className={styles.itemDisplay}>
                        <Grid container spacing={1}>
                            <Grid item xs={5}>
                                <p className={styles.displayCell}>{item.item}</p>
                            </Grid>
                            <Grid item xs={2}>
                                <p className={styles.displayCell}>{item.itemQty}</p>
                            </Grid>
                            <Grid item xs={3}>
                                <p className={styles.displayCell}>{item.itemPrice}</p>
                            </Grid>
                            <Grid item xs={2}>
                                <ButtonGroup 
                                    variant="text" 
                                    aria-label="outlined primary button group"
                                    id={styles.groupButton}    
                                >
                                    <Button
                                        type="button"
                                        buttonStyle="edit-item-button"
                                        clickHandler={() => props.handleClickOpen(id)}
                                    >Edit</Button>
                                    <Button
                                        type="button"
                                        buttonStyle="addTransaction-removeItem-button"
                                        clickHandler={() => props.removeItem(item.id)}
                                    >X</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </div>
                </>
            ))}
        </>
    );

    return (<>
        <h3>Items Added</h3>
        {header}
        {items}
        {props.itemList.length === 0 &&
            <p id={styles.noItemAdded}>Items not yet added</p>
        }
        <p id={styles.totalCostStyling}><b>Total Cost:</b> {props.itemTotalCost}</p>
    </>)
};

export default ItemAddedDisplay;