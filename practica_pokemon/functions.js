console.log("Hello World Pokemon");

async function obtenerPersonajes() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();
    console.log('Personajes:', data.results);
    return data.results;
}

async function pintarPersonajes(personajes) {
    console.log("Pintando personajes:", personajes);
    let tarjetasHTML = "";
    for (let personaje of personajes) {
        let respuesta = await fetch(personaje.url);
        let detalles = await respuesta.json();
        
        tarjetasHTML += `
        <div class="card">
            <img src="${detalles.sprites.front_default}" alt="${detalles.name}">
            <h3>${detalles.name.toUpperCase()}</h3>
            <p class="id">ID: #${detalles.id}</p>
            <p class="height">Altura: ${detalles.height}</p>
            <p class="weight">Peso: ${detalles.weight}</p>
            <p class="type">Tipo: ${detalles.types.map(type => type.type.name).join(', ')}</p>
            <p class="abilities">Habilidades: ${detalles.abilities.map(a => a.ability.name).join(', ')}</p>
        </div>
        `;
    }
    
    document.getElementById("main-container").innerHTML = tarjetasHTML;
}

obtenerPersonajes().then(pintarPersonajes);