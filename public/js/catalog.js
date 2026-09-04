import { elements } from "./elements.js";

const API_URL = "/api/items";

const unidadesTiempo = {
    s: "segundos",
    m: "minutos",
    h: "horas",
    d: "días"
};

const catalogContainer = document.getElementById("catalogContainer");
const detailModal = document.getElementById("detailModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");


// Buscar un elemento por su nombre
function buscarElemento(nombre) {
    return elements.find(elemento => elemento.nombre === nombre);
}


// Formatear tiempo de eclosión
function formatearEclosion(item) {

    if (!item.eclosion) {
        return "0";
    }

    return `${item.eclosion} ${unidadesTiempo[item.unidad] || ""}`.trim();
}


// Generar HTML de los iconos de los elementos
function generarElementosHTML(item) {

    const elementos = [
        item.elemento1,
        item.elemento2,
        item.elemento3,
        item.elemento4
    ].filter(Boolean);

    return elementos.map(nombreElemento => {

        const elemento = buscarElemento(nombreElemento);

        if (!elemento) {
            return "";
        }

        return `
            <img
                src="${elemento.imagen}"
                alt="${elemento.nombre}"
                title="${elemento.nombre}"
                class="element-icon"
            >
        `;

    }).join("");
}


// Cargar catálogo
async function loadCatalog() {

    try {

        const res = await fetch(API_URL);

        if (!res.ok) {
            throw new Error("No se pudo cargar el catálogo");
        }

        const items = await res.json();

        catalogContainer.innerHTML = "";

        // Crear una card por cada dragón
        items.forEach(item => {

            const card = document.createElement("div");

            card.className = "dragon-card";

            const elementosHTML = generarElementosHTML(item);

            // Contenido de la card
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


// Evento para abrir el detalle del dragón
catalogContainer.addEventListener("click", async (e) => {

    const btn = e.target.closest(".btn-detail");

    if (!btn) {
        return;
    }

    const id = Number(btn.dataset.id);

    try {

        const res = await fetch(`${API_URL}/${id}`);

        if (!res.ok) {
            throw new Error("No se encontró el dragón");
        }

        const item = await res.json();

        const elementosHTML = generarElementosHTML(item);

        // Contenido del modal
        modalContent.innerHTML = `
            <h2>${item.nombre}</h2>

            <img
                src="${item.img}"
                alt="${item.nombre}"
                class="modal-dragon-image"
            >

            <div class="modal-elements">
                ${elementosHTML}
            </div>

            <p>
                <strong>Descripción:</strong>
                ${item.descripcion || "DESCONOCIDO"}
            </p>

            <p>
                <strong>Categoría:</strong>
                ${item.categoria || "DESCONOCIDO"}
            </p>

            <p>
                <strong>Reproducción:</strong>
                ${item.reproduccion || "NO"}
            </p>

            <p>
                <strong>Eclosión:</strong>
                ${formatearEclosion(item)}
            </p>

            <p>
                <strong>Precio:</strong>
                ${item.precio || "0"}
            </p>

            <p>
                <strong>Ingresos por minuto:</strong>
                ${item.ingresos || "0"}
            </p>
        `;

        // Mostrar modal
        detailModal.classList.add("show");

    } catch (err) {

        console.error("Error cargando detalle:", err);

    }

});


// Cerrar modal
closeModal.addEventListener("click", () => {

    detailModal.classList.remove("show");

});


// Cargar catálogo al iniciar
loadCatalog();