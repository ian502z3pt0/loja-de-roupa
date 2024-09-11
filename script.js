class Navbar extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const nav = document.createElement("nav");
      nav.innerHTML = `
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <i class="bi bi-cart-fill"></i>
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Ian Shop</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Novidades</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./filtro.html">Categoria</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Ofertas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./carrinho.html"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg></a>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Digite o que procura" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Pesquisar</button>
            </form>
          </div>
        </div>
    </nav>
      `;
      this.appendChild(nav);
    }
}

customElements.define("nav-bar", Navbar);

class Card extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const div = document.createElement("div");
      div.innerHTML = `

        <style>
            .imgcard{width: 170px; height: 200px}
        </style>

        <div class="card" style="width: 12rem; margin-bottom: 15px; height: 500px;">
            <img class="imgcard" src="${this.getAttribute("img")}" alt="...">
            <div class="card-body">
                <p class="card-text">${this.getAttribute("nome")} <p style="font-weight: 700;">R$${this.getAttribute("preco")}</p></p>
                <a href="./produto.html?id=${this.getAttribute("id")}" class="btn btn-primary">Comprar</a>
            </div>
        </div>
    `;
      this.appendChild(div);
    }
  }
  
customElements.define("card-item", Card);

async function loadProducts() {

    const response = await fetch("http://localhost:3000/produtos");
    const products = await response.json();
    const container = document.getElementById("product-container");

    products.forEach((produtos) => {
        const productCard = document.createElement("card-item");
        productCard.setAttribute("id", produtos.id);
        productCard.setAttribute("nome", produtos.nome);
        productCard.setAttribute("preco", produtos.preco);
        productCard.setAttribute("img", produtos.img);

        productCard.addEventListener("click", () => {
            window.location.href = `produto.html?id=${produtos.id}`;
        });
        container.appendChild(productCard);
    });
}

loadProducts();

