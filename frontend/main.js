const API_URL = "http://localhost/cinetech/cinetech-api";

document.addEventListener("DOMContentLoaded", () => {
    carregarFilmes();
    carregarCategorias();

    // Evento de busca
    document.getElementById("formPesquisa").addEventListener("submit", (e) => {
        e.preventDefault();
        const termo = document.getElementById("inputPesquisa").value.toLowerCase();
        filtrarFilmesPorTitulo(termo);
    });
});

let todosFilmes = [];

// ====================== FILMES ======================

async function carregarFilmes() {
    try {
        const res = await fetch(`${API_URL}/filmes/listar.php`);
        todosFilmes = await res.json();
        renderizarFilmes(todosFilmes);
    } catch (error) {
        console.error("Erro ao carregar filmes:", error);
    }
}

function formatarData(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
}

function renderizarFilmes(filmes) {
    const container = document.getElementById("listaFilmes");
    if (!filmes.length) {
        container.innerHTML = "<p>Nenhum filme encontrado.</p>";
        return;
    }

    container.innerHTML = filmes.map(filme => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex">
            <div class="card h-100 shadow-sm w-100">
                ${filme.imagem ? `<img src="${API_URL}/uploads/${filme.imagem}" class="card-img-top" alt="${filme.titulo}">` : ""}
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${filme.titulo}</h5>
                    <p class="card-text small">${filme.descricao}</p>
                    <p class="mb-1"><strong>Gênero:</strong> ${filme.genero_nome || "Não informado"}</p>
                    <p class="mb-1"><strong>Duração:</strong> ${filme.duracao} min</p>
                    <p class="mb-2"><strong>Lançamento:</strong> ${formatarData(filme.lancamento)}</p>
                    <div class="mt-auto">
                        ${filme.trailer ? `
                            <a href="${filme.trailer}" target="_blank" class="btn btn-primary btn-sm w-100">
                                🎬 Assistir Trailer
                            </a>
                        ` : `
                            <button class="btn btn-secondary btn-sm w-100" disabled>
                                Trailer indisponível
                            </button>
                        `}
                        
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}


// ====================== GÊNEROS ======================

async function carregarCategorias() {
    try {
        const res = await fetch(`${API_URL}/generos/listar.php`);
        const generos = await res.json();

        const container = document.getElementById("listaCategorias");

        // Botão "Todos"
        let html = `
            <button class="btn btn-outline-secondary btn-sm me-2" onclick="renderizarFilmes(todosFilmes)">Todos</button>
        `;

        // Botões dos gêneros
        html += generos.map(genero => `
            <button class="btn btn-outline-primary btn-sm me-2" onclick="filtrarPorGenero(${genero.id})">${genero.nome}</button>
        `).join("");

        container.innerHTML = html;

    } catch (error) {
        console.error("Erro ao carregar categorias:", error);
    }
}

// ====================== FILTROS ======================

function filtrarFilmesPorTitulo(termo) {
    const filtrados = todosFilmes.filter(f =>
        f.titulo.toLowerCase().includes(termo)
    );
    renderizarFilmes(filtrados);

}

function filtrarPorGenero(idGenero) {
    const filtrados = todosFilmes.filter(f => f.genero_id == idGenero);
    renderizarFilmes(filtrados);
}
