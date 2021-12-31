export default function getData() {

        fetch("src/data/time_series_covid19_confirmed_global.csv")
        .then(response => {
            return response.text();
        })
        .then(text => {
            const table = text.split('\n'); // splitting data into rows by line break
            const finalData = []; 

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
        //     // console.log(finalData); // need to figure out how to get this out of the promise - 281 countries
        //     // console.log(finalData[1]) // first country - afghanistan 
        //     // console.log(finalData[0]) // gives you the headers, ie. the dates and labels

        })


}