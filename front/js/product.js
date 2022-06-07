//Recuperation de L'Id dans l'url du produit cliquer

let urlArticle = window.location.href;

let urlModifier = new URL(urlArticle);

let search_params = new URLSearchParams(urlModifier.search);

if (search_params.has('id')) {
  var articleId = search_params.get('id');
}

let resultatArticle = [];

/**
 * Requete API de l'article cliquer sur la page d'acceuille
 */
function AppelArticle() {
  fetch(`http://localhost:3000/api/products/${articleId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultatArticle = data;
      produitCliquer(resultatArticle);
      ajoutPanier(resultatArticle);
    })
    .catch((erreur) => {
      alert('Fetch a rencontré un problème : ' + erreur.message);
    });
}

AppelArticle();

//On recuperer les éléments HTML

let itemImg = document.querySelector('.item__img');
let titre = document.querySelector('#title');
let prix = document.querySelector('#price');
let description = document.querySelector('#description');
let selectCouleur = document.querySelector('#colors');
let quantiter = document.querySelector('#quantity');

/**
 * Création de la page produit avec la reponse de notre API
 * @param {Array} arr
 */
function produitCliquer(arr) {
  //image
  let image = document.createElement('img');
  image.src = arr.imageUrl;
  image.alt = arr.altTxt;
  itemImg.appendChild(image);

  //titre
  titre.textContent = arr.name;

  //prix
  prix.textContent = arr.price;

  //description
  description.textContent = arr.description;

  //Création des différentes options de couleurs
  for (const color of arr.colors) {
    let option = document.createElement('option');
    option.value = color;
    option.textContent = color;
    selectCouleur.appendChild(option);
  }
}

/**
 * Ajout au panier : Ajout et modification des produits à ajouter dans le panier
 * (dans le Local Storage)
 */
function ajoutPanier() {
  const bouton = document.querySelector('#addToCart');

  //On ecoute le click du bouton ajout au panier
  bouton.addEventListener('click', (e) => {
    //Si la quantité selectionner est compris entre 1 et 100 et que la couleur est selectionner
    if (
      quantiter.value > 0 &&
      quantiter.value <= 100 &&
      selectCouleur.value != 0
    ) {
      let choixCouleur = selectCouleur.value;

      let choixQuantite = quantiter.value;

      //On crée le tableau qui va recuperer nos donnée
      let tableauProduit = {
        produitId: articleId,
        couleurProduit: choixCouleur,
        quantiteProduit: parseInt(choixQuantite),
        prixProduit: resultatArticle.price,
        nomProduit: resultatArticle.name,
        photoProduit: resultatArticle.imageUrl,
        altPhoto: resultatArticle.altTxt,
      };

      let produitStorage = JSON.parse(localStorage.getItem('produit'));

      //si produit storage est true alors on cherche dans produit storage
      if (produitStorage) {
        let recherche = produitStorage.find(
          (e) => e.produitId === articleId && e.couleurProduit === choixCouleur
        );

        //Si notre tableau et notre local storage on  la meme id et la meme couleur ++quantité
        if (recherche) {
          let nvlQuantité =
            parseInt(tableauProduit.quantiteProduit) +
            parseInt(recherche.quantiteProduit);
          recherche.quantiteProduit = nvlQuantité;
          localStorage.setItem('produit', JSON.stringify(produitStorage));
          confirmation(choixQuantite, choixCouleur, resultatArticle);

          //Sinon on push un nouveau produit (id ou couleur differente)
        } else {
          produitStorage.push(tableauProduit);
          localStorage.setItem('produit', JSON.stringify(produitStorage));
          confirmation(choixQuantite, choixCouleur, resultatArticle);
        }

        //Si il n'est pas true  on push le premier article de notre produit storage
      } else {
        produitStorage = [];
        produitStorage.push(tableauProduit);
        localStorage.setItem('produit', JSON.stringify(produitStorage));
        confirmation(choixQuantite, choixCouleur, resultatArticle);
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
 * @param {*} choixQuantite la quantité choisie par l'utilisateur
 * @param {*} choixCouleur la couleur choisie par l'utilisateur
 * @param {*} resultatArticle Le nom du produit selectionner
 */
function confirmation(choixQuantite, choixCouleur, resultatArticle) {
  if (
    window.confirm(
      `Votre commande de ${choixQuantite}  ${resultatArticle.name} en ${choixCouleur} est ajouté au panier. Cliquez sur OK pour consulter le panier`
    )
  ) {
    window.location.href = 'cart.html';
  }
}
