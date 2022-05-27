function confirmationCommande() {
  let orderId = localStorage.getItem('orderId');
  let spanId = (document.querySelector('#orderId').textContent = orderId);
  localStorage.clear();
}

confirmationCommande();
