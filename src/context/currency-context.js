import React, { useState } from 'react';

const CurrencyContext = React.createContext({
    currencyCode: "THB",
    changeCurrencyCode: (newCurrencyCode) => { }
})

export const CurrencyContextProvider = props => {
    const [currencyCode, setCurrencyCode] = useState("THB");

    const changeCurrencyCode = newCurrencyCode =>  {
        setCurrencyCode(newCurrencyCode.target.value);
    }

    return <CurrencyContext.Provider
        value={{
            currencyCode: currencyCode,
            changeCurrencyCode: changeCurrencyCode
        }}
    >
        {props.children}
    </CurrencyContext.Provider>
}

export default CurrencyContext;