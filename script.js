// Carrega catálogo
fetch("data/catalog.json")
    .then(res => res.json())
    .then(catalogo => carregarCatalogo(catalogo));

function carregarCatalogo(catalogo) {
    const container = document.getElementById("catalogo");
    const assistidos = JSON.parse(localStorage.getItem("assistidos")) || [];

    catalogo.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = item.capa;
        img.alt = item.titulo;

        const titulo = document.createElement("h3");
        titulo.textContent = item.titulo;

        const btnAssistir = document.createElement("button");
        btnAssistir.textContent = assistidos.includes(item.id) ? "Assistido ✅" : "Assistir";
        if (assistidos.includes(item.id)) btnAssistir.classList.add("watched");

        btnAssistir.addEventListener("click", () => {
            window.open(item.link, "_blank");
            if (!assistidos.includes(item.id)) {
                assistidos.push(item.id);
                localStorage.setItem("assistidos", JSON.stringify(assistidos));
                btnAssistir.textContent = "Assistido ✅";
                btnAssistir.classList.add("watched");
            }
        });

        card.appendChild(img);
        card.appendChild(titulo);
        card.appendChild(btnAssistir);
        container.appendChild(card);
    });
}
