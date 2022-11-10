/* search result class */
class SearchResult {
  /* search result class constructor */
  constructor(resultElement) {
    this.resultList = resultElement;
  }

  highlightText(company, searchValue, searchKey, elementToAppend) {
    let highLightArea = [0, 0];

    const highLightSpanLink = document.createElement("span");
    const regSpanLink = document.createElement("span");
    highLightSpanLink.classList.add("highlight");
    /* search value to upper char and slicing */
    highLightSpanLink.className = "highlight";
    searchValue = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
    /* if equals symbol */
    highLightArea[0] =
      searchKey === "symbol"
        ? company[searchKey].indexOf(searchValue[0].toUpperCase())
        : company[searchKey].indexOf(searchValue);
    /* if exists */
    if (highLightArea[0] !== -1) {
      highLightArea[1] = highLightArea[0] + searchValue.length;
      /* creating sub string */
      highLightSpanLink.innerText = company[searchKey].substring(
        highLightArea[0],
        highLightArea[1]
      );
      /* returning new string with replacement "" */
      regSpanLink.innerText = company[searchKey].replace(
        highLightSpanLink.innerText,
        ""
      );
      if (searchKey === "symbol") {
        regSpanLink.innerText += ")";
        highLightSpanLink.innerText = "(" + highLightSpanLink.innerText;
      }
      elementToAppend.append(highLightSpanLink, regSpanLink);
    } else {
      regSpanLink.innerText = company[searchKey];
      if (searchKey === "symbol") {
        regSpanLink.innerText = "(" + regSpanLink.innerText + ")";
      }
      elementToAppend.append(regSpanLink);
    }
  }

  /* rendering the results */
  renderResults({ companies, searchValue }) {
    const fragment = new DocumentFragment();
    const newUl = document.createElement("ul");
    if (companies.length === 0) {
      this.resultList.innerHTML = "";
      const noResults = document.createElement("li");
      noResults.classList.add("ten-res-error");
      noResults.innerText = noResErrorMsg;
      newUl.append(noResults);
    } else {
      for (let i = 0; i < companies.length; i++) {
        this.resultList.innerHTML = "";
        const newLi = document.createElement("li");
        const newLink = document.createElement("a");
        const newSpanSymbol = document.createElement("span");
        const newDiv = document.createElement("div");
        const newImg = document.createElement("img");
        const newSpan = document.createElement("span");

        /* if the image not displaying replace it with a default image */
        newImg.setAttribute(
          "onerror",
          "this.onerror=null;this.src=imgDefaultSrc;"
        );
        newImg.src = companies[i].img;
        newImg.alt = companies[i].name;
        newImg.classList.add("img-size");
        newLink.classList.add("link");
        newLink.href = compSearchURL + `${companies[i].symbol}`;
        newLink.target = "_blank";
        /* calling highlightText method */
        this.highlightText(companies[i], searchValue, "symbol", newSpanSymbol);
        this.highlightText(companies[i], searchValue, "name", newLink);

        newSpanSymbol.classList.add("comp-symbol");

        /* green or red */
        if (companies[i].price > 0) {
          newSpan.innerText = "(+" + companies[i].price + "%)";
          newSpan.classList.add("green");
        } else {
          newSpan.innerText = "(" + companies[i].price + "%)";
          newSpan.classList.add("red");
        }

        newDiv.classList.add("li-divider");
        newLi.classList.add("flex");
        newLi.classList.add("company-link");
        newLi.append(newImg, newLink, newSpanSymbol, newSpan);
        fragment.append(newDiv, newLi);
      }
    }
    newUl.append(fragment);
    this.resultList.append(newUl);
  }
}
