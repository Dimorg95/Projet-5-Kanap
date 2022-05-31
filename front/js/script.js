let items = document.querySelector('#items');
let url = `http://localhost:3000/api/products`;
let resultatApi = [];

/**
 * Premier appel a notre API + execution creationProduit
 */
function AppelAPI() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultatApi = data;
      creationProduit(resultatApi);
    })
    .catch((erreur) => {
      alert('Fetch a rencontré un problème : ' + erreur.message);
    });
}
AppelAPI();

/**
 * Création de la page d'acceuille via la reponse
 * de notre API
 * @param {Array} arr
 */
function creationProduit(arr) {
  for (let i = 0; i < arr.length; i++) {
    let lien = document.createElement('a');
    let article = document.createElement('article');
    let image = document.createElement('img');
    let nomProduit = document.createElement('h3');
    let descriptionProduit = document.createElement('p');

    lien.href = './product.html?id=' + arr[i]._id;
    image.src = arr[i].imageUrl;
    image.alt = arr[i].altTxt;
    nomProduit.innerText = arr[i].name;
    descriptionProduit.innerText = arr[i].description;

    items.appendChild(lien);
    article.appendChild(image);
    article.appendChild(nomProduit);
    article.appendChild(descriptionProduit);
    lien.appendChild(article);
  }
}
