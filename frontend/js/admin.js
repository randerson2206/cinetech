const API_URL = "http://localhost/cinetech/cinetech-api";

document.addEventListener("DOMContentLoaded", () => {
    carregarGeneros();
    carregarFilmes();
    listarGeneros();

    // FORM GÊNERO
    document.getElementById("formGenero").addEventListener("submit", async (e) => {
        e.preventDefault();
        const nome = document.getElementById("nomeGenero").value.trim();
        const id = document.getElementById("generoId").value;

        if (!nome) return mostrarToast("Preencha o nome do gênero!", "warning");

        const url = id ? `${API_URL}/generos/editar.php?id=${id}` : `${API_URL}/generos/criar.php`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome })
        });

        if (response.ok) {
            mostrarToast(`Gênero ${id ? "atualizado" : "cadastrado"} com sucesso!`);
            document.getElementById("formGenero").reset();
            document.getElementById("generoId").value = "";
            listarGeneros();
            carregarGeneros();
        } else {
            mostrarToast("Erro ao salvar o gênero.", "danger");
        }
    });

    // FORM FILME
    document.getElementById("formFilme").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = document.getElementById("formFilme");
        const formData = new FormData(form);
        const id = document.getElementById("filmeId").value;

        const url = id ? `${API_URL}/filmes/editar.php?id=${id}` : `${API_URL}/filmes/criar.php`;

        if (!formData.get("titulo") || !formData.get("genero_id") || !formData.get("lancamento") || !formData.get("duracao")) {
            return mostrarToast("Preencha todos os campos obrigatórios!", "warning");
        }

        if (!id && !formData.get("imagem").name) {
            return mostrarToast("Selecione uma imagem para o filme!", "warning");
        }

        if (!id) formData.delete("id");

        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            mostrarToast(`Filme ${id ? "atualizado" : "cadastrado"} com sucesso!`);
            form.reset();
            document.getElementById("filmeId").value = "";
            carregarFilmes();
        } else {
            mostrarToast("Erro ao salvar o filme.", "danger");
        }
    });

    document.getElementById("btnConfirmarExcluir").addEventListener("click", async () => {
        if (acaoConfirmar) {
            await acaoConfirmar();
            acaoConfirmar = null;
            const modalEl = bootstrap.Modal.getInstance(document.getElementById("modalConfirmacao"));
            modalEl.hide();
        }
    });
});

// ========== FILMES ==========

function formatarData(dataISO) {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

async function carregarFilmes() {
    const res = await fetch(`${API_URL}/filmes/listar.php`);
    const filmes = await res.json();

    const container = document.getElementById("listaFilmes");
    container.innerHTML = filmes.map(filme => `
        <div class="col-md-4 mb-3">
            <div class="card">
                ${filme.imagem ? `<img src="${API_URL}/uploads/${filme.imagem}" class="card-img-top" alt="${filme.titulo}">` : ""}
                <div class="card-body">
                    <h5 class="card-title">${filme.titulo}</h5>
                    <p class="card-text">${filme.descricao}</p>
                    <p><strong>Gênero:</strong> ${filme.genero_nome || "Não informado"}</p>
                    <p><strong>Duração:</strong> ${filme.duracao} min</p>
                    <p><strong>Lançamento:</strong> ${formatarData(filme.lancamento)}</p>
                    ${filme.trailer ? `<a href="${filme.trailer}" class="btn btn-sm btn-info" target="_blank">Ver Trailer</a>` : ""}
                    <button class="btn btn-sm btn-warning mt-2" onclick='editarFilme(${JSON.stringify(filme)})'>Editar</button>
                    <button class="btn btn-sm btn-danger mt-2" onclick='excluirFilme(${filme.id})'>Excluir</button>
                </div>
            </div>
        </div>
    `).join("");
}

function editarFilme(filme) {
    document.getElementById("filmeId").value = filme.id;
    document.getElementById("titulo").value = filme.titulo;
    document.getElementById("descricao").value = filme.descricao;
    document.getElementById("duracao").value = filme.duracao;
    document.getElementById("trailer").value = filme.trailer;
    document.getElementById("lancamento").value = filme.lancamento;
    document.getElementById("selectGenero").value = filme.genero_id;
    document.getElementById("imagem").value = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

async function excluirFilme(id) {
    abrirModalConfirmacao("Deseja excluir este filme?", async () => {
        const res = await fetch(`${API_URL}/filmes/excluir.php?id=${id}`, {
            method: "DELETE"
        });

        if (res.ok) {
            mostrarToast("Filme excluído com sucesso!");
            carregarFilmes();
        } else {
            mostrarToast("Erro ao excluir o filme.", "danger");
        }
    });
}

// ========== GÊNEROS ==========

async function carregarGeneros() {
    const res = await fetch(`${API_URL}/generos/listar.php`);
    const generos = await res.json();

    const select = document.getElementById("selectGenero");
    select.innerHTML = '<option value="">Selecione o Gênero</option>';

    generos.forEach(g => {
        const option = document.createElement("option");
        option.value = g.id;
        option.textContent = g.nome;
        select.appendChild(option);
    });
}

async function listarGeneros() {
    const res = await fetch(`${API_URL}/generos/listar.php`);
    const generos = await res.json();

    const tbody = document.getElementById("listaGeneros");
    tbody.innerHTML = "";

    generos.forEach(g => {
        tbody.innerHTML += `
            <tr>
                <td>${g.nome}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick='editarGenero(${JSON.stringify(g)})'>Editar</button>
                    <button class="btn btn-sm btn-danger" onclick='excluirGenero(${g.id})'>Excluir</button>
                </td>
            </tr>
        `;
    });
}

function editarGenero(genero) {
    document.getElementById("generoId").value = genero.id;
    document.getElementById("nomeGenero").value = genero.nome;
}

async function excluirGenero(id) {
    abrirModalConfirmacao("Deseja excluir este gênero?", async () => {
        const res = await fetch(`${API_URL}/generos/excluir.php?id=${id}`, {
            method: "DELETE"
        });

        if (res.ok) {
            mostrarToast("Gênero excluído com sucesso!");
            listarGeneros();
            carregarGeneros();
        } else {
            mostrarToast("Erro ao excluir o gênero!", "danger");
        }
    });
}

// ========== TOAST ==========

function mostrarToast(mensagem, tipo = "success") {
    const toastEl = document.getElementById("toastFeedback");
    const toastMsg = document.getElementById("toastMsg");

    toastEl.classList.remove("bg-success", "bg-danger", "bg-warning");
    toastEl.classList.add(`bg-${tipo}`);
    toastMsg.textContent = mensagem;

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

// ========== MODAL CONFIRMAÇÃO ==========

let acaoConfirmar = null;

function abrirModalConfirmacao(mensagem, callback) {
    document.getElementById("mensagemConfirmacao").textContent = mensagem;
    acaoConfirmar = callback;
    const modal = new bootstrap.Modal(document.getElementById("modalConfirmacao"));
    modal.show();
}
