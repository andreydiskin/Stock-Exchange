/* search form class */
class SearchForm {
  /* search form class constructor */
  constructor(formCon) {
    this.formCon = formCon;
    this.btn;
    this.input = "";
    this.inputElement;
    this.companies = [];
    this.loaderElement = document.querySelector(".results-list");
    /* loading to html */
    this.loadHtml();
    this.timer;
  }
  loadHtml() {
    const nav = document.createElement("nav");
    const form = document.createElement("div");
    const input = document.createElement("input");
    const button = document.createElement("button");

    nav.classList.add(
      "navbar",
      "navbar-light",
      "bg-light",
      "flex",
      "justify-content"
    );
    form.classList.add("form-inline", "flex");
    input.classList.add("form-control", "mr-sm-2");
    input.placeholder = "search companies...";
    button.classList.add("btn", "bg-dark", "text-white", "my-2", "my-sm-0");
    button.innerText = "Search";
    this.btn = button;
    this.inputElement = input;
    form.append(input, button);
    nav.append(form);

    this.formCon.append(nav);
  }

  /* filling the data list */
  fillDataList(dataList, resultObj, additionalData) {
    dataList.push({
      name: resultObj.name,
      symbol: resultObj.symbol,
      img: additionalData.profile.image,
      price: additionalData.profile.changesPercentage,
    });
  }

  async showTenResults(input) {
    try {
      let companyFetchURL;
      let additionalData;
      let dataList = [];
      this.loaderElement.innerHTML = loaderHTML;
      let fetchURL = baseURL + queryURL + `${input}` + nasdaqURL;
      let data = await fetchApi(fetchURL);

      /* can't use forEach (high-order function) when doing async fetch inside, so for await needed */
      for await (let resultObj of data) {
        companyFetchURL = baseURL + companyURL + `${resultObj.symbol}`;
        additionalData = await fetchApi(companyFetchURL);
        if (additionalData?.profile === undefined) continue;
        /* filling the data */
        this.fillDataList(dataList, resultObj, additionalData);
      }
      this.companies = dataList;
    } catch (error) {
      console.log(error.message);
      this.loaderElement.classList.add("ten-res-error");
      this.loaderElement.innerHTML = resErrorMsg;
    }
  }

  /* found this solution by StackOverFlow and copied some terms */
  insertUrlParam(key, value) {
    if (history.pushState) {
      let searchParams = new URLSearchParams(window.location.search);
      searchParams.set(key, value);
      let newURL =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?" +
        searchParams.toString();
      window.history.pushState({ path: newURL }, "", newURL);
    }
  }

  enterInput(callback, input) {
    if (input.value === "") {
      clearTimeout(this.timer);
      return;
    }

    const timing = 1000;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.insertUrlParam("query", input.value);
      this.sendCallback(input.value, callback);
    }, timing);
  }

  async checkQuerySearch(callback) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const querySearch = urlSearchParams.get("query");
    if (querySearch !== null) {
      this.inputElement.value = querySearch;
      this.sendCallback(querySearch, callback);
    }
  }

  async sendCallback(input, callback) {
    await this.showTenResults(input);
    /* object for the companies and the input value */
    callback({ companies: this.companies, searchValue: input });
  }
  /* while clicking sending the callback - with the inputElement and the callback (companies) */
  onSearch(callback) {
    this.checkQuerySearch(callback);
    this.inputElement.addEventListener("keyup", () =>
      this.enterInput(callback, this.inputElement)
    );
    this.btn.addEventListener("click", () =>
      this.sendCallback(this.inputElement, callback)
    );
  }
}
