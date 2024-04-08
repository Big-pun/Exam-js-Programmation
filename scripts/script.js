// TODO manipuler les elements du DOM

const searchInput = document.getElementById("searchInput"); // Récupère l'élément input avec l'id searchInput
const searchButton = document.getElementById("searchButton"); // Récupère l'élément button avec l'id searchButton
const definitionContainer = document.getElementById("definition"); // Récupère l'élément div avec l'id definition
const clearButton = document.getElementById("clearButton"); // Récupère l'élément button avec l'id clearButton

// TODO Fonction async pour récupérer les données de l'API

const fetchDefinition = async (word) => {
  try {
    console.log("fetchDefinition"); 

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`); // Appel de l'API avec le mot recherché

    if (!response.ok)
      throw new Error(`Le serveur a retourné ${response.status}`); // Si le serveur retourne une erreur, on affiche un message d'erreur
        console.log(response); 

    const data = await response.json(); 
      console.log(data); //

    if (data.length === 0) { 
      throw new Error(`Aucun résultat pour le mot ${word}`); // Si le mot n'est pas trouvé, on affiche un message d'erreur (c'est ce message d'erreur que je n’arrivais pas a faire afficher)
    }

    displayDefinition(data); 
  } catch (error) { 
    displayErrorPopup(error.message); 
  }
};

// Todo Afficher message d'erreur dans une fenêtre pop-up

function displayErrorPopup(message) { 
  console.error(message); // Affiche le message d'erreur dans la console
  alert(message); // Lance une fenêtre pop-up avec le message d'erreur
}

// TODO retirer les definitions précédentes lors de l'appel de la fonction clearDefinition

function clearDefinition() { // Fonction qui supprime les définitions précédentes
  console.log("clearDefinition");

  definitionContainer.innerHTML = "";
}

// TODO Afficher les definitions trouvées dans l'api dans une nouvelle liste ul avec elements li

function displayDefinition(data) { // Fonction qui affiche les définitions trouvées dans l'API
  console.log("displayDefinition");

  clearDefinition();
  const definitionList = document.createElement("ul");
  definitionContainer.appendChild(definitionList);

  data.forEach((definition) => {
    const listItem = document.createElement("li");
    listItem.textContent = definition.meanings[0].definitions[0].definition;

    console.log(definition.meanings[0].definitions[0].definition);

    definitionList.appendChild(listItem);
  });
}

/*
// TODO ajout event listener  sur le click
 searchButton.addEventListener("click", () => {
  const word = searchInput.value.trim();
  if (word !== "") {
    fetchDefinition(word);
  } else {
    displayErrorPopup("Veuillez entrer un mot");
  }
});

// TODO ajout event listener sur la pression de la touche enter
searchInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    const word = searchInput.value.trim();
    if (word !== "") {
      fetchDefinition(word);
    } else {
      displayErrorPopup("Veuillez entrer un mot");
    }
  }
});
*/

// TODO Fonction qui lance la recherche
function startSearch(event) {
  console.log("startSearch");

  const word = searchInput.value.trim();
  if (word !== "") {
    fetchDefinition(word);
  } else {
    displayErrorPopup("Veuillez entrer un mot");
  }
}
// TODO ajout event listener pour le click sur le search bouton et pour la pression de la touche enter du clavier

searchButton.addEventListener("click", startSearch);
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") { 
    startSearch(event);
  }
});

// TODO appel de la fonction clearDefinition lors du click sur clearButton
clearButton.addEventListener("click", clearDefinition);
