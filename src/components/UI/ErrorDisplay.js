import styles from './ErrorDisplay.module.css';

function ErrorDisplay(props) {
    return (<div id={styles.background}>
        <p>Error loading transactions.</p>
    </div>)
}

export default ErrorDisplay;