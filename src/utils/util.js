import { linkInicial, paragrafo, lista } from "../utils/utilWhatsapp.js";

export function mensagemZap(dados) {
  console.log(dados);
  const forCurr = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const linhasListaProduto = [];
  dados.produtos.forEach((item) => {
    linhasListaProduto.push(
      `${item.nome} - ${item.qtd} X ${forCurr.format(item.valor)}`
    );
  });

  return (
    linkInicial(dados.telefoneEnvio) +
    paragrafo("%F0%9F%8D%9E _*Bem vindo ao Bistrô sem Glúten*_ %0A") +
    paragrafo("*DADOS DO PEDIDO*" + "%0A") +
    paragrafo("%0A") +
    paragrafo(`_${dados.header}_%0A%0A`) +
    paragrafo("--------------------------------------------------%0A") +
    lista(linhasListaProduto) +
    paragrafo("--------------------------------------------------%0A") +
    paragrafo(`%F0%9F%92%B5 Valor: ${forCurr.format(dados.subtotal)}%0A`) +
    paragrafo(`%F0%9F%9A%9A Frete: _${forCurr.format(dados.valorFrete)}_`) +
    paragrafo("%0A--------------------------------------------------%0A") +
    paragrafo(`%F0%9F%92%B0 TOTAL: *${forCurr.format(dados.valorTotal)}*`) +
    paragrafo("%0A----------------------------------------%0A") +
    paragrafo(
      `%F0%9F%93%85 Entrega: *${formatarDataString(dados.dataPedido)}*%0A`
    ) +
    paragrafo(`Forma de Pagamento: *${dados.tipoPagamento}*`) +
    paragrafo("%0A----------------------------------------%0A") +
    paragrafo("*CLIENTE*%0A") +
    paragrafo(`%F0%9F%91%A9 Nome: _${dados.cliente.nome}_%0A`) +
    paragrafo(
      `%E2%98%8E%EF%B8%8F Telefone: _*${dados.cliente.telefone}*_%0A%0A`
    ) +
    paragrafo(`*ENDEREÇO DE ENTREGA*%0A`) +
    (dados.opEntrega == "e"
      ? paragrafo(
          `${dados.cliente.logradouro}, ${dados.cliente.numero} - ${dados.cliente.complemento} - ${dados.cliente.bairro} - ${dados.cliente.cidade} - CEP: ${dados.cliente.cep}%0A`
        )
      : "") +
    paragrafo("%0A") +
    paragrafo(`%0A_${dados.footer}_%0A`) +
    paragrafo("%F0%9F%99%8F %F0%9F%91%8F %F0%9F%A5%B0 %F0%9F%A4%97")
  );
}

export function validarTelefone(numero) {
  if (numero == null) {
    return false;
  }

  // Remova quaisquer caracteres que não sejam números
  var numeroLimpo = numero.replace(/\D/g, "");

  // O número deve ter 10 ou 11 dígitos
  if (numeroLimpo.length < 10) {
    return false;
  }

  // O número não pode começar com 55, 56, 57 ou 58
  var codigoArea = numeroLimpo.substr(0, 2);
  if (
    codigoArea === "55" ||
    codigoArea === "56" ||
    codigoArea === "57" ||
    codigoArea === "58"
  ) {
    return false;
  }

  // O número parece ser válido
  return true;
}

export function validarCEP(cep) {
  if (cep == null) {
    return false;
  }

  // Remove quaisquer caracteres que não sejam números
  var cepLimpo = cep.replace(/\D/g, "");

  // O CEP deve ter exatamente 8 dígitos
  if (cepLimpo.length !== 8) {
    return false;
  }

  // O primeiro dígito não pode ser zero
  if (cepLimpo.charAt(0) === "0") {
    return false;
  }

  // O CEP parece ser válido
  return true;
}

export function formatarDataString(dataString) {
  const partesData = dataString.split("/");
  const dia = partesData[2];
  const mes = partesData[1];
  const ano = partesData[0];
  return `${dia}/${mes}/${ano}`;
}

// module.exports = {
//   validarTelefone,
//   validarCEP,
//   formatarDataString,
//   mensagemZap,
// };
