/**
 * Recuperation de l'order Id et mise en place sur la page,on supprime tout le Local Storage
 */
function confirmationCommande() {
  let orderId = localStorage.getItem('orderId');
  let spanId = (document.querySelector('#orderId').textContent = orderId);
  localStorage.clear();
}

confirmationCommande();

/**
 * Au bout de 20sec on reload a la page d'accueil
 */
function reloadPage() {
  window.location.href = 'index.html';
}

setTimeout(reloadPage, 20000);
