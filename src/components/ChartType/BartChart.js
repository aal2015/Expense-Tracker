import { useState} from "react";

function BarChart(props) {
    const [data, setData] = useState([]);

    console.log(props.data);
    console.log(props.label);

    return (
        <>Bar Plot</>
    );
}

export default BarChart;