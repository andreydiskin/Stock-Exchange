/* with error handling + another error handling in each separate case */
async function fetchApi(fetchURL) {
  try {
    let response = await fetch(fetchURL);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
}
