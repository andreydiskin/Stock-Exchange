/* immediately invoked function as on Milestone 6 picture */
(async function () {
  const marquee = new Marquee(document.querySelector(".marquee-con"));
  marquee.load();

  const form = new SearchForm(document.querySelector(".form"));
  const results = new SearchResult(document.querySelector(".results-list"));
  form.onSearch((companies) => results.renderResults(companies));
})();
