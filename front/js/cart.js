//On recupere notre local storage
let addBasket = JSON.parse(localStorage.getItem('product'));

//Recuperation du html
const cartItems = document.getElementById('cart__items');

const totalQuantity = document.getElementById('totalQuantity');

const totalPrice = document.getElementById('totalPrice');

let resultCall = [];
let inputTable;

let priceTable = [];
let priceTotal;
addCart(addBasket);
//REQUETE FETCH
async function callData(arr, index) {
  await fetch(`http://localhost:3000/api/products/${arr[index].productId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultCall.push(data);

      function miseEnPlaceTest() {
        const search = resultCall.find(
          (element) => element._id == arr[index].productId
        );

        if (search) {
          //Ajout de l'image
          let image = document.querySelectorAll('.cart__item__img img');
          image[index].src = resultCall[index].imageUrl;
          image[index].alt = resultCall[index].altTxt;
          //ajout du nom
          let name = document.querySelectorAll(
            '.cart__item__content__description h2'
          );
          name[index].textContent = resultCall[index].name;
          //ajout du prix test
          let containeurPrice = document.querySelectorAll(
            '.cart__item__content__description '
          );
          let lastChildPrice = containeurPrice[index].lastChild;

          lastChildPrice.textContent = resultCall[index].price + ' €';
        }
      }
      //calcule du prix
      miseEnPlaceTest();
      function newCalculatePrice() {
        priceTable.push(
          resultCall[index].price * addBasket[index].productQuantity
        );

        const reducerPrice = (accumulator, currentValue) =>
          accumulator + currentValue;
        priceTotal = priceTable.reduce(reducerPrice);

        totalPrice.textContent = priceTotal;
      }
      newCalculatePrice();

      deleteArticle();
      changeQuantity();

      return true;
    })
    .catch((error) => {
      alert('Fetch a rencontré un problème : ' + error.message);
      return false;
    });
}
for (index = 0; index < addBasket.length; index++) {
  callData(addBasket, index);
}

//Creation du Html
/**
 * Mise en place des élements contenu dans le Local Storage sur la page HTML
 * @param {Array} arr
 */

function addCart(arr) {
  for (let i = 0; i < arr.length; i++) {
    //Creation du contenue HTML
    const cartItems = document.getElementById('cart__items');
    const article = document.createElement('article');
    article.setAttribute('data-id', arr[i].productId);
    article.setAttribute('data-color', arr[i].productColor);
    const divImg = document.createElement('div');
    const image = document.createElement('img');
    const divContained = document.createElement('div');
    const divDescription = document.createElement('div');
    const name = document.createElement('h2');
    const color = document.createElement('p');
    const price = document.createElement('p');
    const divParameter = document.createElement('div');
    const divQuantity = document.createElement('div');
    const quantity = document.createElement('p');
    const input = document.createElement('input');
    input.type = 'number';
    input.name = 'itemQuantity';
    input.min = '1';
    input.max = '100';
    input.value = arr[i].productQuantity;
    const divSuppression = document.createElement('div');
    const buttonDelete = document.createElement('p');

    //ajout du contenu dans les elements

    color.textContent = arr[i].productColor;

    quantity.textContent = 'Qté : ' + arr[i].productQuantity;
    buttonDelete.textContent = 'Supprimer';

    //ajout des classes
    article.classList.add('cart__item');
    divImg.classList.add('cart__item__img');
    divContained.classList.add('cart__item__content');
    divDescription.classList.add('cart__item__content__description');
    divParameter.classList.add('cart__item__content__settings');
    divQuantity.classList.add('cart__item__content_settings_quantity');
    input.classList.add('itemQuantity');
    divSuppression.classList.add('cart__item__content__settings__delete');
    buttonDelete.classList.add('deleteItem');

    //Ajout du contenu sur la page
    cartItems.appendChild(article);
    article.appendChild(divImg);
    divImg.appendChild(image);
    article.appendChild(divContained);
    divContained.appendChild(divDescription);
    divDescription.appendChild(name);
    divDescription.appendChild(color);
    divDescription.appendChild(price);
    divContained.appendChild(divParameter);
    divParameter.appendChild(divQuantity);
    divQuantity.appendChild(quantity);
    divQuantity.appendChild(input);
    divContained.appendChild(divSuppression);
    divSuppression.appendChild(buttonDelete);

    calculateTotalQuantity();
  }
}
priceTable = [];
priceTotal = 0;
/**
 * Suppression des produit au clique sur le Bouton Supprimer
 */
function deleteArticle() {
  let btnSupression = Array.from(document.querySelectorAll('.deleteItem'));

  for (let i = 0; i < btnSupression.length; i++) {
    btnSupression[i].addEventListener('click', (e) => {
      e.preventDefault();

      const idToDelete = btnSupression[i].closest('article').dataset.id;

      const colorToDelete = btnSupression[i].closest('article').dataset.color;

      //Filtrer addBasket pour isolé  l'article avec la meme id et la meme couleur
      addBasket = addBasket.filter(
        (e) => e.productId !== idToDelete || e.productColor !== colorToDelete
      );
      let productDelete = btnSupression[i].closest('article');

      localStorage.setItem('product', JSON.stringify(addBasket));

      productDelete.remove();

      // alert('Ce produit a été supprimer');
      //On reset le EventListener 'change' pour que les quantitées continue de ce mettre a jour
      for (let i = 0; i < inputTable.length; i++) {
        inputTable[i].removeEventListener('change', (e) => {});
      }
      //On reset le tableau des inputs des quantitées
      inputTable = Array.from(document.querySelectorAll('.itemQuantity')); //test
      window.location.reload();

      deleteBasketEmpty();
    });
  }
}
/**
 * Si on supprime tout les article du panier, on supprime le local storage et on renvoie notre utilisateur sur la page d'acceuil
 */
function deleteBasketEmpty() {
  if (Object.keys(addBasket).length === 0) {
    localStorage.clear();
    totalPrice.textContent = '';
    totalQuantity.textContent = '';
    if (
      window.confirm(
        `Vous n'avez plus d'article dans votre panier ! Cliquez sur OK pour retourner sur la page d'accueil et continuez vos achats!`
      )
    ) {
      window.location.href = 'index.html';
    }
  } else {
    calculateTotalQuantity();
  }
}
/**
 * Modification des quantité avec l'input qui change
 */
