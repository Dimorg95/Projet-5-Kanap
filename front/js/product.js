//Recuperation de L'Id dans l'url du produit cliquer

const urlArticle = window.location.href;

let urlEdit = new URL(urlArticle);

let search_params = new URLSearchParams(urlEdit.search);

let articleId;

if (search_params.has('id')) {
  articleId = search_params.get('id');
}

let resultArticle = [];

/**
 * Requete API de l'article cliquer sur la page d'acceuille
 */
function callArticle() {
  fetch(`http://localhost:3000/api/products/${articleId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultArticle = data;
      clickProduct(resultArticle);
      addBasket(resultArticle);
    })
    .catch((error) => {
      alert('Fetch a rencontré un problème : ' + error.message);
    });
}

callArticle();

//On recuperer les éléments HTML

const itemImg = document.querySelector('.item__img');
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const description = document.querySelector('#description');
const selectColor = document.querySelector('#colors');
const quantity = document.querySelector('#quantity');

/**
 * Création de la page produit avec la reponse de notre API
 * @param {Array} arr
 */
function clickProduct(arr) {
  //image
  let image = document.createElement('img');
  image.src = arr.imageUrl;
  image.alt = arr.altTxt;
  itemImg.appendChild(image);

  //titre
  title.textContent = arr.name;

  //prix
  price.textContent = arr.price;

  //description
  description.textContent = arr.description;

  //Création des différentes options de couleurs
  for (const color of arr.colors) {
    const option = document.createElement('option');
    option.value = color;
    option.textContent = color;
    selectColor.appendChild(option);
  }
}

/**
 * Ajout au panier : Ajout et modification des produits à ajouter dans le panier
 * (dans le Local Storage)
 */
function addBasket() {
  const button = document.querySelector('#addToCart');

  //On ecoute le click du bouton ajout au panier
  button.addEventListener('click', (e) => {
    //Si la quantité selectionner est compris entre 1 et 100 et que la couleur est selectionner

    if (
      quantity.value > 0 &&
      quantity.value <= 100 &&
      selectColor.value !== ''
    ) {
      let colorChoice = selectColor.value;

      let quantityChoice = quantity.value;

      //On crée le tableau qui va recuperer nos donnée
      let tableProduct = {
        productId: articleId,
        productColor: colorChoice,
        productQuantity: parseInt(quantityChoice),
        productPrice: resultArticle.price,
        productName: resultArticle.name,
        productImage: resultArticle.imageUrl,
        altImage: resultArticle.altTxt,
      };

      let productStorage = JSON.parse(localStorage.getItem('product'));

      //si produit storage est true alors on cherche dans produit storage
      if (productStorage) {
        let search = productStorage.find(
          (e) => e.productId === articleId && e.productColor === colorChoice
        );

        //Si notre tableau et notre local storage on  la meme id et la meme couleur ++quantité
        if (search) {
          let newQuantity =
            parseInt(tableProduct.productQuantity) +
            parseInt(search.productQuantity);
          search.productQuantity = newQuantity;
          localStorage.setItem('product', JSON.stringify(productStorage));
          confirmation(quantityChoice, colorChoice, resultArticle);

          //Sinon on push un nouveau produit (id ou couleur differente)
        } else {
          productStorage.push(tableProduct);
          localStorage.setItem('product', JSON.stringify(productStorage));
          confirmation(quantityChoice, colorChoice, resultArticle);
        }

        //Si il n'est pas true  on push le premier article de notre produit storage
      } else {
        productStorage = [];
        productStorage.push(tableProduct);
        localStorage.setItem('product', JSON.stringify(productStorage));
        confirmation(quantityChoice, colorChoice, resultArticle);
      }
      //Sinon pop up d'alerte
    } else {
      alert(
        "Vous n'avez pas sélectionné de couleur ou indiquer un nombre d'articles entre 1 et 100"
      );
    }
  });
}

/**
 * Pop Up de confirmation d'ajout au panier
 * @param {*} quantityChoice la quantité choisie par l'utilisateur
 * @param {*} colorChoice la couleur choisie par l'utilisateur
 * @param {*} resultArticle Le nom du produit selectionner
 */
function confirmation(quantityChoice, colorChoice, resultArticle) {
  if (
    window.confirm(
      `Votre commande de ${quantityChoice}  ${resultArticle.name} en ${colorChoice} est ajouté au panier. Cliquez sur OK pour consulter le panier`
    )
  ) {
    window.location.href = 'cart.html';
  }
}
