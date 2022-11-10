/* filtering the data by pastLimit */
function filterData(data) {
  let filteredData = data.historical.filter((item) => {
    const currentDate = new Date(item.date);
    const pastLimit = new Date("01/26/1994");

    if (currentDate >= pastLimit) {
      return true;
    }
    return false;
  });
  return filteredData;
}
/* sorting the data */
function sortData(filteredData) {
  let sortedFilteredData = filteredData.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return sortedFilteredData;
}

/* displaying the chart */
function displayChartJS(sortedFilteredData) {
  const displayData = {
    labels: sortedFilteredData.map((item) => item.date),
    datasets: [
      {
        label: "Stock Price History",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        fill: true,
        lineTension: 0,

        data: sortedFilteredData.map((item) => item.close),
      },
    ],
  };

  const config = {
    type: "line",
    data: displayData,
    options: {
      elements: {
        line: {
          tension: 0,
        },
      },
    },
  };
  const myChart = new Chart(chart, config);
}
