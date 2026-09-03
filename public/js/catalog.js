import { elements } from "./elements.js";

const API_URL = "/api/items";

const catalogContainer = document.getElementById("catalogContainer");

function buscarElemento(nombre) {
    return elements.find(elemento => elemento.nombre === nombre);
}

async function loadCatalog() {

    try {

        const res = await fetch(API_URL);

        const items = await res.json();

        catalogContainer.innerHTML = "";

        items.forEach(item => {

            const card = document.createElement("div");

            card.className = "dragon-card";

            const elementos = [
                item.elemento1,
                item.elemento2,
                item.elemento3,
                item.elemento4
            ].filter(Boolean);

            const elementosHTML = elementos.map(nombreElemento => {

                const elemento = buscarElemento(nombreElemento);

                if (!elemento) return "";

                return `
                    <img 
                        src="${elemento.imagen}" 
                        alt="${elemento.nombre}"
                        title="${elemento.nombre}"
                        class="element-icon"
                    >
                `;

            }).join("");

            card.innerHTML = `
    <div class="dragon-image">
        <img 
            src="${item.img}" 
            alt="${item.nombre}"
        >
    </div>

    <div class="dragon-info">

        <h3>${item.nombre}</h3>

        <div class="dragon-elements">
            ${elementosHTML}
        </div>

        <p>
            <strong>Categoría:</strong> 
            ${item.categoria}
        </p>

        <p>
            <strong>Precio:</strong> 
            ${item.precio}
        </p>

        <button 
            class="btn-detail" 
            data-id="${item.id}">
            Ver detalles
        </button>

    </div>
`;

            catalogContainer.appendChild(card);

        });

    } catch (err) {

        console.error("Error cargando catálogo:", err);

        catalogContainer.innerHTML = `
            <p class="error-message">
                No se pudieron cargar los dragones.
            </p>
        `;
    }
}


catalogContainer.addEventListener("click", async (e) => {

    const btn = e.target.closest(".btn-detail");

    if (!btn) return;

    const id = Number(btn.dataset.id);

    try {

        const res = await fetch(`${API_URL}/${id}`);

        if (!res.ok) {
            throw new Error("No se encontró el dragón");
        }

        const item = await res.json();

        console.log("Dragón seleccionado:", item);

    } catch (err) {

        console.error("Error cargando detalle:", err);

    }

});


loadCatalog();