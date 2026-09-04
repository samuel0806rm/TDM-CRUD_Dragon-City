import { getItems, getItem, createItem, updateItem, deleteItem } from "./services/api.js";
import { renderItems, resetForm, fillForm } from "./ui/ui.js";
import { elements } from "./elements.js";

const form = document.getElementById("itemForm");
const tableBody = document.getElementById("itemsTable");
const submitBtn = document.getElementById("submitBtn");
let editingId = null;
const selectoresElementos = [
    document.getElementById("elemento1"),
    document.getElementById("elemento2"),
    document.getElementById("elemento3"),
    document.getElementById("elemento4")
];


// Eventos de tabla (delegación)
tableBody.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = Number(btn.dataset.id);

    if (btn.classList.contains("btn-delete")) {
        try {
            await deleteItem(id);
            loadItems();
        } catch (err) {
            console.error("Error eliminando:", err);
            alert("No se pudo eliminar el item.");
        }
    } else if (btn.classList.contains("btn-edit")) {
        try {
            if (editingId === id) {
                resetForm(form, submitBtn);
                editingId = null;
                return;
            }

            const item = await getItem(id);
            fillForm(form, item, submitBtn);
            editingId = id;
        } catch (err) {
            console.error("Error cargando item:", err);
            alert("No se pudo cargar el item para edición.");
        }
    }
});

// Envío del form
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = form.querySelector("#nombre").value;
    const descripcion = form.querySelector("#descripcion").value;
    const img = form.querySelector("#img").value;

    const elemento1 = form.querySelector("#elemento1").value;
    const elemento2 = form.querySelector("#elemento2").value;
    const elemento3 = form.querySelector("#elemento3").value;
    const elemento4 = form.querySelector("#elemento4").value;

    const categoria = form.querySelector("#categoria").value;

    const reproduccion = form.querySelector("#reproduccion").value;

    const eclosion = Number(
        form.querySelector("#eclosion").value
    );

    const unidad = form.querySelector("#unidad").value;


    const precio = form.querySelector("#precio").value;
    const ingresos = form.querySelector("#ingresos").value;

    if (!nombre) {
        alert("El campo nombre es obligatorio");
        return;
    }

    const data = {
        nombre,
        descripcion,
        img,
        elemento1,
        elemento2,
        elemento3,
        elemento4,
        categoria,
        reproduccion,
        eclosion,
        unidad,
        precio,
        ingresos
    };

    try {
        if (editingId) {
            await updateItem(editingId, data);
            editingId = null;
        } else {
            await createItem(data);
        }

        resetForm(form, submitBtn);
        loadItems();
    } catch (err) {
        console.error("Error guardando item:", err);
        alert("No se pudo guardar el item.");
    }
});

//Elementos
selectoresElementos.forEach(select => {
    const placeholder = document.createElement("option");

    placeholder.value = "";
    placeholder.textContent = "Selecciona un elemento";
    placeholder.disabled = true;
    placeholder.selected = true;

    select.appendChild(placeholder);

    elements.forEach(elemento => {
        const option = document.createElement("option");

        option.value = elemento.nombre;
        option.textContent = elemento.nombre;

        select.appendChild(option);
    });
});


// Cargar al inicio
async function loadItems() {
    try {
        const items = await getItems();
        renderItems(items, tableBody);
    } catch (err) {
        console.error("Error cargando lista:", err);
        alert("No se pudieron cargar los items.");
    }
}

console.log("MAIN FUNCIONANDO");
console.log("ELEMENTS:", elements);

loadItems();
