//On recupere notre local storage
let ajoutPanier = JSON.parse(localStorage.getItem('produit'));

//Recuperation du html
let cartItems = document.getElementById('cart__items');

let totalQuantity = document.getElementById('totalQuantity');

let totalPrice = document.getElementById('totalPrice');

//Si notre panier est dans le Local storage on execute le code
if (ajoutPanier) {
  ajoutCarte(ajoutPanier);
} else {
  console.log('Aucun produit dans le local storage');
}

//Creation du Html
/**
 * Mise en place des élements contenu dans le Local Storage sur la page HTML
 * @param {Array} arr
 */
function ajoutCarte(arr) {
  for (i = 0; i < arr.length; i++) {
    //Creation du contenue HTML
    let cartItems = document.getElementById('cart__items');
    let article = document.createElement('article');
    article.setAttribute('data-id', arr[i].produitId);
    article.setAttribute('data-color', arr[i].couleurProduit);
    let divImg = document.createElement('div');
    let image = document.createElement('img');
    let divContenue = document.createElement('div');
    let divDescription = document.createElement('div');
    let nom = document.createElement('h2');
    let couleur = document.createElement('p');
    let prix = document.createElement('p');
    let divParametre = document.createElement('div');
    let divQuantite = document.createElement('div');
    let quantiter = document.createElement('p');
    var input = document.createElement('input');
    input.type = 'number';
    input.name = 'itemQuantity';
    input.min = '1';
    input.max = '100';
    input.value = arr[i].quantiteProduit;
    let divSuppression = document.createElement('div');
    let supprimer = document.createElement('p');

    //ajout du contenu dans les elements
    image.src = arr[i].photoProduit;
    image.alt = arr[i].altPhoto;
    nom.textContent = arr[i].nomProduit;
    couleur.textContent = arr[i].couleurProduit;
    prix.textContent = arr[i].prixProduit + ' €';
    quantiter.textContent = 'Qté : ' + arr[i].quantiteProduit;
    supprimer.textContent = 'Supprimer';

    //ajout des classes
    article.classList.add('cart__item');
    divImg.classList.add('cart__item__img');
    divContenue.classList.add('cart__item__content');
    divDescription.classList.add('cart__item__content__description');
    divParametre.classList.add('cart__item__content__settings');
    divQuantite.classList.add('cart__item__content_settings_quantity');
    input.classList.add('itemQuantity');
    divSuppression.classList.add('cart__item__content__settings__delete');
    supprimer.classList.add('deleteItem');

    //Ajout du contenu sur la page
    cartItems.appendChild(article);
    article.appendChild(divImg);
    divImg.appendChild(image);
    article.appendChild(divContenue);
    divContenue.appendChild(divDescription);
    divDescription.appendChild(nom);
    divDescription.appendChild(couleur);
    divDescription.appendChild(prix);
    divContenue.appendChild(divParametre);
    divParametre.appendChild(divQuantite);
    divQuantite.appendChild(quantiter);
    divQuantite.appendChild(input);
    divContenue.appendChild(divSuppression);
    divSuppression.appendChild(supprimer);

    calculDuPrix();
    calculQuantitéTotal();
  }
}

/**
 * Modification des quantité avec l'input qui change
 */
function modifierQuantite() {
  let inputTableau = Array.from(document.querySelectorAll('.itemQuantity'));

  for (let i = 0; i < inputTableau.length; i++) {
    inputTableau[i].addEventListener('change', (e) => {
      e.preventDefault();

      let articleModifier = inputTableau[i].closest('article').dataset.id;

      let texteQuantite = inputTableau[i].previousElementSibling;

      //Si l'ID de l'article a modifier est égale a un id dans ajoutPanier
      if (articleModifier === ajoutPanier[i].produitId) {
        ajoutPanier[i].quantiteProduit = parseInt(inputTableau[i].value);
        localStorage.setItem('produit', JSON.stringify(ajoutPanier));
        texteQuantite.innerText = 'Qté : ' + ajoutPanier[i].quantiteProduit;
        calculDuPrix();
        calculQuantitéTotal();
      }
    });
  }
}
modifierQuantite();

/**
 * Suppression des produit au clique sur le Bouton Supprimer
 */
function supprimerArticle() {
  let btnSupression = Array.from(document.querySelectorAll('.deleteItem'));

  for (let i = 0; i < btnSupression.length; i++) {
    btnSupression[i].addEventListener('click', (e) => {
      e.preventDefault();

      let idASupprimer = btnSupression[i].closest('article').dataset.id;

      let couleurASupprimer = btnSupression[i].closest('article').dataset.color;

      //Filtrer ajoutPanier pour isolé  l'article avec la meme id et la meme couleur
      ajoutPanier = ajoutPanier.filter(
        (e) =>
          e.produitId !== idASupprimer || e.couleurProduit !== couleurASupprimer
      );

      localStorage.setItem('produit', JSON.stringify(ajoutPanier));
      alert('Ce produit a été supprimer');
      window.location.href = 'cart.html';
    });
  }
}
supprimerArticle();

/**
 * Calcule du prix total du panier
 */
