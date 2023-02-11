import styles from './Header.module.css';

import InsightsIcon from '@mui/icons-material/Insights';

function Header() {
    return (
        <div id={styles['flex-container']}>
            <div>
                <h4>Track Your Expense</h4>
                <InsightsIcon />
            </div>
            <div>
                <button>Log In</button>
            </div>
        </div>
    );
}

export default Header;