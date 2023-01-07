import React, { useState } from 'react';

const TransactionContext = React.createContext({
    transactionDate: 'Asia/Bangkok',
    getRecentTransactions: () => {},
    getTransactionDetail: (uid) => {}
})


export const TimeZoneContextProvider = (props) => {
    // const 
}