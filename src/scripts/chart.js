import getData from "./data.js";

export default async function createChart(ctx) {
    const finalData = await getData();

    const days = finalData[0][2];
    const twentyTwenty = days[0].slice(0, 345)
    const twentyTwentyOne = days[0].slice(345);
    
    const xAxis = twentyTwenty;

    const country = finalData[1][2]; // Only gives me the first country (Afghanistan)
    const country2020 = country[0].slice(0, 345); // gives me Afghanistan's 2020 cases data
    const country2021 = country[0].slice(345); // gives me Afghanistan's 2021 cases data
    const yAxis = country2020

    const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xAxis,
        datasets: [{
            label: "COVID-19 Cases per Day in [Name of Country]",
            data: yAxis,
            fill: false,
            backgroundColor: 'rgba(8, 175, 238, 0.2)',
            borderColor: 'rgba(8, 43, 238, 1)',
            borderWidth: 1,
            color: "white"
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day',
                    color: 'white'
                },
                ticks: { color: 'white' }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of COVID-19 Cases',
                    color: 'white'
                },
                ticks: { color: 'white' },
                grid: {
                    color: 'rgb(105,105,105)'
                }
            }
        },
        plugins: {
            legend: {
                labels: { color: 'white' }
            }

        }
    }
    });

}

