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
    carrinho: [],
    carrinhoAberto: false,
    // Fechamento do pedido
    tipoPagamento: null,
    dataPedido: null,
    opcaoFrete: null,
    dadosCliente: [],
    // localStorage
    lsCarrinhoKey: "bsgcart",
    lsCliKey: "bsgcli",
    // Configurações
    telefoneWhatsApp: "48991832514",
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
    dadosProduto(idProd) {
      return this.produtos.find((item) => item.id == idProd);
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

      this.salvarLs(this.lsCarrinhoKey, this.carrinho);
    },
    retiraCarrinho(id) {
      this.carrinho = this.carrinho.filter((item) => {
        return item.id != id;
      });

      if (this.carrinho.length == 0) {
        this.carrinhoItem = false;
        // Caso o carrinho esteja vazio, eu removo o coockie
        this.apagarLs(this.lsCarrinhoKey);
      } else {
        // Caso o carrinho não esteja vazio, eu apenas atualizo
        this.salvarLs(this.lsCarrinhoKey, this.carrinho);
      }
    },
    limparCarrinho() {
      (this.carrinhoItem = false),
        (this.carrinhoTotal = 0),
        (this.carrinho = []),
        (this.carrinhoAberto = false),
        (this.opcaoFrete = null);
    },
    insereDadosCarrinho(pagamento, dataPedido) {
      this.tipoPagamento = pagamento;
      this.dataPedido = dataPedido;
    },
    isMobile() {
      return screen.width < 600;
    },
    mudaOpcaoFrete(valor) {
      this.opcaoFrete = valor;
    },
    // Operações com cookies
    carregarLs(nome) {
      const cartJSON = localStorage.getItem(nome);
      return cartJSON ? JSON.parse(cartJSON) : [];
    },
    salvarLs(nome, valor) {
      localStorage.setItem(nome, JSON.stringify(valor));
    },
    apagarLs(nome) {
      localStorage.removeItem(nome);
    },
  },
});
