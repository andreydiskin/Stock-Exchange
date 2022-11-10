/* marquee class */
class Marquee {
  /* marquee class constructor */
  constructor(marqueeCon) {
    this.marqueeCon = marqueeCon;
    this.dataMarquee = [];
    this.rawData = [];
  }
  /* load method that loads all the marquee methods by calling loadData method */
  load() {
    this.loadData();
  }
  /* very occasionally there is a case when the server returns data that is not an array
     (object instead of array), so this test is necessary to make sure that the data is an array 
     for no making an error, and fetching again data by load method */
  fillDataListMarquee() {
    try {
      if (!Array.isArray(this.dataMarquee)) {
        throw "Not an array";
      }
      for (let item of this.dataMarquee) {
        this.rawData.push({
          symbol: item.symbol,
          price: item.price,
        });
      }
    } catch {
      this.load();
    }
  }
  /* appending marquee to the DOM */
  appendMarquee() {
    const marqueeSpan = document.createElement("span");
    marqueeSpan.classList.add("marquee-span");

    const fragmentMarquee = new DocumentFragment();

    for (let i = 0; i < DATA_SUBSET_LENGTH; i++) {
      const newSpanSymbol = document.createElement("span");
      const newSpanPrice = document.createElement("span");

      newSpanSymbol.innerText = `   ${this.rawData[i].symbol} `;
      newSpanSymbol.classList.add("symbol");
      newSpanPrice.innerText = `$${this.rawData[i].price}   ` + "\u00A0\u00A0";
      newSpanPrice.classList.add("price");

      fragmentMarquee.append(newSpanSymbol, newSpanPrice);
    }
    marqueeSpan.append(fragmentMarquee);
    this.marqueeCon.append(marqueeSpan);
  }

  /* load method */
  async loadData() {
    this.dataMarquee = await fetchApi(fetchMarqueeURL);
    /* filling the data */
    this.fillDataListMarquee();
    /* appending to the DOM */
    this.appendMarquee();
  }
}
