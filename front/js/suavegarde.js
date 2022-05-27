//----------------------------PREMIERE METHODE-----------------------------------
//Recuperation donnée a envoyer au panier
const ajoutPanier = () => {
  let bouton = document.querySelector('#addToCart');
  //STOP RETOUR CTRL Z
  bouton.addEventListener('click', () => {
    if (quantiter.value > 0 && quantiter.value <= 100 && quantiter != 0) {
      //On rajoute dans notre tableau resultat Article couleur et quantité
      const rajoutCouleurQuantité = Object.assign({}, resultatArticle, {
        couleur: `${selectCouleur.value}`,
        quantite: `${quantiter.value}`,
      });

      let produitTableau = JSON.parse(localStorage.getItem('produit'));

      //Fonction de confirmation
      function confirmation() {
        if (
          window.confirm(
            `Votre commande de ${quantiter.value}  ${produitTableau[0].name} en ${selectCouleur.value} est ajouté au panier. cliquez sur OK pour consulter le panier`
          )
        ) {
          window.location.href = 'cart.html';
        }
      }

      if (produitTableau === null) {
        produitTableau = [];
        produitTableau.push(rajoutCouleurQuantité);
        console.log(produitTableau);
        console.log('premier element');
        localStorage.setItem('produit', JSON.stringify(produitTableau));
        //  confirmation();
      } else if (produitTableau !== null) {
        for (i = 0; i < produitTableau.length; i++) {
          console.log('test');
          if (
            produitTableau[i]._id === resultatArticle._id &&
            produitTableau[i].couleur === selectCouleur.value
          ) {
            let nouvelleQuantite =
              parseInt(produitTableau[i].quantite) + parseInt(quantiter.value);
            produitTableau[i].quantite = nouvelleQuantite;

            localStorage.setItem('produit', JSON.stringify(produitTableau));
            produitTableau = JSON.parse(localStorage.getItem('produit'));
            console.log('nouvelle quantité');
            //  confirmation();
          }
        }
      } //DERNIER RETOUR
      for (i = 0; i < produitTableau.length; i++) {
        if (
          (produitTableau[i]._id === resultatArticle._id &&
            produitTableau[i].couleur !== selectCouleur.value) ||
          produitTableau[i]._id !== resultatArticle._id
        ) {
          return (
            produitTableau.push(rajoutCouleurQuantité),
            localStorage.setItem('produit', JSON.stringify(produitTableau)),
            (produitTableau = JSON.parse(localStorage.getItem('produit'))),
            //  confirmation(),
            console.log('nouvelle article'),
            console.log(produitTableau)
          );
        }
      }
    }
  });
  return (produitTableau = JSON.parse(localStorage.getItem('produit')));
};

/////////////////////DEUXIEME METHODE
// function ajoutPanier(resultatArticle) {
//   const bouton = document.querySelector('#addToCart');

//   bouton.addEventListener('click', (e) => {
//     if (quantiter.value > 0 && quantiter.value <= 100 && quantiter != 0) {
//       let choixCouleur = selectCouleur.value;

//       let choixQuantite = quantiter.value;

//       let tableauProduit = {
//         produitId: articleId,
//         couleurProduit: choixCouleur,
//         quantiteProduit: choixQuantite,
//         prixProduit: resultatArticle.price,
//         nomProduit: resultatArticle.name,
//         descriptionProduit: resultatArticle.description,
//         imageProduit: resultatArticle.imageUrl,
//         altImage: resultatArticle.altTxt,
//       };
//       console.log(tableauProduit);

//       let produitStorage = JSON.parse(localStorage.getItem('produit'));

//       function confirmation() {
//         if (
//           window.confirm(
//             `Votre commande de ${choixQuantite}  ${resultatArticle.name} en ${choixCouleur} est ajouté au panier. cliquez sur OK pour consulter le panier`
//           )
//         ) {
//           window.location.href = 'cart.html';
//         }
//       }

//       if (produitStorage) {
//         const resultatTrouver = produitStorage.find(
//           (e) => e.produitId === articleId && e.couleurProduit === choixCouleur
//         );

