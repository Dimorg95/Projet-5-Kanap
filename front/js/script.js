let items = document.querySelector('#items');
const url = `http://localhost:3000/api/products`;
let resultApi = [];

/**
 * Premier appel a notre API + execution creationProduit
 */
function callApi() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultApi = data;
      createProduct(resultApi);
    })
    .catch((error) => {
      alert('Fetch a rencontré un problème : ' + error.message);
    });
}
callApi();

/**
 * Création de la page d'acceuille via la reponse
 * de notre API
 * @param {Array} arr
 */
function createProduct(arr) {
  for (let i = 0; i < arr.length; i++) {
    const link = document.createElement('a');
    const article = document.createElement('article');
    const image = document.createElement('img');
    const productName = document.createElement('h3');
    const productDescription = document.createElement('p');

    link.href = './product.html?id=' + arr[i]._id;
    image.src = arr[i].imageUrl;
    image.alt = arr[i].altTxt;
    productName.innerText = arr[i].name;
    productDescription.innerText = arr[i].description;

    items.appendChild(link);
    article.appendChild(image);
    article.appendChild(productName);
    article.appendChild(productDescription);
    link.appendChild(article);
  }
}
