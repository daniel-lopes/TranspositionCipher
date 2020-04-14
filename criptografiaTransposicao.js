let tamanhoMatriz;
let textoMatriz = [];
let textoMatrizCriptografada = [];

function arredondaTamanhoMatriz(texto, chave) {
    tamanhoMatriz = texto.length / chave.length;
    arredondamento = tamanhoMatriz - Math.round(tamanhoMatriz);
    if (arredondamento > 0) {
        tamanhoMatriz = (tamanhoMatriz + 1) - arredondamento;
    } else {
        tamanhoMatriz = tamanhoMatriz - arredondamento;
    }
    return tamanhoMatriz;
}

function montarMatriz(texto, chave) {
    let caractere;
    textoMatrizCriptografada = [];

    if ((texto.length / (tamanhoMatriz * chave.length)) != 1) {
        let diferencaTamanho = (tamanhoMatriz * chave.length) - texto.length;

        for (let i = 0; i < diferencaTamanho; i++) {
            texto += String.fromCharCode(3210);
        }
    }

    for (let i = 0; i < tamanhoMatriz; i++) {
        let arrayTemp = [];
        for (j = 0; j < chave.length; j++) {
            caractere = texto[j + (i * chave.length)] || '';
            arrayTemp.push(caractere);
        }
        textoMatrizCriptografada.push(arrayTemp);
    }
    return textoMatrizCriptografada;
}

function retornarPosicao(i, j) {
    if (j == 0) {
        return i;
    }
    let posicao = i;
    for (i = 0; i < j; i++) {
        posicao += tamanhoMatriz;
    }
    return posicao;
}

function montarMatrizCriptografada(textoCriptografado, chave) {
    let caractere;
    let index;
    let chaveOrdenada = chave.split('').sort();
    let arrayTemp;
    tamanhoMatriz = arredondaTamanhoMatriz(textoCriptografado, chave);
    textoMatrizCriptografada = [];
    for (let i = 0; i < tamanhoMatriz; i++) {
        arrayTemp = [];
        index = chave.indexOf(chaveOrdenada[i]);
        for (j = 0; j < chave.length; j++) {
            caractere = textoCriptografado[retornarPosicao(i, j)];
            arrayTemp.push(caractere);
        }
        textoMatrizCriptografada.push(arrayTemp);
    }
    return textoMatrizCriptografada;
}

function criptografarTransposicao() {
    let texto = document.getElementById('TextoParaCriptografar').value;
    let chave = document.getElementById('chave').value;
    let chaveOrdenada = chave.split('').sort();
    let textoCriptografado = '';
    tamanhoMatriz = arredondaTamanhoMatriz(texto, chave);
    textoMatriz = montarMatriz(texto.replace(/ /g, ''), chave);
    let index;
    for (let i = 0; i < chave.length; i++) {
        index = chave.indexOf(chaveOrdenada[i]);
        for (j = 0; j < tamanhoMatriz; j++) {
            textoCriptografado += textoMatriz[j][index];
        }
    }

    document.getElementById('TextoParaCriptografar').value = null;
    document.getElementById('TextoParaDescriptografar').value = textoCriptografado;
    console.table(textoMatriz);
    console.log(textoCriptografado);
}

function descriptografarTransposicao() {
    let textoCriptografado = document.getElementById('TextoParaDescriptografar').value;
    let chave = document.getElementById('chave').value;
    let chaveOrdenada = chave.split('').sort();
    let textoDescriptografado = '';
    let find = String.fromCharCode(3210);
    let filtro = new RegExp(find, 'g');

    tamanhoMatriz = arredondaTamanhoMatriz(textoCriptografado, chave);
    textoMatriz = montarMatrizCriptografada(textoCriptografado, chave);
    let index;
    for (let i = 0; i < tamanhoMatriz; i++) {
        for (let j = 0; j < chave.length; j++) {
            index = chaveOrdenada.indexOf(chave[j]);
            textoDescriptografado += textoMatriz[i][index];
        }
    }

    textoDescriptografado = textoDescriptografado.replace(filtro, '');
    document.getElementById('TextoParaCriptografar').value = textoDescriptografado;
    document.getElementById('TextoParaDescriptografar').value = null;
    console.table(textoDescriptografado);
    console.table(textoMatriz);
}