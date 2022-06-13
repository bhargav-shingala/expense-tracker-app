import React, { useContext, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './style.css'
import { FormContext } from "../../App";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Analysis = () => {
    const [Data, _Data] = useContext(FormContext)
    useEffect(() => {
        const formvalue = localStorage.getItem('formData')
        const value = JSON.parse(formvalue)
        _Data(value)
    }, [])

    const labels = Data?.users?.map((x) => {
        return new Date(x?.date).toLocaleDateString('en-US')
    })

    const datasetIncome = {
        labels: labels,
        datasets: [
            {
                label: 'Income',
                data: Data?.users?.map((x) => x.types == 'income' ? x.amount : 0),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Expense',
                data: Data?.users?.map((x) => x.types == 'expense' ? x.amount : 0),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ]
    }

    return (
        <div style={{ margin: 50 }}>

            <h1 style={{ textAlign: 'center' }}>Analysis</h1>
            <div className="chartLine" >
                <Line data={datasetIncome} />
            </div>
        </div>

    )
}

export default Analysis