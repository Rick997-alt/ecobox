/* =========================
   ELEMENTOS
========================= */

const nomeEmpresa =
    document.getElementById("nomeEmpresa");

const nomePreview =
    document.getElementById("nomePreview");

const nomeHero =
    document.getElementById("nomeHero");

const nomeMini =
    document.getElementById("nomeMini");


const botoesCor =
    document.querySelectorAll(".cor");

const corPersonalizada =
    document.getElementById("corPersonalizada");

const caixaPersonalizada =
    document.getElementById("caixaPersonalizada");

const codigoCor =
    document.getElementById("codigoCor");


const corNomeLogo =
    document.getElementById("corNomeLogo");

const codigoCorNome =
    document.getElementById("codigoCorNome");


const logoInput =
    document.getElementById("logoInput");

const logoImagem =
    document.getElementById("logoImagem");

const logoPadrao =
    document.getElementById("logoPadrao");

const removerLogo =
    document.getElementById("removerLogo");


const logoHeroImagem =
    document.getElementById("logoHeroImagem");

const logoHeroPadrao =
    document.getElementById("logoHeroPadrao");


/* =========================
   MUDAR NOME
========================= */

nomeEmpresa.addEventListener("input", function () {

    let nome = this.value.trim();

    if (nome === "") {
        nome = "EcoBox";
    }

    nomePreview.textContent = nome;

    nomeHero.textContent = nome;

    nomeMini.textContent = nome;

    caixaPersonalizada.classList.remove("mudando");

    void caixaPersonalizada.offsetWidth;

    caixaPersonalizada.classList.add("mudando");

});


/* =========================
   MUDAR COR DA CAIXA
========================= */

function mudarCor(cor, botao = null) {

    const frente =
        caixaPersonalizada.querySelector(
            ".preview-frente"
        );

    const tampa =
        caixaPersonalizada.querySelector(
            ".preview-tampa"
        );


    frente.style.backgroundColor = cor;

    tampa.style.backgroundColor =
        clarearCor(cor);

    frente.style.borderColor =
        escurecerCor(cor);

    tampa.style.borderColor =
        escurecerCor(cor);

    codigoCor.textContent =
        cor.toUpperCase();


    botoesCor.forEach(function (item) {

        item.classList.remove("ativa");

    });


    if (botao) {

        botao.classList.add("ativa");

    }


    caixaPersonalizada.classList.remove(
        "mudando"
    );

    void caixaPersonalizada.offsetWidth;

    caixaPersonalizada.classList.add(
        "mudando"
    );

}


/* =========================
   BOTÕES DE CORES
========================= */

botoesCor.forEach(function (botao) {

    botao.addEventListener(
        "click",
        function () {

            const cor =
                botao.getAttribute("data-cor");

            mudarCor(cor, botao);

        }
    );

});


/* =========================
   COR PERSONALIZADA DA CAIXA
========================= */

corPersonalizada.addEventListener(
    "input",
    function () {

        mudarCor(this.value);

    }
);


/* =========================
   COR DO NOME E DA LOGO
========================= */

corNomeLogo.addEventListener(
    "input",
    function () {

        const cor = this.value;


        /* Nome da caixa */

        nomePreview.style.color = cor;


        /* Logo padrão */

        logoPadrao.style.color = cor;


        /* Nome no topo */

        nomeHero.style.color = cor;


        /* Logo padrão do topo */

        logoHeroPadrao.style.color = cor;


        /* Nome da mini caixa */

        nomeMini.style.color = cor;


        /* Mostra o código */

        codigoCorNome.textContent =
            cor.toUpperCase();

    }
);


/* =========================
   UPLOAD DA LOGO
========================= */

logoInput.addEventListener(
    "change",
    function () {

        const arquivo = this.files[0];


        if (!arquivo) {
            return;
        }


        if (!arquivo.type.startsWith("image/")) {

            alert(
                "Por favor, escolha uma imagem."
            );

            logoInput.value = "";

            return;
        }


        const leitor =
            new FileReader();


        leitor.onload = function (evento) {

            const imagem =
                evento.target.result;


            /* Logo da caixa */

            logoImagem.src = imagem;

            logoImagem.style.display =
                "block";

            logoPadrao.style.display =
                "none";


            /* Logo do início */

            logoHeroImagem.src =
                imagem;

            logoHeroImagem.style.display =
                "block";

            logoHeroPadrao.style.display =
                "none";

        };


        leitor.readAsDataURL(arquivo);

    }
);


/* =========================
   REMOVER LOGO
========================= */

removerLogo.addEventListener(
    "click",
    function () {

        logoInput.value = "";

        logoImagem.src = "";

        logoImagem.style.display =
            "none";

        logoPadrao.style.display =
            "block";


        logoHeroImagem.src = "";

        logoHeroImagem.style.display =
            "none";

        logoHeroPadrao.style.display =
            "block";

    }
);


/* =========================
   ESCURECER COR
========================= */

function escurecerCor(cor) {

    let numero =
        parseInt(
            cor.replace("#", ""),
            16
        );


    let vermelho =
        (numero >> 16) - 30;

    let verde =
        ((numero >> 8) & 255) - 30;

    let azul =
        (numero & 255) - 30;


    vermelho =
        Math.max(0, vermelho);

    verde =
        Math.max(0, verde);

    azul =
        Math.max(0, azul);


    return "#" +
        (
            (vermelho << 16) |
            (verde << 8) |
            azul
        )
        .toString(16)
        .padStart(6, "0");

}


/* =========================
   CLAREAR COR
========================= */

function clarearCor(cor) {

    let numero =
        parseInt(
            cor.replace("#", ""),
            16
        );


    let vermelho =
        Math.min(
            255,
            (numero >> 16) + 25
        );

    let verde =
        Math.min(
            255,
            ((numero >> 8) & 255) + 25
        );

    let azul =
        Math.min(
            255,
            (numero & 255) + 25
        );


    return "#" +
        (
            (vermelho << 16) |
            (verde << 8) |
            azul
        )
        .toString(16)
        .padStart(6, "0");

}