import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById('graficoDolar')

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dólar',
            data: [],
            borderWidth: 1
        }]
    },
});

function geraHorario() {
    let data = new Date()
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    return horario;
}

function adicionarDados(grafico, legendas, dados) {
    grafico.data.labels.push(legendas)
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados)
    })

    grafico.update()
}

let workerDolar = new Worker ('./script/worker/workerDolar.js');
workerDolar.postMessage('usd')

workerDolar.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("dolar", valor)
    adicionarDados(graficoParaDolar, tempo, valor);
})

const graficoIene = document.getElementById('graficoIene')
const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Iene',
            data: [],
            borderWidth: 1
        }]
    },
});

let workerIene = new Worker ('./script/worker/workerIene.js');
workerIene.postMessage('iene')

workerIene.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("iene", valor)
    adicionarDados(graficoParaIene, tempo, valor);
})

const graficoBtc = document.getElementById('graficoBtc')
const graficoParaBtc = new Chart(graficoBtc, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Bitcoin',
            data: [],
            borderWidth: 1
        }]
    },
});

let workerBtc = new Worker ('./script/worker/workerBtc.js');
workerBtc.postMessage('bitcoin')

workerBtc.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("bitcoin", valor)
    adicionarDados(graficoParaBtc, tempo, valor);
})