//         if (resultatTrouver) {
//           let nouvelleQuantité =
//             parseInt(tableauProduit.quantiteProduit) +
//             parseInt(resultatTrouver.quantiteProduit);
//           resultatTrouver.quantiteProduit = nouvelleQuantité;
//           localStorage.setItem('produit', JSON.stringify(produitStorage));

//           console.log(produitStorage);

//           confirmation();
//         } else {
//           produitStorage.push(tableauProduit);
//           localStorage.setItem('produit', JSON.stringify(produitStorage));

//           console.log(produitStorage);

//           confirmation();
//         }
//       } else {
//         produitStorage = [];
//         produitStorage.push(tableauProduit);
//         localStorage.setItem('produit', JSON.stringify(produitStorage));

//         console.log(produitStorage);

//         confirmation();
//       }
//     }
//   });
// }

//-----PAGE PANIER PREMIER METHODE D'AJOUT DE QUANTITER

//Modification des quantité ----------------PREMIERE FACON IN?CREMENTATION DECREMENTATION

// let inputTableau = Array.from(document.querySelectorAll('.itemQuantity'));
// console.log(inputTableau);
// for (let i = 0; i < inputTableau.length; i++) {
//   inputTableau[i].addEventListener('change', (e) => {
//     e.preventDefault();
//     console.log(e);

//     let articleModifier = inputTableau[i].closest('article').dataset.id;
//     console.log(articleModifier);
//     let texteQuantite = inputTableau[i].previousElementSibling;
//     console.log(texteQuantite);

//     //Si valeur de la quantité selectionner est plus grande que a la quantité de l'article dans le local storage
//     if (articleModifier == ajoutPanier[i].produitId) {
//       console.log('Les id corresponde');
//       if (inputTableau[i].value > ajoutPanier[i].quantiteProduit) {
//         ajoutPanier[i].quantiteProduit++;

//         localStorage.setItem('produit', JSON.stringify(ajoutPanier));
//         texteQuantite.innerText = 'Qté : ' + ajoutPanier[i].quantiteProduit;
//         calculDuPrix();
//         calculQuantitéTotal();

//         console.log('Incrementation');
//         console.log(ajoutPanier);
//       } else if (inputTableau[i].value < ajoutPanier[i].quantiteProduit) {
//         ajoutPanier[i].quantiteProduit--;

//         localStorage.setItem('produit', JSON.stringify(ajoutPanier));
//         texteQuantite.innerText = 'Qté : ' + ajoutPanier[i].quantiteProduit;
//         calculDuPrix();
//         calculQuantitéTotal();
//         console.log('Décrementation');
//         console.log(ajoutPanier);
//       }
//     }
//   });
// }

//ADRESSE
// function controleAdresse() {
//   if (/^[a-zA-Z0-9\s,.'-]{3,}$/.test(adresseClient.value)) {
//     adresseErreur.textContent = '';
//     console.log('Suppression message erreur adresse');
//     return true;
//   } else {
//     adresseErreur.textContent = "L'adresse est invalide";
//     return false;
//   }
// }

function controleEmail() {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailClient.value)) {
    emailErreur.textContent = '';
    console.log('Suppression message erreur Email');
    return true;
  } else {
    emailErreur.textContent = 'Ecrivez un mail valide: tartanpion@hotmail.com';
    console.log('email invalide');
    return false;
  }
}

//On preremplis les champ si le client a deja commander chez nous (Fiche contact presente dans local storage)
// const localStorageContact = localStorage.getItem('contact');

// const localStorageContactObj = JSON.parse(localStorageContact);

// console.log('Recuperation objet contact du local storage');
// console.log(localStorageContactObj);

// function remplissageAutomatiqueForm() {
//   if (localStorageContactObj === null) {
//     console.log('Aucun tableau contact dans le local storage');
//   } else {
//     prenomClient.value = localStorageContactObj.firstName;
//     nomClient.value = localStorageContactObj.lastName;
//     adresseClient.value = localStorageContactObj.address;
//     villeClient.value = localStorageContactObj.city;
//     emailClient.value = localStorageContactObj.email;
//   }
// }
// remplissageAutomatiqueForm();
