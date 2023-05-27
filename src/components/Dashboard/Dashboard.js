import { useState, useEffect, useContext } from "react";
import ContentBox from "../UI/ContentBox";
import BarChart from "../ChartType/BartChart";
import CurrencyContext from "../../context/currency-context";
import currency_symbols from "../Transaction/CurrencySymbol";
import { db } from "../../firebase/firebaseConfig";

import { Convert } from "easy-currencies";

import { collection, query, orderBy, where, getDocs } from "firebase/firestore";

function Dashboard() {
    const [transactionData, setTransactionData] = useState([]);

    const currencyCtx = useContext(CurrencyContext);
    const yLabel = 'Spending in ' + currency_symbols[currencyCtx.currencyCode];

    const dateInstance = new Date();
    const lastSundayDay = dateInstance.getDate() - dateInstance.getDay();

    const todayDate = new Date();
    const currentYear = todayDate.getFullYear();
    const currentMonth = todayDate.getMonth();
    const lastSundayDate = new Date(currentYear, currentMonth, lastSundayDay);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let expensePerDay = [0, 0, 0, 0, 0, 0, 0];

    const transactionRef = collection(db, 'transactions');
    const q = query(
        transactionRef,
        orderBy("transactionDate"),
        where("transactionDate", ">=", lastSundayDate)
    );

    useEffect(() => {
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let dataObject = {
                    cashFlow: doc.data().cashFlow, currency: doc.data().currency,
                    description: doc.data().description, entity: doc.data().entity, items: doc.data().items,
                    transactionDate: doc.data().transactionDate.toDate(), type: doc.data().type
                }

                let amount;
                if (doc.data().currency === currencyCtx.currencyCode) {
                    amount = parseInt(doc.data().amount);
                    dataObject.amount = amount;
                    setTransactionData(prev => [...prev, dataObject])
                } else {
                    const convertedAmount = convertAmount(doc.data().currency, currencyCtx.currencyCode,
                        parseInt(doc.data().amount));

                    convertedAmount.then(amount => {
                        dataObject.amount   = amount;
                        dataObject.currency = currencyCtx.currencyCode
                        setTransactionData(prev => [...prev, dataObject])
                    });
                }
            });
        }).catch(error => {
            console.log(error);
        });
    }, []);

    async function convertAmount(base, finalCur, amount) {
        const newAmount = await Convert(amount).from(base).to(finalCur);
        return newAmount;
    }

    const calculateDailyExpense = transactions => {
        transactions.forEach(transaction => {
            if (transaction.cashFlow === "out") {
                const date = transaction.transactionDate;
                const dateIdx = date.getDay();
                expensePerDay[dateIdx] += transaction.amount;
            }
        });
    }

    if (transactionData.length > 0) {
        calculateDailyExpense(transactionData);
    }

    return (
        <ContentBox>
            <h3>Spending Statistics</h3>
            <BarChart
                data={expensePerDay}
                label={days}
                plotTitle={"Total Transaction per Day for this Week"}
                xLabel={'Day'}
                yLabel={yLabel}
            />
        </ContentBox>
    )
}

export default Dashboard;