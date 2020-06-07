const buttonSearch = document.querySelector("#page-home main a") //quaando eu clicar no button search
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")  //quando eu clicar no button search ele remove o botao hide
})

close.addEventListener("click", () => { //quando eu clicar no A, ele vai executar uma funçao anonima que chama o a classe modal e adiciona o hide
    modal.classList.add("hide")
})
