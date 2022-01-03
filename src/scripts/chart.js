import { _ } from "core-js";
import getData from "./data.js";

export default async function createChart(ctx, country, province) {
    const finalData = await getData();
    const days = finalData[0][2];
    const twentyTwenty = days[0].slice(0, 345)
    const twentyTwentyOne = days[0].slice(345);
    
    const xAxis = twentyTwenty;

    let countryName = country;
    let provinceName = province;
    // let countryIndex = finalData.indexOf(countryName);
    let index = -1;

    for (let i = 0; i < finalData.length; i++) {
        let countryArray = finalData[i][0];
        let countryInfoArray = countryArray[countryArray.length - 1]
        let provinceIndex = countryInfoArray.indexOf(provinceName);
        if (provinceName !== "") {
            if (provinceIndex === 0) {
                index = i + 1;
            }
            // console.log(provinceIndex)
            // index = provinceIndex;
        } else {
            let countryIndex = countryInfoArray.indexOf(countryName);
            if (countryIndex === 1) {
                index = i + 1;
            }
            // index = countryIndex;
            // console.log(countryIndex);
        }
        // let countryIndex = countryInfoArray.indexOf(countryName)
        // console.log(countryIndex);
    }

    console.log(index);


    // console.log(countryName);
    // console.log(provinceName);
    // console.log(countryIndex);

    // const covidData = finalData[1][2]; // Only gives me the first country (Afghanistan)
    // console.log(covidData);
    // const countryCovid2020 = covidData[0].slice(0, 345); // gives me Afghanistan's 2020 cases data
    // const countryCovid2021 = covidData[0].slice(345); // gives me Afghanistan's 2021 cases data
    // const yAxis = country2020

    /*
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
                    text: 'Day', DONT FORGET TO INCLUDE THE YEAR
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

    */

}