function changeQuantity() {
  inputTable = Array.from(document.querySelectorAll('.itemQuantity')); //test

  for (let i = 0; i < inputTable.length; i++) {
    inputTable[i].addEventListener('change', (e) => {
      e.preventDefault();

      if (inputTable[i].value > 0 && inputTable[i].value <= 100) {
        let changeArticle = inputTable[i].closest('article').dataset.id;

        let changeColor = inputTable[i].closest('article').dataset.color;

        let textQuantity = inputTable[i].previousElementSibling;

        //Si l'ID de l'article a modifier est égale a un id dans ajoutPanier*

        if (
          changeArticle === addBasket[i].productId ||
          changeColor === addBasket[i].productColor
        ) {
          addBasket[i].productQuantity = parseInt(inputTable[i].value);
          localStorage.setItem('product', JSON.stringify(addBasket));
          textQuantity.innerText = 'Qté : ' + addBasket[i].productQuantity;
          window.location.reload();

          calculateTotalQuantity();
        }
      } else {
        alert(
          'Vous ne pouvez pas mettre de quantité négative, veillez a bien avoir une quantité entre 1 et 100'
        );
        inputTable[i].value = addBasket[i].productQuantity;
      }
    });
  }
}

/**
 * Calcule de la quantité total du panier
 */
function calculateTotalQuantity() {
  let quantityCalculate = [];

  for (let i = 0; i < addBasket.length; i++) {
    let quantityTotalBasket = addBasket[i].productQuantity;
    quantityCalculate.push(quantityTotalBasket);
  }
  //Accumule les different prix jusqu'a n'avoir qu'une valeur(la quantité total)
  const reducerQuantity = (accumulator, currentValue) =>
    accumulator + currentValue;
  const quantityTotal = quantityCalculate.reduce(reducerQuantity);

  totalQuantity.textContent = quantityTotal;
}

