import TransactionForm from "./TransactionForm";
import { db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";

function AddTransaction() {
    const navigate = useNavigate();

    const submitTransactionRecord = async (submitData) => {
        try {
            const docRef = await addDoc(collection(db, "transactions"), submitData);
            console.log("Document written with ID: ", docRef.id);

            navigate("..");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <TransactionForm titleAction={'Add'} mode={'Add'} onSubmit={submitTransactionRecord} />
    );
}

export default AddTransaction;