var cliqua = document.getElementsByClassName("btn-carrinho")


function buscarCEP(){
    const cep = document.getElementById('cep').value.replace(/\D/g,'');
    if(cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(dados => {
            if(!dados.erro){
                document.getElementById('rua').value = dados.logradouro;
                document.getElementById('bairro').value = dados.bairro;
                document.getElementById('cidade').value = dados.localidade;
                document.getElementById('estado').value = dados.uf;
                document.getElementsByClassName('paga').value = dados.dinheiro
            }
        });
}


function enviarPedido() {
    const nome = document.getElementById('nome').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const num = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();

    // pegar forma de pagamento correta
    const pagamentoSelecionado = document.querySelector('input[name="paga"]:checked');

    if (!pagamentoSelecionado) {
        alert("Escolha uma forma de pagamento!");
        return;
    }

    const formaPagamento = pagamentoSelecionado.value;

    if (!nome || itensPedido.length === 0 || !rua) {
        alert("Preencha seu nome, endereço e adicione itens ao carrinho!");
        return;
    }

    const listaParaWhatsApp = itensPedido
        .map(sabor => `Pizza ${sabor}`)
        .join('\n- ');

    const mensagem = encodeURIComponent(
`🍕 *NOVO PEDIDO - PIZZABOX* 🍕

👤 *Cliente:* ${nome}
📍 *Endereço:* ${rua}, Nº ${num}
🏘️ *Bairro:* ${bairro}
*Cidade:* ${cidade}
*Estado:* ${estado}



💳 *Pagamento:* ${formaPagamento}

🛒 *ITENS:*
- ${listaParaWhatsApp}

💰 *TOTAL:* R$ ${totalCarrinho.toFixed(2).replace('.', ',')}
`
    );

    const fone = "556195756256";
    window.open(`https://wa.me/${fone}?text=${mensagem}`, '_blank');
}