//-------FORMULAIRE

//Récupération des champs de texte du formulaire

const firstNameClient = document.querySelector('#firstName');
const firstNameError = document.querySelector('#firstNameErrorMsg');

const lastNameClient = document.querySelector('#lastName');
const lastNameError = document.querySelector('#lastNameErrorMsg');

const addressClient = document.querySelector('#address');
const addressError = document.querySelector('#addressErrorMsg');

const cityClient = document.querySelector('#city');
const cityError = document.querySelector('#cityErrorMsg');

const emailClient = document.querySelector('#email');
const emailError = document.querySelector('#emailErrorMsg');

const btnValidation = document.querySelector('#order');

//On ecoute le bouton
btnValidation.addEventListener('click', (e) => {
  e.preventDefault();

  let tableContact = {
    firstName: firstNameClient.value,
    lastName: lastNameClient.value,
    address: addressClient.value,
    city: cityClient.value,
    email: emailClient.value,
  };

  /**
   * Si notre formulaire est valide on l'enregistre dans le Local Storage
   * On crée un tableau avec nos ID des produit du panier
   * On crée un tableau contenant notre tableau d'ID et notre tableau Contact
   */
  if (
    controleFirstName() &&
    controleLastName() &&
    controleAddress() &&
    controleCity() &&
    controleEmail()
  ) {
    localStorage.setItem('contact', JSON.stringify(tableContact));

    let tableId = [];

    for (let i = 0; i < addBasket.length; i++) {
      tableId.push(addBasket[i].productId);
    }

    let tableToSend = {
      contact: tableContact,
      products: tableId,
    };

    sendToServer(tableToSend);
  } else {
    alert('Veuillez bien remplir les champs du formulaire');
  }
});

//Verification des données rentrées par l'utilisateur
//Regex pour le nom et prenom
const regexLastFirstName = (value) => {
  return /^[A-Z][A-Za-z -]{2,20}$/.test(value);
};
//PRENOM
function controleFirstName() {
  if (regexLastFirstName(firstNameClient.value)) {
    firstNameError.textContent = '';
    return true;
  } else {
    firstNameError.textContent =
      'Majuscule, minuscule, pas de chiffre et doit contenir 3 lettres minimum';
    return false;
  }
}
//NOM
function controleLastName() {
  if (regexLastFirstName(lastNameClient.value)) {
    lastNameError.textContent = '';
    return true;
  } else {
    lastNameError.textContent =
      'Majuscule, minuscule, pas de chiffre et doit contenir 3 lettres minimum';
  }
}
//ADRESSE
function controleAddress() {
  if (/^[a-zA-Z0-9\s,.'-]{3,}$/.test(addressClient.value)) {
    addressError.textContent = '';
    return true;
  } else {
    addressError.textContent =
      'Veuillez écrire une adresse valide comme : 12 rue du Tartanpion bat.1 le Tartanpion';
    return false;
  }
}
//VILLE
function controleCity() {
  if (/^[A-Z][a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(cityClient.value)) {
    cityError.textContent = '';
    return true;
  } else {
    cityError.textContent =
      'Veuillez écrire une ville valide : Ville, Vil-le, Vil le';
    return false;
  }
}
function controleEmail() {
  if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(emailClient.value)) {
    emailError.textContent = '';
    return true;
  } else {
    emailError.textContent = 'Ecrivez un mail valide: tartanpion@hotmail.com';
    return false;
  }
}

/**
 * Requète POST a l'API :
 * On envoie notre tableauEnvoyer a l'API
 * Et elle retourne un ID de commande
 * @param {Array} tableToSend
 */
function sendToServer(tableToSend) {
  const promiseTest = fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    body: JSON.stringify(tableToSend),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let confirmationUrl = './confirmation.html?id=' + data.orderId;
      window.location.href = confirmationUrl;
    })
    .catch((error) => {
      alert('Fetch a rencontré un problème : ' + error.message);
    });
}
