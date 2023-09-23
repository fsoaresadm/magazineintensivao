import { apagarDoLocalStorage, desenharProdutoNoCarrinhoSimples, lerLocalStorage, salvarLocalStorage, } from "./src/utilidades";

function desenharProdutosCheckout(){
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    for ( const idProduto in idsProdutoCarrinhoComQuantidade) {
        desenharProdutoNoCarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutoCarrinhoComQuantidade[idProduto]);
    }
}

function finalizarCompra(evento) {
    evento.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    if(Object.keys(idsProdutoCarrinhoComQuantidade).lenght === 0){
        return;
    }

    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade
    }
    const historicoDePedidos = lerLocalStorage("historico") ?? [];
    const historicoDepedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

    salvarLocalStorage("historico", historicoDepedidosAtualizado);
    apagarDoLocalStorage("carrinho");

    window.location.href = window.location.origin + "/pedidos.html";

}

desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));