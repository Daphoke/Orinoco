////////// Initialisation //////////
/// Récuperation de l’id produit dans l'url via l'utilisation d'un construtor.
let params = new URL(document.location).searchParams;
let _id = params.get("id");

/// Initialisation des containers.
// containers
let container = document.getElementById("teddy_card_detail");
let container_name = document.getElementById("teddy_card_detail_name");
let container_img = document.getElementById("teddy_card_detail_img");
let container_description = document.getElementById("teddy_card_detail_description");
let container_price = document.getElementById("teddy_card_detail_price");
let container_option = document.getElementById("teddy_card_detail_options");
let container_btn = document.getElementById(
  "teddy_card_detail-btn-add-to-cart"
);
////////// Initialisation / END //////////

/////////////// START ///////////////
////////// Interrogation de l’API pour récupérer les détails du produit "_id". //////////
fetch("http://localhost:3000/api/teddies/" + _id)
  /// Réponse serveur
  .then((response) => response.json())
  .then((teddies) => {
    ///// Création du détail produit mis à jour de façon dynamique /////
    /// Insertion du nom.
    let teddyName = document.createElement("h1");
    teddyName.classList.add("card_name_xl");
    teddyName.innerHTML = teddies.name;
    container_name.appendChild(teddyName);

    /// Insertion de l'image.
    let teddyImg = document.createElement("img");
    teddyImg.classList.add("card_image_xl");
    teddyImg.classList.add("d-flex");
    teddyImg.classList.add("mx-auto");
    teddyImg.classList.add("shadow");
    teddyImg.setAttribute("src", teddies.imageUrl);
    teddyImg.setAttribute("alt","Image produit");
    container_img.appendChild(teddyImg);

    /// Insertion de la descripion.
    let teddyDescription = document.createElement("p");
    teddyDescription.innerHTML = teddies.description;
    container_description.appendChild(teddyDescription);

    /// Création de l'élément "teddy_card_detail_price".
    let elementPrice = document.createElement("div");
    elementPrice.classList.add("div_price_xl");
    elementPrice.classList.add("justify-content-end");
    container_price.appendChild(elementPrice);

    /// Insertion du prix.
    let teddyPrice = document.createElement("div");
    teddyPrice.innerHTML = teddies.price / 100;
    elementPrice.appendChild(teddyPrice);

    /// Affichage des cents.
    let teddyPriceCents = document.createElement("div");
    teddyPriceCents.innerHTML = ".00 €";
    elementPrice.appendChild(teddyPriceCents);

    /// Création de l'élément "teddy_card_detail_options".
    let optionNull = document.createElement("option");
    optionNull.setAttribute("disabled", "disabled");
    optionNull.setAttribute("selected", "true");
    optionNull.textContent = "-Sélectionner-";
    container_option.appendChild(optionNull);

    /// Insertion des options de couleurs.
    for (let i = 0; i < teddies.colors.length; i++) {
      let options = document.createElement("option");
      container_option.appendChild(options);
      options.textContent = teddies.colors[i];
    }

    /// Création du boutton d'ajout au panier.
    let btnAddToCart = document.createElement("button");
    container_btn.appendChild(btnAddToCart);
    btnAddToCart.classList.add("btn_suprimer");
    btnAddToCart.textContent = "Ajouter à votre panier";
    ///// Création du détail produit mis à jour de façon dynamique / END /////

    /////// Ecoute de l'évènement click on "#teddy_card_detail-btn-add-to-cart". ///////
    btnAddToCart.addEventListener("click", function (event) {
      /// Bloque l'action par défaut du navigateur pour l'événement en cours.
      event.preventDefault();
      
      console.log("START")
      
      /// Récupération des donneés pour la constitution du panier.
      // selectedOption
      let selectedOption = document.querySelector("#teddy_card_detail_options");

      // selectedOptionNumber
      let selectedOptionNumber = selectedOption.selectedIndex;
      // selectedOptionValue
      let selectedOptionValue = selectedOption.value;

      // selectedQty
      let selectedQty = document.querySelector(".teddy_card_detail_amount");
      // selectedQtyValue
      let selectedQtyValue = selectedQty.value;

      // selectedProduct
      let selectedProduct = {
        imgSelectedProduct: teddies.imageUrl,
        nameSelectedProduct: teddies.name,
        priceSelectedProduct: teddies.price / 100,
        idSelectedProduct: _id,
        colorsSelectedProduct: selectedOptionValue,
        quantitySelectedProduct: selectedQtyValue,
      };

      ///// Boucle option selectionnée / non selectionnée. /////
      if (selectedOptionNumber == 0) {
        alert(
          "Choisissez une couleur parmis celles proposées pour pouvoir ajouter un produit à votre panier."
        );
      } else {
        /// Déclaration de la variable "productInLocalStorage" contenant les keys et values du localStorage.
        // productInLocalStorage
        let productInLocalStorage = JSON.parse(
          localStorage.getItem("productsInLocalStorageT")
        );

        /// Déclaration de la variable "productInLocalStorage" contenant les keys et values du localStorage à l'instant T.
        // productInLocalStorageT
        let productInLocalStorageT = JSON.parse(
          localStorage.getItem("productsInLocalStorageT")
        );

        ///// Déclaration de la fonction ajouter productsInLocalStorageT au sein du localStorage. /////
        const addSelectedProducts = () => {
          console.log("avant ajout");
          console.log("selectedProduct=");
          console.log(selectedProduct);
          console.log("productInLocalStorage=");
          console.log(productInLocalStorage);
          console.log("productInLocalStorageT=");
          console.log(productInLocalStorageT);

          /// Ajout de "selectedProduct" à la fin de "productInLocalStorageT".

          productInLocalStorageT.push(selectedProduct);

          console.log("après ajout");
          console.log("productInLocalStorageT=");
          console.log(productInLocalStorageT);

          // Sauvergade dans le localStorage de "productInLocalStorage" sous le nom de "productsInLocalStorageT".
          localStorage.setItem(
            "productsInLocalStorageT",
            JSON.stringify(productInLocalStorageT)
          );
        };
        ///// Déclaration de la fonction ajouter "productsInLocalStorageT" dans le localStorage. / END /////

        ///// Tri des produits sélectionnés et ajout au localStorage. /////
        console.log("SORT START AFTER CONFIRMATION");

        /// Confirmation de selection d'un produit.
        alert(
          "Vous avez ajouté " +
            teddies.name +
            " (" +
            selectedOptionValue +
            ") dans votre panier!"
        );

        /// Si le localStorage n'est pas vide
        if (
          typeof productInLocalStorageT != "undefined" &&
          productInLocalStorageT != null &&
          productInLocalStorageT.length != null &&
          productInLocalStorageT.length > 0 &&
          localStorage.getItem("productsInLocalStorageT") !== null
        ) {
          console.log("localstorage non vide");

          console.log("déclaration des marqueurs d'identification de boucle");
          /// Déclaration des marqueurs d'identification de boucle.
          // loopMarker
          let loopMarker;
          console.log("loopMarker=");
          console.log(loopMarker);

          // loopMarker2
          let loopMarker2;
          console.log("loopMarker2=");
          console.log(loopMarker2);

          //// Boucle "for" pour caracteriser la présence d'un doublon de produits dans le localStorage, chaque objet est testé. ////
          for (a = 0; a < productInLocalStorage.length; a++) {
            console.log("IN FOR, boucle de test de doublon");

            console.log(selectedProduct.idSelectedProduct);
            console.log(productInLocalStorageT[a].idSelectedProduct);
            console.log(selectedProduct.colorsSelectedProduct);
            console.log(productInLocalStorageT[a].colorsSelectedProduct);

            /// Tableau des conditions pour l'identification des doublons. Id équivalente, option équivalente pour chaque a.
            let conditionsArrayA = [
              selectedProduct.idSelectedProduct ==
                productInLocalStorageT[a].idSelectedProduct,
              selectedProduct.colorsSelectedProduct ==
                productInLocalStorageT[a].colorsSelectedProduct,
            ];

            /// Ce Marqueur prend pour valeur la taille de "productInLocalStorageT" à l'entrée de la boucle "for" de caractérisation de la présence d'un doublon.
            // loopMarker
            loopMarker = productInLocalStorageT.length;

            ///// Boucle de test d'égalité de "selectedProduct" et de "productInLocalStorageT[a]". Sont testées, l'id et l'option. /////
            if (!conditionsArrayA.includes(!true)) {
              console.log("IN IF (présence d'un doublon)");

              /// Suppression de l'objet "a" de productInLocalStorage.
              productInLocalStorage.splice(a, 1);
              console.log("productInLocalStorage.splice(a, 1) OK");

              console.log("productInLocalStorage=");
              console.log(productInLocalStorage);

              /// Nous donne la taille incrémentée de productInLocalStorageT à la sortie de la boucle d'addition des quantités de produits similaires.
              // loopMarker2 ne trouve sa valeur que dans la boucle if dans laquelle elle se trouve.
              loopMarker2 = productInLocalStorageT.length;

              /// Addition des quantités convertie en entier de "selectedProduct" et "productInLocalStorageT[a]".
              productInLocalStorageT[a].quantitySelectedProduct =
                parseInt(selectedProduct.quantitySelectedProduct) +
                parseInt(productInLocalStorageT[a].quantitySelectedProduct);

              console.log("ADDITION OK");
              console.log("productInLocalStorageT=");
              console.log(productInLocalStorageT);

              /// Sauvegarde de "productInLocalStorageT" dans le localstorage sous le nom de "productsInLocalStorageT".
              localStorage.setItem(
                "productsInLocalStorageT",
                JSON.stringify(productInLocalStorageT)
              );
            }
          }
          ///// Boucle for pour caracteriser la présence d'un doublon de produits dans le localStorage / END /////

          console.log("loopMarker=productInLocalStorageT.length=");
          console.log(loopMarker);
          console.log("loopMarker2=productInLocalStorageT.length=");
          console.log(loopMarker2);

          ///// Contrôle de "productInLocalStorageT.length". Si les valeurs sonts différentes, on est entré dans la boucle "for" pour caracteriser la présence d'un doublon mais aucun n'a été trouvé.
          if (loopMarker !== loopMarker2) {
            console.log("IN IF, pas de doublon (loopMarker != loopMarker2)");
            console.log("fonction addSelectedProducts");

            addSelectedProducts();
          }
        } else {
          console.log("FONCTION addSelectedProducts");

          productInLocalStorageT = [];

          addSelectedProducts();
        }
        ///// Tri des produits sélectionnés et ajout au localStorage. / END /////
      }
      ///// Boucle produit selectionné / non selectionné / END /////
      console.log("OUT");
    });
    ///// Ecoute de l'évènement click on "#teddy_card_detail-btn-add-to-cart" / END /////
  })


  .catch(function () {
    alert("Produits indisponibles");
  });
////////// Interrogation de l’API pour récupérer les détails du produit "_id" / END  //////////
/////////////// END ///////////////
