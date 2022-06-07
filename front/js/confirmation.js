function confirmationCommande() {
  let orderId = localStorage.getItem('orderId');
  let spanId = (document.querySelector('#orderId').textContent = orderId);
  localStorage.clear();
}

confirmationCommande();
function rechargmentPage() {
  window.location.href = 'index.html';
}

setTimeout(rechargmentPage, 30000);
