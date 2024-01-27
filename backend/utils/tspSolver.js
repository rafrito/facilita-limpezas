function calculaDistancia(ponto1, ponto2) {
    return Math.sqrt(Math.pow(ponto1.x - ponto2.x, 2) + Math.pow(ponto1.y - ponto2.y, 2));
}

function getKey(subconjunto, proxPonto) {
    return subconjunto.join(',') + '-' + proxPonto;
}

// Algoritmo para solução do problema TSP
function heldKarp(pontos) {
    // Inicia a matriz de distâncias entre os pontos
    const n = pontos.length;
    const distancias = Array.from(Array(n), () => Array(n).fill(0));

    // Cria uma memória para os caminhos já calculados
    const memo = {};

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            distancias[i][j] = calculaDistancia(pontos[i], pontos[j]);
        }
    }

    // Função recursiva, resolve o TSP para um subconjunto de pontos e um ponto final específico.
    // tsp Dynamic Programming
    function tspDP(subconjunto, proxPonto) {
        // Se proxPonto é o único ponto no conjunto, então é o caso base
        // ou seja, retorno a distância entre zero e proxPonto
        subconjunto = subconjunto.filter(p => p !== proxPonto);
        if (subconjunto.length === 0) return { distancia: distancias[0][proxPonto], caminho: [0, proxPonto] };

        // Gerando identificador de conjunto e salvando o caminho
        // Se a solução já existe na memória, então eu retorno ela
        const key = getKey(subconjunto, proxPonto);
        if (memo[key]) return memo[key];

        // Para o caso de proxPonto não ser o único ponto no conjunto, quero saber
        // qual o custo mínimo do conjunto complementar a ele e pegar o menor
        // custo inserindo ele em qualquer local na sequencia da rota
        let menorDistancia = Infinity;
        let menorCaminho = [];
        subconjunto.forEach(ponto => {
            const { distancia, caminho } = tspDP(subconjunto, ponto);
            const currentdistancia = distancia + distancias[ponto][proxPonto];
            if (currentdistancia < menorDistancia) {
                menorDistancia = currentdistancia;
                menorCaminho = caminho.concat(proxPonto);
            }
        });

        memo[key] = { distancia: menorDistancia, caminho: menorCaminho };
        return memo[key];
    };


    // O início da função. Queremos saber o menor caminho do conjunto quando
    // adicionamos o zero e por fim adicionar ele no retorno

    const subconjunto = [...Array(n).keys()];
    const { distancia, caminho } = tspDP(subconjunto, 0);

    return { distancia, caminho };
};

module.exports = { heldKarp };