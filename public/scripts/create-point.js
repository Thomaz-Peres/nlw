function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados") //buscou os estados no site
    .then( res => res.json() ) // transformou num json
    .then( states => {  //depois dele transformar

        for( const state of states) {   //ele vai rodar essa funcao 
            ufSelect.innerHTML += ` <option value = "${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex  //me fala o numero do selected index
    stateInput.value = event.target.options[indexOfSelectedState].text

    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"  //reescreve o conteudo
    citySelect.disabled = true  //bloqueia novamente

    fetch(url) //buscou os estados no site
    .then(res => res.json()) // transformou num json
    .then(cities => {  //depois dele transformar

        for (const city of cities) {   //ele vai rodar essa funcao 
            citySelect.innerHTML += ` <option value = "${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}




document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//itens de coleta--------------------
//pegando todos li's
const itemsToCollect = document.querySelectorAll(".items-grid li")  //todos que estiver dentro doitems-grid li, coloca no itemstocollect

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

//atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) { //toda vez que o evento é disparado, ele passa para a funçao um evento
    const itemLi = event.target
    
    //adicionar ou remover uma classe com javascript 
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)

    //verificando se a itens selecionados, se sim
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso sera true ou false
        return itemFound
    })

    //se ja estiver selecionado, 
    if(alreadySelected >= 0) {
        //remover da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        //se nao estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems)

    
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}