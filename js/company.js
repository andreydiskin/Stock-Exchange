/* variables */
/* using URLSearchParams to get symbol */
const searchParams = new URLSearchParams(window.location.search);
const symbol = searchParams.get("symbol");
const loader = document.querySelector(".loader");
const companyImg = document.querySelector(".company-img");
const companyName = document.querySelector(".company-name");
const description = document.querySelector(".desc");
const companyStockSub = document.querySelector(".company-stock-subtitle");
const chart = document.getElementById("myChart");
const loaderChart = document.querySelector(".loader-chart");

/* functions */
/* a function for displaying company information */
async function getCompanyProfile(symbol, fetchApi, appendCompanyProfile) {
  loader.innerHTML = loaderHTML;
  try {
    let fetchURL = baseURL + companyURL + `${symbol}`;
    let data = await fetchApi(fetchURL);
    loader.innerHTML = "";
    /* appending to the DOM */
    appendCompanyProfile(data);
  } catch (error) {
    console.log(error.message);
    /* error message */
    loader.classList.add("loader-chart-error");
    loader.innerHTML = compErrorMsg;
  }
}

/* a function for the chart - history of stock */
async function historyOfStock(
  symbol,
  fetchApi,
  filterData,
  sortData,
  displayChartJS
) {
  loaderChart.innerHTML = loaderHTML;
  try {
    let fetchHistoricalURL =
      baseURL + historicalURL + `${symbol}?serietype=line`;

    let data = await fetchApi(fetchHistoricalURL);

    loaderChart.innerHTML = "";
    /* filter and then sort the data */
    let filteredData = filterData(data);
    let sortedFilteredData = sortData(filteredData);
    /* display the chart */
    displayChartJS(sortedFilteredData);
  } catch (error) {
    /* error message */
    console.log(error.message);
    loaderChart.classList.add("loader-chart-error");
    loaderChart.innerHTML = chartErrorMsg;
  }
}

/* function calling */
getCompanyProfile(symbol, fetchApi, appendCompanyProfile);
historyOfStock(symbol, fetchApi, filterData, sortData, displayChartJS);
