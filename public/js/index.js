////////// scroll to top //////////
// Get the button:
mybutton = document.getElementById("scrollBtn");

// When the user scrolls down 650px from the top of the document, show the button
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
////////// Scroll to top / END //////////

/// Initialisation container (<ul id ="articles_list">).
let container = document.getElementById("articles_list");

////////// Interrogation de l'Application Programming Interface pour récupérer l'image, le nom, et le prix de tous des produits. //////////
fetch("http://localhost:3000/api/teddies")
  .then((response) => response.json())
  .then((teddies) => {
    ///// Boucle d'incrémentation de "teddies.length" pour la création des cartes produits. /////
    for (let i = 0; i < teddies.length; i++) {
      /// Création des éléments de la liste "articles_list" pour l'affichage des cartes produits.
      let listElement = document.createElement("li");
      listElement.classList.add("col-18");
      listElement.classList.add("col-md-6");
      listElement.classList.add("col-xl-4");
      container.appendChild(listElement);

      ///// Création du lien vers la page unique produit "produit.html?id=teddies[i]._id". /////
      let gotoProductDetails = document.createElement("a");
      gotoProductDetails.href = "produit.html?id=" + teddies[i]._id;
      listElement.appendChild(gotoProductDetails);
      ///// Création du lien vers la page unique produit "produit.html?id=teddies[i]._id". END /////

      /// Création des cartes produits "article".
      let teddyCard = document.createElement("article");
      teddyCard.classList.add("shadow");
      teddyCard.classList.add("p-3");
      teddyCard.classList.add("rounded-3");
      teddyCard.classList.add("max_w");
      teddyCard.classList.add("mx-auto");
      gotoProductDetails.appendChild(teddyCard);

      /// Insertion des images produits dans la carte produit.
      let divImage = document.createElement("div");
      divImage.classList.add("div_image");

      teddyCard.appendChild(divImage);

      let teddyImg = document.createElement("img");
      teddyImg.classList.add("card_image");
      teddyImg.classList.add("shadow-sm");
      teddyImg.setAttribute("src", teddies[i].imageUrl);
      teddyImg.setAttribute("alt","Image produit");
      divImage.appendChild(teddyImg);

      /// Insertion des noms produits dans la carte produit.
      let teddyName = document.createElement("h4");
      teddyName.innerHTML = teddies[i].name;
      teddyCard.appendChild(teddyName);

      /// Création des "div" dans la carte produit pour l'affichage du prix.
      let divPrice = document.createElement("div");
      divPrice.classList.add("div_price");
      teddyCard.appendChild(divPrice);

      /// Insertion des prix produits dans la carte produit.
      let teddyPrice = document.createElement("div");
      teddyPrice.innerHTML = teddies[i].price / 100;
      divPrice.appendChild(teddyPrice);

      /// Insertion des cents dans la carte produit.
      let teddyPriceCents = document.createElement("div");
      teddyPriceCents.innerHTML = ".00 €";
      divPrice.appendChild(teddyPriceCents);
    }
    ///// Boucle d'incrémentation de "teddies.length" pour la création des cartes produits. / END /////
  })
  ////////// Interrogation de l'Application Programming Interface pour récupérer l'image, le nom, et le prix de tous des produits. / END //////////

  .catch(function () {
    alert("Produits indisponibles");
  });
