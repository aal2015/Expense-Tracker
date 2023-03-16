import { useContext } from 'react';
import FormSelect from '../UI/FormSelect';
import currencyCodeList from '../Transaction/CurrencyCodeList';
import styles from './Header.module.css';
import CurrencyContext from '../../context/currency-context';

import InsightsIcon from '@mui/icons-material/Insights';

function Header() {
    const currencyCtx = useContext(CurrencyContext);
    console.log(currencyCtx.currencyCode);

    return (
        <div id={styles['flex-container']}>
            <div>
                <h4>Track Your Expense</h4>
                <InsightsIcon />
            </div>
            <div id={styles['currency-display']}>
                <FormSelect
                    label="Currency Display" value={currencyCtx.currencyCode} 
                    itemValues={currencyCodeList} changeHandler={currencyCtx.changeCurrencyCode}
                />
            </div>
            <div>
                <button>Log In</button>
            </div>
        </div>
    );
}

export default Header;