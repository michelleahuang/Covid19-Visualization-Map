export function instructions() {
    let instructionsButton = document.getElementById("instructions-button");

    instructionsButton.addEventListener("click", (e) => {
        e.preventDefault();
        let instructionsBox = document.getElementById("instructions");
        instructionsBox.classList.toggle("instructions-box-hidden")

        let lineGraphContainer = document.getElementById("line-graph");
        lineGraphContainer.classList.add("line-graph-hidden");    
    })
}

export function chartButtons2020(myChart, twentyTwenty, countryCovid2020) {
    let chartButton2020 = document.getElementById("2020");
    chartButton2020.classList.remove("chart-button-selected")
    let eventListenerFlag = false;

    if (eventListenerFlag) {
        chartButton2020.removeEventListener("click", create2020Chart);
    }

    chartButton2020.addEventListener("click", create2020Chart);
    
    function create2020Chart (e) {
        eventListenerFlag = true;
        if (chartButton2020.value === "2020") {
            myChart.config.data.labels = twentyTwenty;
            myChart.config.data.datasets[0].data = countryCovid2020;
            myChart.config.options.scales.x.title.text = "Days in " + chartButton2020.value;
        }
        myChart.update();
        chartButton2020.classList.add("chart-button-selected")

        let chartButton2021 = document.getElementById("2021");
        chartButton2021.classList.remove("chart-button-selected");
    }

}

export function chartButtons2021(myChart, twentyTwentyOne, countryCovid2021) {
    let chartButton2021 = document.getElementById("2021")
    chartButton2021.classList.remove("chart-button-selected")
    let eventListenerFlag = false;

    if (eventListenerFlag) {
        chartButton2021.removeEventListener("click", create2021Chart);
    }

    chartButton2021.addEventListener("click", create2021Chart);
    
    function create2021Chart (e) {
        eventListenerFlag = true;
        if (chartButton2021.value === "2021") {
            myChart.config.data.labels = twentyTwentyOne;
            myChart.config.data.datasets[0].data = countryCovid2021;         
            myChart.config.options.scales.x.title.text = "Days in " + chartButton2021.value;
        }
        myChart.update();
        chartButton2021.classList.add("chart-button-selected")

        let chartButton2020 = document.getElementById("2020");
        chartButton2020.classList.remove("chart-button-selected");
    }

}