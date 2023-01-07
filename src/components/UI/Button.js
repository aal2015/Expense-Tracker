import styles from './Button.module.css';

function Button(props) {
    return (
        <button 
            className={`${styles.buttonStyling} ${styles[props.buttonStyle]}`}
            type={props.type}
            onClick={props.clickHandler}
            disabled={props.disableStatus}
        >
            {props.children}
        </button>
    )
}

export default Button;