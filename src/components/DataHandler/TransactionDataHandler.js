import HistDummyData from "./HistDummyData";

export function getRecentTransactions() {
    return HistDummyData;
}

export function getTransactionDetail(uid) {
    return HistDummyData.find(transaction => transaction.uid = uid)
}