import styles from './LoadSpinner.module.css';

import { Blocks } from 'react-loader-spinner';

function LoadSpinner() {
    return (
        <div id={styles.loadingSpinner}>
            <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{ margin: "0 auto" }}
                wrapperClass="blocks-wrapper"
            />
        </div>
    );
}

export default LoadSpinner;