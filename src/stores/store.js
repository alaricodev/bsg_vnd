import { defineStore } from "pinia";
import produtos from "../assets/data/data.json";
import destaques from "../assets/data/destaques.json";

export const useStore = defineStore("Store", {
  state: () => ({
    produtos,
    destaques,
    carrinhoItem: false,
    carrinhoTotal: 0,
    produtoSel: null,
    carrinho: [],
    carrinhoAberto: false,
    filtros: ["Todos", "Pães", "Bolos", "Lanches", "Sobremesas", "Rocamboles"],
    filtroSelecionado: "Todos",
    telaFiltro: true,
  }),
  getters: {
    totalCarrinho: (state) =>
      state.carrinho.reduce((soma, item) => soma + item.total, 0),
    totalItens: (state) => state.carrinho.length,
    categorias: (state) =>
      state.produtos
        .map((p) => p.categoria)
        .filter((c, i, arr) => arr.indexOf(c) === i),
  },
  actions: {
    selecionaProduto(id) {
      const objetoTemp = this.produtos.find((item) => item.id == id);
      this.produtoSel = objetoTemp;
    },
    adicionarCarrinho(id, qtd) {
      const objetoTemp = this.produtos.find((item) => item.id == id);
      this.carrinho.push({
        id: id,
        qtd: qtd,
        valor: parseFloat(objetoTemp.preco.replace(",", ".")),
        total: parseFloat(objetoTemp.preco.replace(",", ".")) * qtd,
        nome: objetoTemp.nome,
      });
      this.carrinhoItem = true;
      this.carrinhoTotal = this.carrinho.reduce(
        (soma, item) => soma + item.total,
        0
      );
    },
    isMobile() {
      return screen.width < 600;
    },
  },
});
