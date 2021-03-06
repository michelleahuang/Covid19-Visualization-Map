export default async function getData() {
    const finalData = []

    const response = await fetch("src/data/time_series_covid19_confirmed_global.csv")
    const data = await response.text();
    const table = data.split("\n")

    table.forEach(row => { // each row is a country in the table
        const columns = row.split(",");
        const country = [];
        const location = [];
        const cases = []; // cases[0] = 1/22/20
        country.push(columns.slice(0, 2)) // gives you province/state and country/region
        location.push(columns.slice(2, 4)) // gives you latitude and longitude
        cases.push(columns.slice(4)) // gives you all the COVID cases data - each individual subarray is a country
        let countryData = []; 
        countryData.push(country, location, cases); // each index is a single country
        finalData.push(countryData);
    })
    return finalData;
}

getData().catch(error => {
    console.error(error);
})
