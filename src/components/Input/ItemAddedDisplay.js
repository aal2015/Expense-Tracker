import React from 'react';
import styles from './ItemAddedDisplay.module.css';
import Button from '../UI/Button';

import Grid from '@mui/material/Grid';

function ItemAddedDisplay(props) {
    const header = (
        <Grid container spacing={1}>
            <Grid item xs={7}>
                <h5>Item</h5>
            </Grid>
            <Grid item xs={3}>
                <h5>Qty</h5>
            </Grid>
            <Grid item xs={2}>
                <h5>Delete</h5>
            </Grid>
        </Grid>
    );

    const items = (
        <>
            {props.itemList.map((item, id) => (
                <>
                    <div key={id} className={styles.itemDisplay}>
                        <Grid container spacing={1}>
                            <Grid item xs={7}>
                                <p className={styles.displayCell}>{item.item}</p>
                            </Grid>
                            <Grid item xs={3}>
                                <p className={styles.displayCell}>{item.itemQty}</p>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    type="button"
                                    buttonStyle="addTransaction-removeItem-button"
                                    clickHandler={() => props.removeItem(item.id)}
                                >X</Button>
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
    </>)
};

export default ItemAddedDisplay;