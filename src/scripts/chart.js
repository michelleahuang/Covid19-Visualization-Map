import getData from "./data.js";

export default async function createChart(ctx) {
    const finalData = await getData();
    console.log(finalData[0][2]);

    const days = finalData[0][2];
    
    const xAxis = days;
    // const yAxis

    const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xAxis,
        datasets: [{
            label: "COVID-19 Cases per Day in [Name of Country]",
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    }
    });

}

