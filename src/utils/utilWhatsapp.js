// FUNÇÕES REFERENTE AO WHATSAPP
// function espacoEmBranco(str) {
//   return str.replace(" ", "%20");
// }
export function linkInicial(telefone) {
  return `https://wa.me/55${telefone}?text=`;
}

export function paragrafo(str) {
  return str;
}

export function lista(frases) {
  let retorno = "";

  retorno += "*PRODUTOS*%0A";

  frases.forEach((item) => {
    retorno += `- ${item}%0A`;
  });

  return retorno;
}

//module.exports = { espacoEmBranco, linkInicial, paragrafo, separador, lista };
