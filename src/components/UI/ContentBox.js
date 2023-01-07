import styles from './ContentBox.module.css';

function ContentBox(props) {
    return (
        <div id={styles.whiteBackground}>
            {props.children}
        </div>
    )
}

export default ContentBox;