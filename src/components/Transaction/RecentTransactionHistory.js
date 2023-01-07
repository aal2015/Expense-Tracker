import { useState, useEffect } from "react";
import ContentBox from "../UI/ContentBox";
import TransactionDisplay from "./TransactionDisplay";
import styles from './TransactionHistory.module.css';
import { db } from "../../firebase/firebaseConfig";

import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

function RecentTransactionHistory() {
    const [transactionHist, setTransactionHist] = useState([]);
    const transactionRef = collection(db, 'transactions');
    // const thirtyDaysAgo = new Date() - 1000 * 60 * 60 * 24 * 10000;
    // const thirtyDaysAgoDate = new Date(thirtyDaysAgo);
    // const q = query(transactionRef, orderBy("transactionDate"), where("transactionDate", ">=", thirtyDaysAgoDate));
    const q = query(transactionRef, orderBy("transactionDate", "desc"), limit(50));
    
    useEffect(() => {
        getDocs(q).then((querySnapshot) => {
            const loadedDataList = [];
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                let dataObject = {
                    amount: doc.data().amount, cashFlow: doc.data().cashFlow, currency: doc.data().currency,
                    description: doc.data().description, entity: doc.data().entity, items: doc.data().items,
                    transactionDate: doc.data().transactionDate.toDate(), type: doc.data().type
                }
                loadedDataList.push({docRef: doc.id, data: dataObject});
            });
            console.log(loadedDataList);
            setTransactionHist(loadedDataList);
        }).catch(error => {
            console.log(error);
        });
    }, [])
    
    return (
        <ContentBox>
            <h3>Recent Transactions (upto last 50 Transactions)</h3>

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