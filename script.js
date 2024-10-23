async function buscarEndereco(cep) {
    const mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    if (cep.length != 8) {
        mensagemErro.innerHTML = `<p>CEP deve ter 8 dígitos.</p>`;
        return;
    }
    try {
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }
        preencherCamposEndereco(consultaCEPConvertida);
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
    }
}

function preencherCamposEndereco(endereco) {
    const estado = document.getElementById('estado');
    const cidade = document.getElementById('cidade');
    const bairro = document.getElementById('bairro');
    const logradouro = document.getElementById('endereco');

    estado.value = endereco.uf;
    cidade.value = endereco.localidade;
    bairro.value = endereco.bairro;
    logradouro.value = endereco.logradouro;
}

const cepInput = document.getElementById('cep');
cepInput.addEventListener("focusout", () => buscarEndereco(cepInput.value));
