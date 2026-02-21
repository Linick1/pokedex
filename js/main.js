document.getElementById("buscarData").addEventListener("click", async (noDefault) => {
    noDefault.preventDefault()

        const idPokemon = document.getElementById("idPokemon").value

    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)

        if (!resposta.ok) {
            throw new Error('Erro ao buscar dados: ' + resposta.status)
        }

        const dados = await resposta.json()

        document.getElementById("id").value = dados.id
         document.getElementById("name").value = dados.name

        console.log(idPokemon.value);
        console.log(dados)
    } catch (erro) {
        console.error('Falha na requisição:', erro)
    }
}

)

