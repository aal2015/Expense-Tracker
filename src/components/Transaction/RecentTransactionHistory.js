import { useState, useEffect } from "react";
import ContentBox from "../UI/ContentBox";
import TransactionDisplay from "./TransactionDisplay";
import styles from './TransactionHistory.module.css';
import { db } from "../../firebase/firebaseConfig";

import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

function RecentTransactionHistory() {
    const [transactionHist, setTransactionHist] = useState([]);
    const transactionRef = collection(db, 'transactions');
    const q = query(transactionRef, orderBy("transactionDate"), limit(15));
    
    useEffect(() => {
        getDocs(q).then((querySnapshot) => {
            const loadedData = [];
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                loadedData.push({docRef: doc.id, data: doc.data()});
            });
            console.log(loadedData);
            setTransactionHist(loadedData);
        }).catch(error => {
            console.log(error);
        });
    }, [])
    
    return (
        <ContentBox>
            <h3>Recent Transactions (upto last 15 Transactions)</h3>

            {transactionHist &&
                transactionHist.map((item, id) => (
                    <div key={id}>
                        {id !== 0 && <hr className={styles["hr-style"]} />}
                        <TransactionDisplay details={item.data} docRef={item.docRef} />
                    </div>
                ))
            }
        </ContentBox>
    );
}

export default RecentTransactionHistory;