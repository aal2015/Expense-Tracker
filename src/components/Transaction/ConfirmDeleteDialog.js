import Button from '../UI/Button';
import styles from './ConfirmDeleteDialog.module.css';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

function ConfirmDeleteDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>
                Confirm Delete
            </DialogTitle>
            <DialogContent>
                Are you sure you want to delete the transaction record permanently?
            </DialogContent>
            <div id={styles.optionButtons}>
                <Button
                    type="button"
                    buttonStyle="cancelTransactionRecordDelete"
                    clickHandler={props.handleClose}
                >
                    No
                </Button> | <Button
                    type="button"
                    buttonStyle="confirmTransactionRecordDelete"
                    clickHandler={props.onDeleteHandler}
                >
                    Yes
                </Button>
            </div>
        </Dialog>
    );
}

export default ConfirmDeleteDialog;