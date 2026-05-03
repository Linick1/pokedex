let offset = 0
let load = false
let idPokemonVerify = document.getElementById("idPokemon").value
const limit = 9
const list = document.getElementById("pokemon-group-card")

async function loadPokemons() {
    if (load) return
    load = true

    try {
        const idPokemonVerify = document.getElementById("idPokemon").value
        if (idPokemonVerify) {
            list.innerHTML = ""
            offset = 0

            const getPokeApiId = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon.value}`)
            if (!getPokeApiId.ok) {
                alert("Este pokemon ainda não existe")
                throw new Error('Erro ao buscar Pokémon') 
            }

            const pokeApiDataId = await getPokeApiId.json()
            const pokeFormatValueHeight = pokeApiDataId.height
            const pokeFormatValuesWeight = pokeApiDataId.weight

            function formatHeight() {
                return (pokeFormatValueHeight / 10).toLocaleString('pt-BR', {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                })
            }
            function formatWeight() {
                return (pokeFormatValuesWeight / 10).toLocaleString('pt-BR', {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                })
            }

            document.getElementById("id").innerText = pokeApiDataId.id
            document.getElementById("name").innerText = pokeApiDataId.name
            document.getElementById("height").innerText = formatHeight()
            document.getElementById("weight").innerText = formatWeight()
            document.getElementById("pokemon-solo-card").classList.remove("hidden")
            document.getElementById("pokemon-group-card").classList.add("hidden")
            document.getElementById("poke-icon").src = pokeApiDataId.sprites.front_default

            load = false
            return

        } else {
            if (offset === 0) {
                list.innerHTML = ""
            }
        }

        const getPokeApi = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        const pokeApiData = await getPokeApi.json()

        if (!getPokeApi.ok) {
            throw new Error('Erro ao buscar dados: ' + getPokeApi.status)
        }

        document.getElementById("pokemon-solo-card").classList.add("hidden")
        document.getElementById("pokemon-group-card").classList.remove("hidden")

        const searchDataBtn = document.getElementById("searchData")
        if (searchDataBtn) searchDataBtn.disabled = false

        for (const pokemon of pokeApiData.results) {
            document.body.classList.remove("remove-hidden-overflow")

            const card = document.createElement("div")
            card.classList.add("pokemon-group-card")

            const returnPokemonInfo = await fetch(pokemon.url)
            const details = await returnPokemonInfo.json()

            card.innerHTML = `
            <p>ID: ${details.id}
            <p>Nome: ${details.name}
            <img src="${details.sprites.front_default}">
            `
            list.appendChild(card)
        }

        offset += limit

    } catch (erro) {
        console.error('Falha na requisição:', erro)
    } finally {
        load = false
    }
}

document.getElementById("searchData").addEventListener("click", noDefault => {
    noDefault.preventDefault()
    offset = 0
    loadPokemons()

    window.addEventListener("scroll", () => {
        const idPokemonVerify = document.getElementById("idPokemon").value
        if (idPokemonVerify !== "") return;

        const finalLoad = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY)
        if (finalLoad < 7) {
            loadPokemons()
        }
    })
})