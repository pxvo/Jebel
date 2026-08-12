/* =========================================================
   JEBEL CONSULTORIA FINANCEIRA
   JavaScript principal
   ========================================================= */


/* ==================== CONFIGURAÇÃO ==================== */

const WHATSAPP_NUMBER = "5555984058480";


/* ==================== MENU MOBILE ==================== */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );

    });


    /* Fecha o menu quando clicar em algum link */

    mainNav.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        });

    });

}


/* ==================== ANO AUTOMÁTICO DO FOOTER ==================== */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* ==================== MÁSCARA DE TELEFONE ==================== */

const telefoneInput = document.getElementById("telefone");

if (telefoneInput) {

    telefoneInput.addEventListener("input", (event) => {

        let value = event.target.value.replace(/\D/g, "");

        /* Limita a 11 números */

        if (value.length > 11) {
            value = value.slice(0, 11);
        }


        /* Celular */

        if (value.length > 10) {

            value = value.replace(
                /^(\d{2})(\d{5})(\d{0,4}).*/,
                "($1) $2-$3"
            );

        }

        /* Telefone fixo */

        else if (value.length > 6) {

            value = value.replace(
                /^(\d{2})(\d{4})(\d{0,4}).*/,
                "($1) $2-$3"
            );

        }

        /* Apenas DDD + número parcial */

        else if (value.length > 2) {

            value = value.replace(
                /^(\d{2})(\d{0,5}).*/,
                "($1) $2"
            );

        }

        /* Começando o telefone */

        else if (value.length > 0) {

            value = value.replace(
                /^(\d*)/,
                "($1"
            );

        }


        event.target.value = value;

    });

}


/* ==================== LINKS "SAIBA MAIS" ==================== */

const serviceLinks = document.querySelectorAll("[data-service]");

const serviceSelect = document.getElementById("servico");


serviceLinks.forEach((link) => {

    link.addEventListener("click", () => {

        const selectedService = link.dataset.service;

        if (serviceSelect && selectedService) {

            serviceSelect.value = selectedService;

        }

    });

});


/* ==================== FORMULÁRIO → WHATSAPP ==================== */

const contactForm = document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        /* Impede o formulário de recarregar a página */

        event.preventDefault();


        /* Pega os valores dos campos */

        const nome = document
            .getElementById("nome")
            .value
            .trim();


        const telefone = document
            .getElementById("telefone")
            .value
            .trim();


        const email = document
            .getElementById("email")
            .value
            .trim();


        const servico = document
            .getElementById("servico")
            .value;


        const mensagem = document
            .getElementById("mensagem")
            .value
            .trim();


        /* Verifica os campos obrigatórios */

        if (
            !nome ||
            !telefone ||
            !servico ||
            !mensagem
        ) {

            alert(
                "Por favor, preencha todos os campos obrigatórios."
            );

            return;

        }


        /* Monta a mensagem que será enviada */

        const texto = [

            "Olá, JEBEL! Gostaria de solicitar atendimento.",

            "",

            `*Nome:* ${nome}`,

            `*Telefone:* ${telefone}`,

            `*E-mail:* ${email || "Não informado"}`,

            `*Serviço:* ${servico}`,

            `*Mensagem:* ${mensagem}`

        ].join("\n");


        /* Cria o endereço do WhatsApp */

        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;


        /* Abre o WhatsApp */

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

}


/* ==================== FECHAMENTO DO MENU AO REDIMENSIONAR ==================== */

window.addEventListener("resize", () => {

    if (
        window.innerWidth > 760 &&
        mainNav &&
        menuToggle
    ) {

        mainNav.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menu"
        );

    }

});