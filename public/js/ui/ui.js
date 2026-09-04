const unidadesTiempo = {
    s: "segundos",
    m: "minutos",
    h: "horas",
    d: "días"
};


export function renderItems(items, tableBody) {
    tableBody.innerHTML = "";

    items.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td>${item.descripcion || "DESCONOCIDO"}</td>
            <td>${item.elemento1}</td>
            <td>${item.elemento2}</td>
            <td>${item.elemento3}</td>
            <td>${item.elemento4}</td>
            <td>${item.categoria}</td>
            <td>${item.reproduccion || "NO"}</td>
            <td>${item.eclosion || "0"} ${unidadesTiempo[item.unidad] || ""}</td>
            <td>${item.precio || "0"}</td>
            <td>${item.ingresos || "0/min"}</td>
            <td>
                <button class="btn-edit" data-id="${item.id}">Editar</button>
                <button class="btn-delete" data-id="${item.id}">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


export function resetForm(form, submitBtn) {
    form.reset();

    if (submitBtn) {
        submitBtn.textContent = "Agregar";
    }
}


export function fillForm(form, item, submitBtn) {
    form.querySelector("#nombre").value = item.nombre || "";
    form.querySelector("#img").value = item.img || "";
    form.querySelector("#descripcion").value = item.descripcion || "";

    form.querySelector("#elemento1").value = item.elemento1 || "";
    form.querySelector("#elemento2").value = item.elemento2 || "";
    form.querySelector("#elemento3").value = item.elemento3 || "";
    form.querySelector("#elemento4").value = item.elemento4 || "";

    form.querySelector("#categoria").value = item.categoria || "";
    form.querySelector("#reproduccion").value = item.reproduccion || "";

    form.querySelector("#eclosion").value = item.eclosion || "";
    form.querySelector("#unidad").value = item.unidad || "s";

    form.querySelector("#precio").value = item.precio || "";
    form.querySelector("#ingresos").value = item.ingresos || "";

    if (submitBtn) {
        submitBtn.textContent = "Guardar cambios";
    }
}

