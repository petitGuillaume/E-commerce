// Création tableau d'articles (Panier)

let cart = [];
let articles = document.getElementsByClassName('article');
// article.dataset.ref
// article.dataset.name
// article.dataset.price
// console.log(article);

for (const article of articles) {
    // Au clic sur panier, déclencher une fonction
    article.onclick = function (evt) {
        // ajoute un obj article au tableau "panier" {}
        let index = cart.findIndex((searchArticle) => searchArticle.ref === this.dataset.ref);
        if (index !== -1) {
            cart[index].quantity += 1;
        } else {
            cart.push({
                ref: this.dataset.ref,
                name: this.dataset.name,
                price: this.dataset.price,
                quantity: 1
            });
        }
        // On ne fait rien d'autre (prévenir refresh sur la page)
        evt.preventDefault();
    }
}

let displayCartBtn = document.getElementById("displayCart");
let cartTableElt = document.getElementById("cartTable");
// let cartTableBodyElt = document.getElementById("cartTableBody");
function displayCart() {
    // Suppression des lignes existantes dans le tableau pour éviter que les lignes soient dupliquées lorsque l'on reclique sur le btn "afficher panier"
    cartTableElt.tBodies[0].innerHTML = "";
    let total = 0;
    // Génération des lignes dans le tableau
    cart.forEach(art => {
        // Pour chaque article on construit un élement tr
        let trElt = document.createElement("tr");
        trElt.className = "cart-line";
        trElt.innerHTML = "<td><h5 class=\"title text-truncate\">" + art.name + "</h5></td>\
        <td>" + art.ref + "</td>\
        <td class=\"price\">"+ art.price + " €" + "</td>\
        <td><input type=\"number\" size=\"3\" value=\""+ art.quantity + "\"></td>\
        <td class=\"total text-center\">"+ Number.parseFloat(art.price) * Number.parseInt(art.quantity) + " €" + "</td>\
        <td class=\"text-center\"><button type=\"button\" class=\"deleteArticle\"><i class=\"fas fa-trash-alt\"></i></button></td>";
        console.log(cartTableElt);
        // Et on l'ajoute à notre balise tbody
        cartTableElt.tBodies[0].appendChild(trElt);
        // cartTableBodyElt.appendChild(trElt);
        total += Number.parseFloat(art.price) * Number.parseInt(art.quantity);
    });
    // MAJ du total
    let finalResult = document.getElementById("result");
    finalResult.textContent = total + " €";

    let cartLines = document.getElementsByClassName("cart-line");
    console.log(cartLines);
    for (const cartLine of cartLines) {
        // Ajout de l'action de mise à jour de la quantité d'article
        // Selection du champ input et btn deleteArticle pour chaque ligne. Pour input, on utilise la proprieté .onchange car c'est le changement dans cette cellule qui nous intéresse.
        //  Pour le btn delete, c'est l'action au niveau du clic qui nous intéresse.
        // Savoir sur quel article on a appuyé : 
        // Se servir de la console pour identifier l'index de chaque élement de notre tableau. innertext est à prohiber, préférer textcontent.
        let articleQty = cartLine.querySelector("input");
        articleQty.onchange = function (evt) {
            // recherche de l'article sur lequel on a cliqué: on se sert de la valeur dans le tab html et on compare 
            // recherche réf de l'article et renvoie à la position (index) de cet article
            let index = cart.findIndex((searchArticle) => searchArticle.ref === cartLine.children[1].textContent);
            // on définit une nouvelle valeur à notre qté sur l'index modifié au niveau du tableau. valueAsNumber déduit via la console en modifiant le champ input.
            if (this.valueAsNumber >= 1) {
                cart[index].quantity = this.valueAsNumber;
                console.log(this);
            } else {
                cart.splice(index, 1);
            }
            // Regénération du tableau (pour prendre en compte les sous totaux)
            displayCart();
        }
        // Ajout de l'action de suppression de l'article
        let deleteBtn = cartLine.querySelector(".deleteArticle");
        deleteBtn.onclick = function (evt) {
            // recherche de l'article sur lequel on a cliqué
            let index = cart.findIndex((searchArticle) => searchArticle.ref === cartLine.children[1].textContent);
            // suppression de cet article dans notre array via la fonction .splice : il faut préciser son index et le nombre de fois qu'il est dans l'array (1). 
            // 1 car tous les articles de la même ref sont regroupés sour le même nom dans notre tableau
            cart.splice(index, 1);
            displayCart();
        }
    }
}

displayCartBtn.addEventListener("click", displayCart);

// Hide or Display des catégories

//  H&D Les catégories 
let tableDuckShow = document.getElementById("tableDuck");
let gardenDuckShow = document.getElementById("gardenDuck");
let bathDuckShow = document.getElementById("bathDuck");
let allProducts = document.getElementById("all-products");
let prod = document.getElementById("prod");

// H&D La navbar
let tableDuckNav = document.getElementById("tableDuckNav");
let gardenDuckNav = document.getElementById("gardenDuckNav");
let bathDuckNav = document.getElementById("bathDuckNav");

// H&D Les actions

tableDuckNav.onclick = function (evt) {
    prod.style.display = "block";
    tableDuckShow.style.display = "block";
    gardenDuckShow.style.display = "none";
    bathDuckShow.style.display = "none";
}

gardenDuckNav.onclick = function (evt) {
    prod.style.display = "block";
    gardenDuckShow.style.display = "block";
    tableDuckShow.style.display = "none";
    bathDuckShow.style.display = "none";
}

bathDuckNav.onclick = function (evt) {
    prod.style.display = "block";
    bathDuckShow.style.display = "block";
    gardenDuckShow.style.display = "none";
    tableDuckShow.style.display = "none";
}

function whitepage(){
    prod.style.display = "block";
    bathDuckShow.style.display = "none";
    gardenDuckShow.style.display = "none";
    tableDuckShow.style.display = "none";
}

whitepage();