import { useState} from "react";

function BarChart(props) {
    const [data, setData] = useState([]);
    const labels          = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    var sumPerday         = [0, 0, 0, 0, 0, 0, 0];

    props.transactionData.forEach(record => {
        console.log(record);
    });

    return (
        <>Bar Plot</>
    );
}

export default BarChart;