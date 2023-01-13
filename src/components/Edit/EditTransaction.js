import ContentBox from "../UI/ContentBox";
import styles from './EditTransaction.module.css';

function EditTransaction() {

    const submitHandler = () => {
        console.log("Submiteed");
    }

    return (
        <div id={styles["background"]}>
            <ContentBox>
                <h1>Edit Transaction Record</h1>
                <form onSubmit={submitHandler}>
                    
                </form>
            </ContentBox>
        </div>
    );
}

export default EditTransaction;