import TransactionForm from "../Input/TransactionForm";

import { db } from "../../firebase/firebaseConfig";
import { useParams, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";

function EditTransaction() {
    const navigate = useNavigate();
    const { id: documentId } = useParams();

    const submitTransactionRecord = async (submitData) => {
        try {
            const documentRef = doc(db, "transactions", documentId);
            await updateDoc(documentRef, submitData)
            console.log("Document Updated");
            navigate("..");
        } catch (e) {
            console.error(e);
        }
    }

    return <TransactionForm titleAction={'Edit'} mode={'Edit'} onSubmit={submitTransactionRecord} />;
}

export default EditTransaction;