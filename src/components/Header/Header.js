import { useContext } from 'react';
import FormSelect from '../UI/FormSelect';
import currencyCodeList from '../Transaction/CurrencyCodeList';
import styles from './Header.module.css';
import CurrencyContext from '../../context/currency-context';

import { Link } from "react-router-dom";

import InsightsIcon from '@mui/icons-material/Insights';

function Header() {
    const currencyCtx = useContext(CurrencyContext);

    return (
        <div id={styles['flex-container']}>
            <div>
                <Link to={'/'} id={styles.homepageLink}>
                    <h4>Track Your Expense</h4>
                    <InsightsIcon />
                </Link>
            </div>
            <div id={styles['currency-display']}>
                <FormSelect
                    label="Currency Display" value={currencyCtx.currencyCode}
                    itemValues={currencyCodeList} changeHandler={currencyCtx.changeCurrencyCode}
                />
            </div>
        </div>
    );
}

export default Header;