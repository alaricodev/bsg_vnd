import { defineStore } from "pinia";
import produtos from "../assets/data/data.json";

export const useStore = defineStore("Store", {
  state: () => ({
    produtos,
    counter: 0,
    carrinhoItem: false,
    carrinhoTotal: 0,
    produtoSel: null,
    carrinho: [],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
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
  },
});
