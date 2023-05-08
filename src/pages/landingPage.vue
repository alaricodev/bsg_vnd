<template>
  <header></header>
  <main>
    <section id="begin" style="width: 100%">
      <div class="" style="width: 100%">
        <div class="row justify-between">
          <q-img src="../../public/fotos/parallax_01.png"> </q-img>
        </div>
      </div>
    </section>
    <section id="quem_somos">
      <div class="two-columns">
        <div>
          <!-- Conteúdo da div esquerda aqui -->
          <div class="text-h4 text-grey-8 q-ma-md">Quem somos</div>
          <div class="text-subtitle2 q-ma-md text-grey-8">
            Seja bem-vindo à nossa padaria ateliê no bairro Estreito em
            Florianópolis! Somos uma empresa especializada em alimentos sem
            glúten e sem leite. Fundada há dois anos, nossa padaria ateliê
            surgiu com o objetivo de oferecer opções saudáveis e saborosas para
            pessoas com intolerâncias alimentares, depois que um de nossos
            familiares foi diagnosticado com intolerância ao glúten e ao leite.
            Desde então, trabalhamos com muito carinho e dedicação para oferecer
            produtos de alta qualidade, utilizando apenas ingredientes
            selecionados e livres de glúten e leite. Nossa equipe é formada por
            profissionais capacitados e comprometidos, que estão sempre buscando
            inovações e aprimoramentos para as receitas. Além disso, também
            contamos com opções veganas e sem açúcar, para atender a diferentes
            necessidades e preferências. Aqui, você encontra uma grande
            variedade de opções para o café da manhã, lanches, sobremesas e
            ocasiões especiais, tudo sem abrir mão do sabor e da qualidade. A
            nossa missão é proporcionar uma experiência gastronômica única e
            satisfatória para todos os clientes, valorizando a saúde e o
            bem-estar. Esperamos por você em nossa padaria ateliê para
            experimentar nossas delícias!
          </div>
        </div>
      </div>
    </section>
    <divisorTela height="1rem" />
    <section id="loc">
      <div class="text-h4 text-grey-8 q-ma-md">Localização</div>
      <div class="text-subtitle2 q-ma-md text-grey-8">
        Venha nos visitar no Bistrô sem Glúten! Nosso espaço acolhedor oferece
        uma grande variedade de produtos sem glúten, desde pães frescos até
        deliciosos bolos dentre outros. Aproveite e conheça a nossa cozinha
        totalmente livre de contaminação cruzada, tornando nossos produtos
        próprios para celíacos. Estamos no coração do Estreito na rua Arnoldo
        Cândido Raulino, 27. Não perca mais tempo e venha conhecer o Bistrô sem
        Glúten hoje mesmo!
      </div>

      <div class="flex flex-center q-ma-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.256749786031!2d-48.585953225527724!3d-27.58556852165129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952737719f43878b%3A0xc7a0e4e182629acf!2zQmlzdHLDtCBzZW0gR2zDunRlbg!5e0!3m2!1spt-BR!2sbr!4v1683456039904!5m2!1spt-BR!2sbr"
          width="600"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
    <divisorTela height="1rem" />
    <section id="cozinha">
      <div class="text-h4 text-grey-8 q-ma-md">Nosso Espaço</div>
      <div class="text-subtitle2 q-ma-md text-grey-8">
        Venha nos visitar no Bistrô sem Glúten! Nosso espaço acolhedor oferece
        uma grande variedade de produtos sem glúten, desde pães frescos até
        deliciosos bolos dentre outros. Aproveite e conheça a nossa cozinha
        totalmente livre de contaminação cruzada, tornando nossos produtos
        próprios para celíacos. Estamos no coração do Estreito na rua Arnoldo
        Cândido Raulino, 27. Não perca mais tempo e venha conhecer o Bistrô sem
        Glúten hoje mesmo!
      </div>
      <div>
        <q-carousel
          swipeable
          animated
          v-model="slide"
          :autoplay="autoplay"
          thumbnails
          infinite
        >
          <q-carousel-slide
            :name="1"
            img-src="../../public/fotos/espaco_01.jpeg"
          />
          <q-carousel-slide
            :name="2"
            img-src="../../public/fotos/espaco_02.jpeg"
          />
          <q-carousel-slide
            :name="3"
            img-src="../../public/fotos/espaco_03.jpeg"
          />
          <q-carousel-slide
            :name="4"
            img-src="../../public/fotos/espaco_04.jpeg"
          />
        </q-carousel>
      </div>
    </section>
  </main>
  <footer>
    <div class="flex flex-center q-ma-md">&copy; 2023 Bistrô sem Glúten</div>
  </footer>
</template>

<script>
import divisorTela from "src/components/divisorTela.vue";
import { ref } from "vue";
export default {
  components: { divisorTela },
  setup() {
    return {
      slide: ref(1),
      autoplay: ref(true),
    };
  },
  mounted() {
    const id = this.$route.params.id;
    console.log(id);
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  },
};
</script>

<style>
.two-columns {
  display: flex;
  flex-wrap: wrap;
}

.two-columns > * {
  width: 100%;
}

.two-columns > .left {
  flex-basis: 50%;
}

@media (min-width: 576px) {
  .two-columns > .left {
    flex-basis: auto;
  }

  .two-columns > .left,
  .two-columns > .right {
    width: auto;
  }

  .two-columns > .left {
    order: 1;
  }

  .two-columns > .right {
    order: 2;
  }
}
</style>
