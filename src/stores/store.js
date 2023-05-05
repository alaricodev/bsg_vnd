import { defineStore } from "pinia";
import produtos from "../assets/data/data.json";
import destaques from "../assets/data/destaques.json";
import { v4 as uuidv4 } from "uuid";

export const useStore = defineStore("Store", {
  state: () => ({
    produtos,
    destaques,
    carrinhoItem: false,
    carrinhoTotal: 0,
    produtoSel: null,
    carrinho: [],
    carrinhoAberto: false,
    telaFiltro: true,
  }),
  getters: {
    totalCarrinho: (state) =>
      state.carrinho.reduce((soma, item) => soma + item.total, 0),
    totalItens: (state) =>
      state.carrinho.reduce((soma, item) => soma + item.qtd, 0),
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
    adicionarCarrinho(idProd, qtd) {
      const objetoTemp = this.produtos.find((item) => item.id == idProd);
      const existeCarrinho = this.carrinho.find(
        (item) => item.idProd == idProd
      );

      if (existeCarrinho) {
        this.carrinho.forEach((item) => {
          if (item.idProd == idProd) {
            item["qtd"] = item["qtd"] + qtd;
            item["total"] = item["total"] + item["valor"];
          }
        });
      } else {
        this.carrinho.push({
          id: uuidv4(),
          idProd: idProd,
          qtd: qtd,
          valor: parseFloat(objetoTemp.preco.replace(",", ".")),
          total: parseFloat(objetoTemp.preco.replace(",", ".")) * qtd,
          nome: objetoTemp.nome,
        });
      }

      this.carrinhoItem = true;
      this.carrinhoTotal = this.carrinho.reduce(
        (soma, item) => soma + item.total,
        0
      );
    },
    retiraCarrinho(id) {
      this.carrinho = this.carrinho.filter((item) => {
        return item.id != id;
      });

      if (this.carrinho.length == 0) {
        this.carrinhoItem = false;
      }
    },
    isMobile() {
      return screen.width < 600;
    },
  },
});
