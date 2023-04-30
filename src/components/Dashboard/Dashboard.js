import { useState, useEffect } from "react";
import ContentBox from "../UI/ContentBox";
import BarChart from "../ChartType/BartChart";
import { db } from "../../firebase/firebaseConfig";

import { collection, query, orderBy, where, getDocs } from "firebase/firestore";

function Dashboard() {
    const [transactionData, setTransactionData] = useState([]);

    const dateInstance = new Date();
    const lastSundayDay = dateInstance.getDate() - dateInstance.getDay();

    const todayDate    = new Date();
    const currentYear  = todayDate.getFullYear();
    const currentMonth = todayDate.getMonth();
    const lastSundayDate = new Date(currentYear, currentMonth, lastSundayDay);

    const days        = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let expensePerDay = [0, 0, 0, 0, 0, 0, 0]

    const transactionRef = collection(db, 'transactions');
    const q = query(
        transactionRef,
        orderBy("transactionDate"),
        where("transactionDate", ">=", lastSundayDate)
    );

    useEffect(() => {
        getDocs(q).then((querySnapshot) => {
            const loadedDataList = [];
            querySnapshot.forEach((doc) => {
                let dataObject = {
                    amount: doc.data().amount, cashFlow: doc.data().cashFlow, currency: doc.data().currency,
                    description: doc.data().description, entity: doc.data().entity, items: doc.data().items,
                    transactionDate: doc.data().transactionDate.toDate(), type: doc.data().type
                }
                loadedDataList.push(dataObject);
            });
            setTransactionData(loadedDataList);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const calculateDailyExpense = transactions => {
        transactions.forEach(transaction => {
            const date    = transaction.transactionDate;
            const dateIdx = date.getDate() - lastSundayDate.getDate();
            const amount = parseInt(transaction.amount);
            expensePerDay[dateIdx] += amount;
        });
    }

    if (transactionData.length > 0) {
        calculateDailyExpense(transactionData);
    }
    
    return (
        <ContentBox>
            <h3>Spending Statistics</h3>
            <BarChart data={expensePerDay} label={days} />
        </ContentBox>
    )
}

export default Dashboard;