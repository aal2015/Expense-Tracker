import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

function BarChart(props) {

    const BarData = {
        labels: props.label,
        datasets: [{
            label: 'Spending',
            data: props.data,
        }]
    }

    const BarOption = {
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: props.xLabel,
                    color: '#000000',
                    font: {
                        weight: 'bold',
                    }
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: props.yLabel,
                    color: '#000000',
                    font: {
                        weight: 'bold',
                    }
                }
            }
        }
    }

    return (
        <>
            <h5>{props.plotTitle}</h5>
            <Bar data={BarData} options={BarOption} />
        </>
    );
}

export default BarChart;