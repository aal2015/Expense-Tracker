import { useState } from "react";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import ContentBox from "../UI/ContentBox";
import { typeIcons, months, typeColor } from "./TransactionDisplay";
import styles from './TransactionDetail.module.css';
import Button from "../UI/Button";
import { db } from "../../firebase/firebaseConfig.js";

import Grid2 from '@mui/material/Unstable_Grid2';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { doc, deleteDoc } from "firebase/firestore";

function TransactionDetail() {
    const { state } = useLocation();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    let { id: documentsId } = useParams();
    const navigate = useNavigate();

    const transactionDetail = state;
    const cashFlowIcon = { "out": <ArrowDropDownIcon />, "in": <ArrowDropUpIcon /> }
    const cashFlowColor = { "out": "red", "in": "green" }

    const date = transactionDetail.transactionDate;

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    let totalCost = 0;

    for (let i = 0; i < transactionDetail.items.length; i++) {
        totalCost += Number(transactionDetail.items[i].itemPrice) * Number(transactionDetail.items[i].itemQty);
    }

    const attribute_width_size = 4;
    const value_width_size = 8;

    const handleDeleteDialogClickOpen = () => {
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const deleteHandler = async () => {
        await deleteDoc(doc(db, "transactions", documentsId));
        console.log("Transaction record deleted successfully.");
        navigate("..");
    }

    return (
        <div id={styles["background"]}>
            <ContentBox >
                <Link to={'..'}>
                    <Button buttonStyle="backButton">
                        <KeyboardBackspaceIcon />
                    </Button>
                </Link>

                <h1>Transaction Detail</h1>

                <Grid2 container spacing={3} id={styles.maxRowWidth} >
                    {/* Row 1 */}
                    <Grid2 xs={attribute_width_size}>
                        <p>Type:</p>
                    </Grid2>
                    <Grid2 xs={value_width_size}>
                        <p
                            style={{
                                borderLeft: `6px solid ${typeColor[transactionDetail.type]}`,
                                paddingLeft: "5px"
                            }}
                        >{transactionDetail.type} {typeIcons[transactionDetail.type]}</p>
                    </Grid2>

                    {/* Row 2 */}
                    <Grid2 xs={attribute_width_size}>
                        <p>Class Flow:</p>
                    </Grid2>
                    <Grid2 xs={value_width_size}>
                        <p>
                            <span style={{ color: cashFlowColor[transactionDetail.cashFlow] }}>
                                {cashFlowIcon[transactionDetail.cashFlow]}
                            </span>
                            {transactionDetail.cashFlow}
                        </p>
                    </Grid2>

                    {/* Row 3 */}
                    <Grid2 xs={attribute_width_size}>
                        <p>Entity:</p>
                    </Grid2>
                    <Grid2 xs={value_width_size}>
                        <p>{transactionDetail.entity}</p>
                    </Grid2>

                    {/* Row 4  */}
                    <Grid2 xs={attribute_width_size}>
                        <p>Amount:</p>
                    </Grid2>
                    <Grid2 xs={value_width_size}>
                        <p>{transactionDetail.amount}</p>
                    </Grid2>

                    {/* Row 5 */}
                    <Grid2 xs={attribute_width_size}>
                        <p>Currency:</p>
                    </Grid2>
                    <Grid2 xs={value_width_size}>
                        <p>{transactionDetail.currency}</p>
                    </Grid2>

                    {/* Row 6 */}
                    <Grid2 xs={attribute_width_size}>
                        <p>Transaction Date:</p>
                    </Grid2>
                    <Grid2 xs={value_width_size}>
                        <p>
                            {day} {month} {year}
                        </p>
                    </Grid2>

                    {/* Row 7 */}
                    <Grid2 xs={attribute_width_size}>
                        <p>Description:</p>
                    </Grid2>
                    <Grid2 xs={value_width_size}>
                        <p>{transactionDetail.description}</p>
                    </Grid2>

                    {/* Row 8 */}
                    {transactionDetail.items.length > 0 &&
                        <>
                            <Grid2 xs={attribute_width_size}>
                                <p>Items:</p>
                            </Grid2>
                            <Grid2 xs={value_width_size}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactionDetail.items.map((item, id) => (
                                            <tr key={id}>
                                                <td>{item["item"]}</td>
                                                <td>{item["itemQty"]}</td>
                                                <td>{item["itemPrice"]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p id={styles.totalCostStyling}><b>Total Cost:</b> {totalCost}</p>
                            </Grid2>
                        </>
                    }
                    <Grid2 xs={12} id={styles.editDeleteButton}>
                        <Link
                            to={"/editTransaction/" + documentsId}
                            state={transactionDetail}
                        >
                            <Button
                                type="button"
                                buttonStyle="transactionDetail-edit"
                            >
                                Edit
                            </Button>
                        </Link> | <Button
                            type="button"
                            buttonStyle="transactionDetail-delete"
                            clickHandler={handleDeleteDialogClickOpen}
                        >
                            Delete
                        </Button>
                    </Grid2>
                </Grid2>
            </ContentBox>

            <ConfirmDeleteDialog
                open={openDeleteDialog}
                handleClose={handleDeleteDialogClose}
                onDeleteHandler={deleteHandler}
            />
        </div>
    )
}

export default TransactionDetail;