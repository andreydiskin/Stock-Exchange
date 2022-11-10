/* appending company data to the DOM */
function appendCompanyProfile(data) {
  const newImg = document.createElement("img");
  const newLink = document.createElement("a");
  const newSpan = document.createElement("span");

  newLink.classList.add("link");
  newImg.setAttribute("onerror", "this.onerror=null;this.src=imgDefaultSrc;");
  newImg.classList.add("img-size");
  newImg.src = data.profile.image;
  newImg.alt = data.profile.name;
  companyImg.appendChild(newImg);

  /* show industry if exists */
  if (data.profile.industry !== "") {
    newLink.innerText = `${data.profile.companyName}\u00A0(${data.profile.industry})`;
  } else {
    newLink.innerText = `${data.profile.companyName}`;
  }
  newLink.href = data.profile.website;
  /* open on new page */
  newLink.target = "_blank";
  companyName.appendChild(newLink);
  description.innerText = data.profile.description;
  companyStockSub.innerText = "Stock price: $" + data.profile.price + " ";

  /* green or red */
  if (data.profile.changesPercentage > 0) {
    newSpan.innerText = "(+" + data.profile.changesPercentage + "%)";
    newSpan.classList.add("green");
  } else {
    newSpan.innerText = "(" + data.profile.changesPercentage + "%)";
    newSpan.classList.add("red");
  }

  companyStockSub.appendChild(newSpan);
}
