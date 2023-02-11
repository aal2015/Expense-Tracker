import styles from './Box.module.css';

const Box = props => {
    return (
        <div id={styles.whiteBackground} className={`${styles[props.boxClassStyle]}`}>
            {props.children}
        </div>
    );
};

export default Box;