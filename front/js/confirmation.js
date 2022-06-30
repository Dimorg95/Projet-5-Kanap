//Recuperer l'orderId mis dans les parametre d'url et l'afficher sur la page !
function confirmationCommande() {
  const urlArticle = window.location.href;

  let urlEdit = new URL(urlArticle);

  let search_params = new URLSearchParams(urlEdit.search);

  let orderedId;

  if (search_params.has('id')) {
    orderedId = search_params.get('id');
  }

  let spanId = (document.querySelector('#orderId').textContent = orderedId);
}
localStorage.clear();
confirmationCommande();

/**
 * Au bout de 20sec on reload a la page d'accueil
 */
function reloadPage() {
  window.location.href = 'index.html';
}

setTimeout(reloadPage, 20000);
