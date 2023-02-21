import { useState } from 'react';
import FormSelect from '../UI/FormSelect';
import currencyCodeList from '../Transaction/CurrencyCodeList';
import styles from './Header.module.css';

import InsightsIcon from '@mui/icons-material/Insights';

function Header() {
    const [currency, setCurrency] = useState('THB');

    const currencyChangeHandler= event => {
        setCurrency(event.target.value);
    }

    return (
        <div id={styles['flex-container']}>
            <div>
                <h4>Track Your Expense</h4>
                <InsightsIcon />
            </div>
            <div id={styles['currency-display']}>
                <FormSelect
                    label="Currency Display" value={currency} 
                    itemValues={currencyCodeList} changeHandler={currencyChangeHandler}
                />
            </div>
            <div>
                <button>Log In</button>
            </div>
        </div>
    );
}

export default Header;