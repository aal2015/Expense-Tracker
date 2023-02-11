import styles from './ContentBox.module.css';

function ContentBox(props) {
    return (
        <div id={styles.whiteBackground} className={`${styles[props.classStyle]}`}>
            {props.children}
        </div>
    )
}

export default ContentBox;