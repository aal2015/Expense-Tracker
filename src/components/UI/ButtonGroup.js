import styles from './ButtonGroup.module.css';

function ButtonGroup(props) {
    return (
        <div id={styles.btnGroup}>
            {props.children}
        </div>
    );
}

export default ButtonGroup;