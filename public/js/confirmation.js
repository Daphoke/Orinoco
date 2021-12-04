/// Récupération de l'id de la commande + all order's information

let contact = JSON.parse(localStorage.getItem("contact"));
let orderId = JSON.parse(localStorage.getItem("idCommande"));

container5 = document.getElementById("confirmation_order_id");
container6 =document.getElementById("confirmation_total_price");

/// Récupération du prix total.
let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

/// Affichage HTML
const confirmationOrderId = document.createElement("p");
container5.appendChild(confirmationOrderId);
confirmationOrderId.classList.add("p-style");
confirmationOrderId.textContent = orderId;

const confirmationPriceId = document.createElement("p");
container6.appendChild(confirmationPriceId);
confirmationPriceId.classList.add("p-style");
confirmationPriceId.textContent = totalPrice + ",00 €";

/// Efface le localStorage
localStorage.clear();