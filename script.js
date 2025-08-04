function carregarCatalogo(url) {
    const container = document.getElementById("catalogo");
    const searchInput = document.getElementById("search");

    fetch(url)
        .then(res => res.json())
        .then(lista => {
            function renderCatalogo(filtro = "") {
                container.innerHTML = "";
                lista
                    .filter(item => item.titulo.toLowerCase().includes(filtro.toLowerCase()))
                    .forEach(item => {
                        const card = document.createElement("div");
                        card.classList.add("card");

                        const img = document.createElement("img");
                        img.src = item.capa;
                        img.alt = item.titulo;

                        const titulo = document.createElement("h3");
                        titulo.textContent = item.titulo;

                        const btnAssistir = document.createElement("button");

                        // Ação conforme tipo
                        if (item.tipo === "serie") {
                            btnAssistir.textContent = "Ver episódios";
                            btnAssistir.addEventListener("click", () => {
                                window.location.href = `serie.html?id=${item.id}`;
                            });
                        } 
                        else if (item.tipo === "anime") {
                            btnAssistir.textContent = "Ver episódios";
                            btnAssistir.addEventListener("click", () => {
                                window.location.href = `anime.html?id=${item.id}`;
                            });
                        } 
                        else if (item.tipo === "filme") {
                            let assistidos = JSON.parse(localStorage.getItem("assistidos")) || [];
                            btnAssistir.textContent = assistidos.includes(item.id) ? "Assistido ✅" : "Assistir";
                            if (assistidos.includes(item.id)) btnAssistir.classList.add("watched");

                            btnAssistir.addEventListener("click", () => {
                                window.open(item.link, "_blank");
                                toggleAssistido("filme", item.id, btnAssistir);
                            });
                        }

                        card.appendChild(img);
                        card.appendChild(titulo);
                        card.appendChild(btnAssistir);
                        container.appendChild(card);
                    });
            }

            searchInput?.addEventListener("input", e => {
                renderCatalogo(e.target.value);
            });

            renderCatalogo();
        });
}

function carregarUltimosAdicionados(urls) {
    const container = document.getElementById("catalogo");
    const searchInput = document.getElementById("search");
    let todosItens = [];

    Promise.all(urls.map(url => fetch(url).then(r => r.json())))
        .then(respostas => {
            respostas.forEach(lista => {
                lista.forEach(item => {
                    if ((item.tipo === "serie" || item.tipo === "anime") && item.temporadas) {
                        let dataUltimaTemp = "2025-01-01";
                        item.temporadas.forEach(temp => {
                            if (temp.dataAdicao && new Date(temp.dataAdicao) > new Date(dataUltimaTemp)) {
                                dataUltimaTemp = temp.dataAdicao;
                            }
                        });

                        todosItens.push({
                            id: item.id,
                            tipo: item.tipo,
                            titulo: item.titulo,
                            capa: item.capa,
                            link: `${item.tipo}.html?id=${item.id}`,
                            dataAdicao: dataUltimaTemp
                        });
                    } else {
                        todosItens.push({
                            ...item,
                            dataAdicao: item.dataAdicao || "2025-01-01"
                        });
                    }
                });
            });

            todosItens.sort((a, b) => new Date(b.dataAdicao) - new Date(a.dataAdicao));

            function renderCatalogo(filtrar = "") {
                container.innerHTML = "";
                todosItens
                    .filter(item => item.titulo.toLowerCase().includes(filtrar.toLowerCase()))
                    .forEach(item => {
                        const card = document.createElement("div");
                        card.classList.add("card");

                        const img = document.createElement("img");
                        img.src = item.capa;
                        img.alt = item.titulo;

                        const titulo = document.createElement("h3");
                        titulo.textContent = item.titulo;

                        const btnAssistir = document.createElement("button");

                        if (item.tipo === "serie" || item.tipo === "anime") {
                            btnAssistir.textContent = "Ver episódios";
                            btnAssistir.addEventListener("click", () => {
                                window.location.href = item.link;
                            });
                        } else {
                            let assistidos = JSON.parse(localStorage.getItem("assistidos")) || [];
                            btnAssistir.textContent = assistidos.includes(item.id) ? "Assistido ✅" : "Assistir";
                            if (assistidos.includes(item.id)) btnAssistir.classList.add("watched");

                            btnAssistir.addEventListener("click", () => {
                                window.open(item.link, "_blank");
                                toggleAssistido("filme", item.id, btnAssistir);
                            });
                        }

                        card.appendChild(img);
                        card.appendChild(titulo);
                        card.appendChild(btnAssistir);
                        container.appendChild(card);
                    });
            }

            searchInput?.addEventListener("input", e => {
                renderCatalogo(e.target.value);
            });

            renderCatalogo();
        });
}
