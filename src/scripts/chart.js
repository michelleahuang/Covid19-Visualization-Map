import { _ } from "core-js";
import getData from "./data.js";
import { chartButtons2020, chartButtons2021 } from "./utils.js";

import Globe from "./globe.js"


export async function createChart(ctx, country, province) {

    const finalData = await getData();
    const days = finalData[0][2];
    const twentyTwenty = days[0].slice(0, 345)
    const twentyTwentyOne = days[0].slice(345);
    
    const xAxis = twentyTwenty;

    let countryName = country;
    let provinceName = province;
    let index = -1;

    for (let i = 0; i < finalData.slice(1).length; i++) {
        let countryArray = finalData[i][0];
        let countryInfoArray = countryArray[countryArray.length - 1]
        let provinceIndex = countryInfoArray.indexOf(provinceName);
        if (provinceName !== "") {
            if (provinceIndex === 0) {
                index = i;
            }
        } else {
            let countryIndex = countryInfoArray.indexOf(countryName);
            if (countryIndex === 1) {
                index = i;
            }
        }
    }

    let chartName = "";
    if (provinceName === "") {
        chartName = countryName;
    } else {
        chartName = provinceName + ", " + countryName;
    }

    const covidData = finalData[index][2]; // COVID data for clicked on country
    const countryCovid2020 = covidData[0].slice(0, 345); // 2020 cases data
    const countryCovid2021 = covidData[0].slice(345); // 2021 cases data

    const yAxis = countryCovid2020

    console.log(index);
    // console.log(countryCovid2020);
    // console.log(countryCovid2021);

    clearChart();

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                label: "COVID-19 Cases per Day in " + chartName,
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
                        text: 'Days in 2020', 
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
            },
            responsive: false
        }
    });

    chartButtons2020(myChart, twentyTwenty, countryCovid2020);
    chartButtons2021(myChart, twentyTwentyOne, countryCovid2021);
}

function clearChart() {
    const chartStatus = Chart.getChart("chart");
    if (chartStatus !== undefined) {
            chartStatus.destroy();
    }
}



