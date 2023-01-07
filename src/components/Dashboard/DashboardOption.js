import { Link } from "react-router-dom";

import ContentBox from "../UI/ContentBox";
import Button from "../UI/Button";

function DashboardOption() {
    return (
        <ContentBox>
            <h3>Options</h3>

            <Link to={"addTransactionRecord"}>
                <Button buttonStyle="addTrancactionRecordButton">Add Transaction Record</Button>
            </Link>
        </ContentBox>
    )
}

export default DashboardOption;