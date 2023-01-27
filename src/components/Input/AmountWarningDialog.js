import Button from '../UI/Button';
import styles from './AmountWarningDialog.module.css';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


function AmountWarningDialog(props) {
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Submission Warning!!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Entered amount and total cost from item list are not equal.
                    Are you sure you want to save?
                </DialogContentText>
            </DialogContent>
            <div id={styles.centerButtons}>
                <Button
                    type="button"
                    buttonStyle="transactionDetail-edit"
                    clickHandler={props.handleClose}
                >
                    No
                </Button> | <Button
                    type="button"
                    buttonStyle="edit-item-added-before-save-button"
                    clickHandler={props.handleAccept}
                >
                    Yes
                </Button>
            </div>

        </Dialog>
    );
}

export default AmountWarningDialog;