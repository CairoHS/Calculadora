
class Calculadora {

    constructor(calc) {
        this.calculadora = calc;
        this.tela = calc.querySelector("#telaCalculadora");
        this.subtela = calc.querySelector("#subtelaCalculadora");
        this.guardaTela = "";
        this.guardaSubtela = "";
        this.guardaSimbolo = " "
        this.botoes = calc.querySelectorAll("[data-botao]");
    }

    ligandoCalculadora() {
        this.botoes.forEach(element => {
            let identificador = element.dataset.botao;
            switch (identificador) {
                case "numero":
                    element.addEventListener("click", () => {
                        this.#adicionarNumero(element.innerHTML)
                    });
                    break;
                case "simbolo":
                    element.addEventListener("click", () => {
                        this.#adicionarSimbolo(element.innerHTML)
                    });

                    break;
                case "ponto":
                    element.addEventListener("click", () => {
                        this.#adicionarPonto();
                    });
                    break;
                case "apagar":
                    element.addEventListener("click", () => {
                        this.#apagaTela();
                    });
                    break;
                case "igual":
                    element.addEventListener("click", () => {
                        this.#igual();
                    });
                    break;
            }
        })
    }

    #adicionarNumero(numero) {
        if(this.guardaTela.replace(".","").length >= 10)
        return;


        if (this.guardaTela == '0' || isNaN(parseFloat(this.guardaTela))) 
            this.guardaTela = numero;


        else
            this.guardaTela += numero

        this.#passaParaTela()
    }

    #adicionarSimbolo(simbolo) {

        this.guardaSimbolo = simbolo;

        if(isNaN(parseFloat(this.guardaTela))){
            this.guardaTela = "0"; 
        }
        else
        this.guardaSubtela = this.guardaTela;
        this.guardaTela = "0";

        if (this.guardaSubtela === ""){
            console.log("oi");
            this.guardaSubtela = '0';

        }

        this.#passaParaTela();
    }

    #passaParaTela() {

        this.tela.innerText = "" + this.guardaTela;
        this.subtela.innerText = this.guardaSubtela + " " + this.guardaSimbolo;
    }

    #igual() {
        let variavel = 0;
        let num1 = parseFloat(this.guardaTela)
        let num2 = parseFloat(this.guardaSubtela)
        console.log(num1, num2)
        switch (this.guardaSimbolo) {
            case '+':
                variavel = num2 + num1;
                break;
            case '-':
                variavel = num2 - num1;
                break;
            case 'x':
                variavel = num2 * num1;
                break;
            case '/':
                if( num1 !=0 && num2 !=0)
                variavel = num2 / num1;
                break;
        }

        if (variavel > (10 ** 10) - 1) {
            this.guardaTela = "Invalido!";
            this.guardaSubtela = "";
            this.guardaSimbolo = "";
        }
        else {
            let variavelString = variavel.toString();
            let tamanho = variavelString.replace(".", "").length;
            this.guardaSubtela = "";
            this.guardaTela = (tamanho > 10) ? variavelString.slice(0, 10 - tamanho) : variavel;
            this.guardaSimbolo = ""
        }
        this.#passaParaTela();
    }

    #adicionarPonto() {
        if (!this.guardaTela.includes('.'))
            this.guardaTela += '.';
        this.#passaParaTela();
    }

    #apagaTela() {
        this.guardaTela = "0"
        this.guardaSubtela = ""
        this.guardaSimbolo = ""
        this.#passaParaTela();
    }


}


let calculadora = document.querySelector(".calculadora");


let calc1 = new Calculadora(calculadora);
calc1.ligandoCalculadora();
