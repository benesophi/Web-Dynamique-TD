import { ajoutListenersAvis } from "./avis.js";

// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

function afficherPieces(pieces){
    const sectionFiches = document.querySelector(".fiches");
    sectionFiches.innerHTML = '';

    for (let i=0; i< pieces.length; i++){
        const article = pieces[i];
        const pieceElement = document.createElement("article");

        const imageElement = document.createElement("img"); //image
        imageElement.src = pieces[i].image;

        const nomElement = document.createElement("h2"); //nom d'article
        nomElement.innerText = pieces[i].nom;

        const prixElement = document.createElement("p"); //prix
        prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;

        const categorieElement = document.createElement("p");
        categorieElement.innerText = pieces[i].categorie ?? "aucune catégorie";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment.";

        const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = pieces[i].disponibilite === "Oui" ? "En stock" : "Rupture de stock";

        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";

        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(disponibiliteElement);

        pieceElement.appendChild(avisBouton)    
    }
    ajoutListenersAvis();
}

afficherPieces(pieces)

const boutonTrier = document.querySelector(".btn-trier"); //modifier l’ordre des pièces en fonction de leur prix.
boutonTrier.addEventListener("click", () => {
	const piecesOrdonnees = Array.from(pieces);
	piecesOrdonnees.sort((a, b) => b.prix - a.prix); //decroissant
	afficherPieces(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter((piece) => piece.description); //retourne une valeus booléenne
    afficherPieces(piecesFiltrees);
});