function getProductIdFromUrl(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

async function loadProductDetails() {
    const id = getProductIdFromUrl();
    const response = await fetch(`http://localhost:3000/produtos?id=${id}`);
    const dados = await response.json();

    const produtos = Array.isArray(dados) ? dados[0] : dados;

    const container = document.getElementById("product-details");

    container.innerHTML = `
        <div style="display:flex">
        <i class="bi bi-circle-fill"></i>
        <div>
            <img id="image" src="${produtos.img}" style="height: 300px; margin-left: 60px; margin-top: 40px;">
            <p style="margin-top: 30px; font-size: 24px; margin-bottom: 0; margin-left: 40px;">Avaliação</p>
            <div class="rating">
                <span class="star" style="font-size: 30px; color:rgb(255, 255, 0); margin-left: 40px;">&#9733;</span>
                <span class="star" style="font-size: 30px; color:yellow; ">&#9733;</span>
                <span class="star" style="font-size: 30px; color:yellow;">&#9733;</span>
                <span class="star" style="font-size: 30px; color:yellow;">&#9733;</span>
                <span class="star" style="font-size: 30px; color:yellow;">&#9733;</span>
            </div>
            <section class="avaliacao">
                <h2>Avaliações dos Clientes</h2>
                <div class="comentario">
                    <p>Cliente 1: Ótimos produtos, entrega rápida!</p>
                </div>
                <div class="comentario">
                    <p>Cliente 2: Adorei a variedade de roupas disponíveis.</p>
                </div>
    
                <form action="#" method="post" style="margin-top: 20px;">
                    <label style="display: block;margin-bottom: 5px;" for="nome">Nome:</label>
                    <input class="intext" type="text" id="nome" name="nome" required>
    
                    <label style="display: block;margin-bottom: 5px;" for="comentario">Comentário:</label>
                    <textarea class="intext" id="comentario" name="comentario" rows="4" required></textarea>
    
                    <button class="butaoproduto" type="submit">Adicionar Comentário</button>
                </form>
            </section>
        </div>
        <div style="margin-top: 43px; margin-left: 40px;">
            <h3 id="product-title">${produtos.nome}</h3>
            <p id="price">R$ ${produtos.preco}</p>
            <button type="button" style="margin-bottom: 10px;" class="btn btn-info">8x de R$81,66</button><br/>
            <p>Cor: Amarelo</p>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" style="color:yellow" class="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" style="color: red" class="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" style="color: green" class="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"  style="color:blue"class="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" style="color:darkgoldenrod" class="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" style="color:blueviolet" class="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                </svg>
            </div>
            <p>Tamanho: M</p>
            <div>
                <button type="button" class="btn btn-light">P</button>
                <button type="button" class="btn btn-light">M</button>
                <button type="button" class="btn btn-light">G</button>
                <button type="button" class="btn btn-light">GG</button>
            </div>
            <button id="add-to-cart" style="margin-top: 10px;" type="button" class="btn btn-dark">Adicionar ao Carrinho</button>
        </div>
    </div>
    `;

    document.getElementById('product-title').innerHTML = produtos.nome;
    document.getElementById('price').innerHTML = `Valor: R$ ${produtos.preco}`;
    document.getElementById('image').src = produtos.img;

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    console.log('Carrinho atual:', carrinho);

    document.getElementById('add-to-cart').addEventListener('click', () => {

        const produtoExistente = carrinho.find(item => item.id === id);

        if (!produtoExistente) {
            carrinho.push({ id: id, quantidade: 1 });
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        }

        document.location.href = 'carrinho.html?id=' + id;
    });

}

loadProductDetails();

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function renderCarrinho() {
    const produtosElement = document.getElementById('produtos');
    produtosElement.innerHTML = "";

    carrinho.forEach(item => {
        fetch(`http://localhost:3000/produtos?id=${item.id}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    renderizar(data[0], item.quantidade);
                } else {
                    console.error('Produto não encontrado:', data);
                }
            })
            .catch(error => console.error('Erro ao buscar produto:', error));
    });
}

function renderizar(produto, quantidade) {
    const produtosElement = document.getElementById('produtos');

    produtosElement.innerHTML += `
      <div class="card" id="produto-${produto.id}" style="width: 18rem; margin-bottom: 10px;">
            <img src="${produto.img}" class="card-img-top" alt="${produto.nome}" style="height: 180px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title">${produto.nome}</h5>
                <p class="card-text">Tamanho: M</p>
                <p class="card-text">Cor: ${produto.cor}</p>
                <p class="card-text">Preço Unitário: R$ ${produto.preco.toFixed(2)}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="input-group w-50">
                        <input type="number" value="${quantidade}" min="1" max="10" class="form-control" onchange="atualizarQuantidade(this, ${produto.id}, ${produto.preco})">
                        <span class="input-group-text">Qtd</span>
                    </div>
                    <button class="btn btn-outline-danger" onclick="remover(${produto.id}); return false;">Remover Item</button>
                </div>
                <p class="card-text mt-2">Preço Total: R$ <span id="preco-total-${produto.id}">${(produto.preco * quantidade).toFixed(2)}</span></p>
            </div>
        </div>
    `;

    atualizarSubtotal();
}

function atualizarQuantidade(el, id, precoUnitario) {
    const novaQuantidade = Number(el.value);
    carrinho = carrinho.map(item => {
        if (item.id === id) {
            item.quantidade = novaQuantidade;
        }
        return item;
    });

    // Atualiza o localStorage com a nova quantidade
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza o preço total diretamente na interface
    const precoTotalElement = document.getElementById(`preco-total-${id}`);
    precoTotalElement.textContent = (novaQuantidade * precoUnitario).toFixed(2);

    // Atualiza o subtotal
    atualizarSubtotal();
}

function atualizarSubtotal() {
    let subtotal = 0;
    carrinho.forEach(item => {
        const precoUnitario = item.preco ? item.preco : 0; // Adicione uma verificação de segurança para o preço
        subtotal += precoUnitario * item.quantidade;
    });

    document.getElementById('subtotal').textContent = `Subtotal: R$ ${subtotal.toFixed(2)}`;
}


function remover(id) {
    carrinho.splice(carrinho.indexOf(String(id)), 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    location.href = "carrinho.html";
    renderCarrinho();
}

window.onload = renderCarrinho;
