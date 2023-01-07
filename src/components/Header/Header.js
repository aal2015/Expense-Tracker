import styles from './Header.module.css';
// import TimeZoneSelect from './TimeZoneSelect';

import InsightsIcon from '@mui/icons-material/Insights';

function Header() {
    return (
        <div id={styles['flex-container']}>
            <div>
                <h4>Track Your Expense</h4>
                <InsightsIcon />
            </div>

            {/* <TimeZoneSelect /> */}

            <div>
                <button>Log In</button>
            </div>
        </div>
    );
}

export default Header;