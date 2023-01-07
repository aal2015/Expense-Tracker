import styles from './Box.module.css';

const Box = props => {
    return (
        <div id={styles.whiteBackground}>
            {props.children}
        </div>
    );
};

export default Box;