function calculDuPrix() {
  let prixTotalCalcul = [];
  for (let i = 0; i < ajoutPanier.length; i++) {
    let prixTotalPanier =
      ajoutPanier[i].prixProduit * ajoutPanier[i].quantiteProduit;
    prixTotalCalcul.push(prixTotalPanier);
  }
  const reducerPrix = (accumulator, currentValue) => accumulator + currentValue;
  const prixTotal = prixTotalCalcul.reduce(reducerPrix);

  totalPrice.textContent = prixTotal;
}

/**
 * Calcule de la quantité total du panier
 */
function calculQuantitéTotal() {
  let quantiteTotalCalcul = [];

  for (let i = 0; i < ajoutPanier.length; i++) {
    let quantiteTotalPanier = ajoutPanier[i].quantiteProduit;
    quantiteTotalCalcul.push(quantiteTotalPanier);
  }
  const reducerQuantite = (accumulator, currentValue) =>
    accumulator + currentValue;
  const quantiteTotal = quantiteTotalCalcul.reduce(reducerQuantite);

  totalQuantity.textContent = quantiteTotal;
}

//-------FORMULAIRE

//Récupération des champs de texte du formulaire

let prenomClient = document.querySelector('#firstName');
let erreurPrenom = document.querySelector('#firstNameErrorMsg');

let nomClient = document.querySelector('#lastName');
let erreurClient = document.querySelector('#lastNameErrorMsg');

let adresseClient = document.querySelector('#address');
let adresseErreur = document.querySelector('#addressErrorMsg');

let villeClient = document.querySelector('#city');
let villeErreur = document.querySelector('#cityErrorMsg');

let emailClient = document.querySelector('#email');
let emailErreur = document.querySelector('#emailErrorMsg');

let btnValidation = document.querySelector('#order');

//On ecoute le bouton
btnValidation.addEventListener('click', (e) => {
  e.preventDefault();

  let tableauContact = {
    firstName: prenomClient.value,
    lastName: nomClient.value,
    address: adresseClient.value,
    city: villeClient.value,
    email: emailClient.value,
  };
  //Verification des données rentrées par l'utilisateur
  const regexPrenomNom = (value) => {
    return /^[A-Z][A-Za-z -]{2,20}$/.test(value);
  };
  //PRENOM
  function controlePrenom() {
    if (regexPrenomNom(prenomClient.value)) {
      erreurPrenom.textContent = '';
      return true;
    } else {
      erreurPrenom.textContent =
        'Majuscule, minuscule, pas de chiffre et doit contenir 3 lettres minimum';
      return false;
    }
  }
  //NOM
  function controleNom() {
    if (regexPrenomNom(nomClient.value)) {
      erreurClient.textContent = '';
      return true;
    } else {
      erreurClient.textContent =
        'Majuscule, minuscule, pas de chiffre et doit contenir 3 lettres minimum';
    }
  }
  //ADRESSE
  function controleAdresse() {
    if (/^[a-zA-Z0-9\s,.'-]{3,}$/.test(adresseClient.value)) {
      adresseErreur.textContent = '';
      return true;
    } else {
      adresseErreur.textContent =
        'Veuillez écrire une adresse valide comme : 12 rue du Tartanpion bat.1 le Tartanpion';
      return false;
    }
  }
  //VILLE
  function controleVille() {
    if (/^[A-Z][a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(villeClient.value)) {
      villeErreur.textContent = '';
      return true;
    } else {
      villeErreur.textContent =
        'Veuillez écrire une ville valide : Ville, Vil-le, Vil le';
      return false;
    }
  }
  //EMAIL
  function controleEmail() {
    if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(emailClient.value)) {
      emailErreur.textContent = '';
      return true;
    } else {
      emailErreur.textContent =
        'Ecrivez un mail valide: tartanpion@hotmail.com';
      return false;
    }
  }

  /**
   * Si notre formulaire est valide on l'enregistre dans le Local Storage
   * On crée un tableau avec nos ID des produit du panier
   * On crée un tableau contenant notre tableau d'ID et notre tableau Contact
   */
  if (
    controlePrenom() &&
    controleNom() &&
    controleAdresse() &&
    controleVille() &&
    controleEmail()
  ) {
    localStorage.setItem('contact', JSON.stringify(tableauContact));

    let tableauId = [];

    for (let i = 0; i < ajoutPanier.length; i++) {
      tableauId.push(ajoutPanier[i].produitId);
    }

    let tableauEnvoyer = {
      contact: tableauContact,
      products: tableauId,
    };

    envoieVersServeur(tableauEnvoyer);
  } else {
    alert('Veuillez bien remplir les champs du formulaire');
  }
});

/**
 * Requète POST a l'API :
 * On envoie notre tableauEnvoyer a l'API
 * Et elle retourne un ID de commande
 * @param {Array} tableauEnvoyer
 */
function envoieVersServeur(tableauEnvoyer) {
  const promiseTest = fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    body: JSON.stringify(tableauEnvoyer),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('orderId', data.orderId);
      window.location.href = 'confirmation.html';
    })
    .catch((erreur) => {
      alert('Fetch a rencontré un problème : ' + erreur.message);
    });
}
