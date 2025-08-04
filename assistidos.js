// assistidos.js
function marcarAssistido(tipo, id) {
    const key = tipo === "filme" 
        ? "assistidos" 
        : tipo === "serie" 
        ? "episodiosAssistidos" 
        : "episodiosAssistidosAnimes";

    let assistidos = JSON.parse(localStorage.getItem(key)) || (tipo === "filme" ? [] : {});

    if (tipo === "filme") {
        if (!assistidos.includes(id)) {
            assistidos.push(id);
        }
    } else {
        assistidos[id] = true;
    }

    localStorage.setItem(key, JSON.stringify(assistidos));
}

function marcarNaoAssistido(tipo, id) {
    const key = tipo === "filme" 
        ? "assistidos" 
        : tipo === "serie" 
        ? "episodiosAssistidos" 
        : "episodiosAssistidosAnimes";

    let assistidos = JSON.parse(localStorage.getItem(key)) || (tipo === "filme" ? [] : {});

    if (tipo === "filme") {
        assistidos = assistidos.filter(itemId => itemId !== id);
    } else {
        delete assistidos[id];
    }

    localStorage.setItem(key, JSON.stringify(assistidos));
}
