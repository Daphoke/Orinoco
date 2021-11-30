///// scroll to top /////
// Get the button:
mybutton = document.getElementById("scrollBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 650 ||
    document.documentElement.scrollTop > 650
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
///// Scroll to top /////

/// Déclaration de la variable "productInLocalStorage" contenant les "keys" et "values" du localStorage.
// productsInLocalStorage
let productInLocalStorage = JSON.parse(
  localStorage.getItem("productsInLocalStorageT")
);

/// Sauvegarde dans le localStorage de productsInLocalStorageT, l'image de productInLocalStorage.
// productsInLocalStorageT
localStorage.setItem(
  "productsInLocalStorageT",
  JSON.stringify(productInLocalStorage)
);

/// Initialisation des containers.
// containers
let container0 = document.getElementById("teddy-total-cart");
let container1 = document.getElementById("teddy_row_order_i");
let container2 = document.getElementById("teddy_row_order");
let container3 = document.getElementById("teddy_cart");
let container4 = document.getElementById("client_form");
let containerBtn2 = document.getElementById("teddy_btn_confirm_order");
let containerTotal = document.getElementById("total_price_container");

/////////////// Si il y a un produit dans le panier : afficher les produits présent dans productsInLocalStorage. ///////////////

/// Déclaration de la variable "productsTable" pour stocker les Ids de tous les produits de la commande.
// productsTable
let products = [];

/// Déclaration de la variable "totalPriceArticles" égal au prix total d'une ligne de commande.
// totalPriceArticles
let totalPriceArticles = 0;
/// Déclaration de la variable "totalPrice" égal au prix de l'ensemble des articles sélectionnés.
// totalPrice
let totalPrice = 0;
/// Déclaration de la variable "teddiesOrderQuantity" égal au nombre de l'ensemble des articles sélectionnés.
// teddiesOrderQuantity
let teddiesOrderQuantity = 0;

/// Vérification de la nature du localStorage
if (
  typeof productInLocalStorage != "undefined" &&
  productInLocalStorage != null &&
  productInLocalStorage.length != null &&
  productInLocalStorage.length > 0 &&
  localStorage.getItem("productsInLocalStorageT") !== null
) {
  /// Déclaration de la variable "ligneComande" pour la boucle de création d'une nouvelle ligne de commande d'article.
  // ligneCommande
  let ligneComande = [];

  ////////// Boucle d'incrémentation (totalPriceArticles, totalPrice, teddiesOrderQuantity, ligneCommande, products). //////////
  for (j = 0; j < productInLocalStorage.length; j++) {
    /// Calcul du total pour chaque ligne de commande d'article.
    // totalPriceArticles
    totalPriceArticles =
      productInLocalStorage[j].priceSelectedProduct *
      productInLocalStorage[j].quantitySelectedProduct;

    /// Calcul du total
    // totalPrice
    totalPrice =
      totalPrice +
      productInLocalStorage[j].priceSelectedProduct *
        productInLocalStorage[j].quantitySelectedProduct;

    /// Cacul de la quantité total de produits avec convertion de "productInLocalStorage[j].quantitySelectedProduct" en nombre entier.
    // teddiesOrderQuantity
    teddiesOrderQuantity = parseInt(
      productInLocalStorage[j].quantitySelectedProduct
    );

    /// Boucle de capture des Ids, un nombre "teddiesOrderQuantity de chaque Id "productInLocalStorage[j].idSelectedProduct".
    for (k = 0; k < teddiesOrderQuantity; k++) {
      // products
      products.push(productInLocalStorage[j].idSelectedProduct);
    }

    ///// Incrémentation de la variable "ligneCommande" dont le contenu est une ligne <tr> du tableau de commande. /////
    /// Code HTML itéré d'une ligne de commande.
    // ligneCommande
    ligneComande =
      ligneComande +
      `<tr>
            <td>
                <a href="produit.html?id=${productInLocalStorage[j].idSelectedProduct}">
                    <img class="img-thumbnail" src="${productInLocalStorage[j].imgSelectedProduct}" alt="Vignette produit">
                </a>
            </td>
            <td>
                ${productInLocalStorage[j].nameSelectedProduct} </br> ${productInLocalStorage[j].colorsSelectedProduct}
            </td>
            <td>
                <div class="div_price_xl justify-content-center">
                    <div>
                        ${productInLocalStorage[j].priceSelectedProduct}
                    </div>
                    <div>
                        .00 €
                    </div>
                </div>
            </td>
            <td>
                <div>
                  <input id="teddy_card_detail_Quantity" class="teddy_card_detail_amount form-control text-end my-2 pe-1" min="1" max="100" type="number" value="${productInLocalStorage[j].quantitySelectedProduct}" >
                </div>
            </td>
            <td class="teddy_btn_delete_article">
                <button class="btn_suprimer btn_suprimer_2" title="Suprimer article">
                    <img class="delete-icon" src="./icons/delete-icons.png" alt="Icone poubelle">
                </button>
            </td>
            <td>
                <div id="teddy_cart_price_total_article" class="div-price_cart_total-articles">
                    ${totalPriceArticles},00 €
                </div>
            </td>
        </tr>`;
  }

  /// Définition de la fin de la boucle de création d'une nouvelle ligne de commande d'article.
  if (j == productInLocalStorage.length) {
    /// Ajout de l'élement "ligneComande" Dans le HTML.
    container1.innerHTML = ligneComande;
  }
  ///// Incrémentation de la variable "ligneCommande". / END /////
  ////////// Boucle d'incrémentation (totalPriceArticles, totalPrice, teddiesOrderQuantity, products, ligneCommande). / END //////////

  ///// Tableau Total /////

  /// Création de l'élément "total_price_container" affichant le prix total.
  let elementTotalPrice = document.createElement("div");
  elementTotalPrice.classList.add("d-flex");
  elementTotalPrice.classList.add("justify-content-center");
  containerTotal.appendChild(elementTotalPrice);

  /// Insertion du prix total.
  let teddyTotalPrice = document.createElement("div");
  teddyTotalPrice.innerHTML = totalPrice;
  elementTotalPrice.appendChild(teddyTotalPrice);

  /// Affichage des cents du prix total.
  let teddyTotalPriceCents = document.createElement("div");
  teddyTotalPriceCents.innerHTML = ".00 €";
  elementTotalPrice.appendChild(teddyTotalPriceCents);

  /// Stockage du prix total de la commande dans le localStorage.
  // Totalprice
  localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  ///// Tableau Total / END /////

  ///// Option de modification des quantités de produits du panier /////

  /// Récupération des différent inputs ".teddy_card_detail_amount"
  // quantityInput
  let quantityInput = document.getElementsByClassName(
    "teddy_card_detail_amount"
  );

  /// Boucle "for" de selection de l'input "quantityInput[m]".
  for (let m = 0; m < quantityInput.length; m++) {
    /// Ecoute d'un changement de valeur de "quantityInput[m]"
    quantityInput[m].addEventListener("change", function (event) {
      /// Bloque l'action par défaut du navigateur pour l'événement en cours.
      event.preventDefault();

      /// Récupération de la nouvelle valeur de l'input "quantityInput[m]".
      productInLocalStorage[m].quantitySelectedProduct = quantityInput[m].value;

      /// Sauvegarde du nouveau localStorage "productsInLocalStorageT".
      localStorage.setItem(
        "productsInLocalStorageT",
        JSON.stringify(productInLocalStorage)
      );

      /// Actualisation de la page.
      location.reload();
    });
  }
  ///// Option de modification des quantités de produits du panier / END /////

  ///// Option "delete article" /////

  /// Récupération du bon bouton "delete article".
  // btnDeleteArticle
  let btnDeleteArticle = document.getElementsByClassName(
    "teddy_btn_delete_article"
  );

  ///// Boucle "for" de selection du bouton "btnDeleteArticle[l]". /////
  for (let l = 0; l < btnDeleteArticle.length; l++) {
    btnDeleteArticle[l].addEventListener("click", function (event) {
      /// Bloque l'action par défaut du navigateur pour l'événement en cours.
      event.preventDefault();

      /// Confirmation de suppression.
      if (
        window.confirm(
          "Désirez-vous supprimer cet article? Attention, cette action est irréversible."
        )
      ) {
        /// Suppression de l'objet "a" de productInLocalStorage.
        productInLocalStorage.splice(l, 1);

        /// Sauvegarde du nouveau localStorage "productsInLocalStorageT".
        localStorage.setItem(
          "productsInLocalStorageT",
          JSON.stringify(productInLocalStorage)
        );

        /// Rechargement de la page.
        location.reload();
      }
    });
  }
  ///// Option "delete articles" / END /////

  ///// Option "vider le panier" /////
  let btnDeleteAll = document.getElementById("teddy_btn_delete_all");

  //// Au clic sur le bouton "teddy_btn_delete_all" ////
  btnDeleteAll.addEventListener("click", (event) => {
    if (
      /// Confirmation de suppression.
      window.confirm(
        "Désirez-vous vider votre panier? Attention, cette action est irréversible."
      )
    ) {
      /// Bloque l'action par défaut du navigateur pour l'événement en cours.
      event.preventDefault();

      /// "productInLocalStorage" est alors un tablaeu vide ce qui est équivalent à sa suppression dans le localStorage.
      productInLocalStorage = [];

      /// Sauvegarde de "productInLocalStorage" dans le localStorage sous le nom de productsInLocalStorageT
      localStorage.setItem(
        "productsInLocalStorageT",
        JSON.stringify(productInLocalStorage)
      );
      /// Rechargement de la page.
      location.reload();
    }
  });
  //// Au clic sur le bouton "teddy_btn_delete_all" / END ////
  ///// Option "vider le panier" / END /////

  /////////////// Si il y a un produit dans le panier : afficher les produits présent dans productsInLocalStorage. / END///////////////

  /////////////// Si le panier est vide :  ///////////////
} else {
  /// Création de la variable "panierVide" une div qui affiche "le panier est vide" en remplacement de "#teddy_cart"
  let panierVide = `<div class="no_recap_order mx-auto">
            <p class="mx-auto">Il n'y a aucun produit dans votre panier. Veuillez choisir un produit pour pouvoir effectuer votre commande. Merci. </p>
        </div>`;

  /// Ajout de l'élement "panierVide" Dans le HTML.
  container3.innerHTML = panierVide;

  /// Création de la variable "noClientForm" une div "null" en remplacement de "#teddy_cart"
  let noClientForm = ``;

  /// Ajout de l'élement "noClientForm" Dans le HTML.
  container4.innerHTML = noClientForm;
}
/////////////// Si le panier est vide :  / END ///////////////

/////////////// Fomulaire de commande ///////////////
/// Création de la constante "orderConfirm" qui pointe le boutton "order_confirm".
const orderConfirm = document.getElementById("order_confirm");

/// Constantes utile pour la validation des données utilisateurs recueillis dans le formulaire de commande.
const lastNameEntry = /^[a-zA-Zà-ö\s.'-]+$/;
const firstNameEntry = /^[a-zA-Zà-ö.-]+$/;
const eMailEntry = /^[a-zA-Z0-9.!@#$%&’*+=?^_`{|}~-]+$/;
const addressEntry = /^[a-zA-Zà-ö0-9\s,.'-]{3,}$/;
const cityEntry = /^[a-zA-Zà-ö\s.'-]+$/;

/// Au clic sur le bouton "order_confirm".
orderConfirm.addEventListener("click", (event) => {
  event.preventDefault();

  /// Récupération par pointage des données du formulaire de commande.
  let contact = {
    firstName: document.getElementById("contact_first_name").value,
    lastName: document.getElementById("contact_last_name").value,
    address: document.getElementById("contact_address").value,
    city: document.getElementById("contact_city").value,
    email: document.getElementById("contact_email").value,
  };

  /// Test du remplissage du formulaire.
  if (lastNameEntry.test(contact.lastName) == false) {
    alert(
      'Veuillez renseigner correctement le champs "Nom" pour valider votre commande.'
    );
  }

  if (firstNameEntry.test(contact.firstName) == false) {
    alert(
      'Veuillez renseigner correctement le champs "Prénom" pour valider votre commande.'
    );
  }

  if (eMailEntry.test(contact.email) == false) {
    alert(
      'Veuillez renseigner correctement le champs "e-Mail" pour valider votre commande.'
    );
  }

  if (addressEntry.test(contact.address) == false) {
    alert(
      'Veuillez renseigner correctement le champs "Adresse" pour valider votre commande.'
    );
  }

  if (cityEntry.test(contact.city) == false) {
    alert(
      'Veuillez renseigner correctement le champs "Ville" pour valider votre commande.'
    );
  }

  /// Récupération de "order".
  let order = JSON.stringify({
    contact,
    products,
  });

  ///// Interrogation de l’API pour l'enregistrement de "order" et la création de la réponse "response.orderId". /////
  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    mode: "cors",
    body: order,
  })
    /// Réponse du serveur.
    .then((response) => response.json())
    .then((response) => {
      let idCommande = response.orderId;
      contactT = response.contact;
      localStorage.setItem("idCommande", JSON.stringify(idCommande));
      localStorage.setItem("contact", JSON.stringify(contactT));
      window.location.assign("confirmation.html?orderId=" + idCommande);
    })
    ///// Interrogation de l’API pour l'enregistrement de "order" et la création de la réponse "response.orderId". / END /////
    .catch(function (error) {
      alert(error);
    });
});