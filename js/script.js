  
var horasTexto = document.getElementById('horas');
var agora = new Date();

// transforma hora atual em minutos
var horaEmMinutos = agora.getHours() * 60 + agora.getMinutes();

var aberto = 18 * 60;   // 18:00
var fechado = 23 * 60; // 23:00
var pizzariaAberta = false;

// VERIFICA HORÁRIO
if (horaEmMinutos >= aberto && horaEmMinutos <= fechado) {
    horasTexto.innerHTML = "✅ ABERTO - Faça seu pedido!";
    horasTexto.style.backgroundColor = "#08954C";
    pizzariaAberta = true;
} else {
    horasTexto.innerHTML = "❌ FECHADO - Abrimos às 18:00";
    horasTexto.style.backgroundColor = "#ff0000";
    pizzariaAberta = false;
}

// BOTÃO DO MENU
function toggleMenu() {
    if (pizzariaAberta) {
        document.getElementById('menuPedido').classList.toggle('aberto');
    } else {
        alert("A pizzaria está fechada. Abrimos às 18:00.");
    }
}

let totalCarrinho = 0;
let quantidadePizzas = 0;
let itensPedido = []; // Lista para guardar os nomes das pizzas

function atualizarCarrinho() {
    document.getElementById('quantidade').innerText = quantidadePizzas;
    document.getElementById('total').innerText = totalCarrinho.toFixed(2).replace('.', ',');
}
 document.querySelectorAll('.btn-carrinho').forEach(function(botao) {
    botao.addEventListener('click', function() {

        // ... seu código anterior de pegar box, nomePizza, precoPizza ...

        const box = botao.closest('.box');
        const nomePizza = box.querySelector('h4').innerText;
        const precoPizza = box.querySelector('p strong').innerText;
        let precoNum = parseFloat(precoPizza.replace('R$ ', '').replace(',', '.'));

        // Identifica se é bebida ou pizza pelo contexto de onde está:
        // se estiver dentro de um cardápio de bebidas (classe cardapio-bebidas), é Bebida; senão Pizza.
        const categoria = box.closest('.cardapio-bebidas') ? 'Bebida' : 'Pizza';

        // Adiciona aos totais
        quantidadePizzas++;
        totalCarrinho += precoNum;

        // salva como objeto
        itensPedido.push({
            nome: nomePizza,
            tipo: categoria,
            preco: precoNum
        });

        // Cria o item visual na lista
        const lista = document.getElementById('listaCarrinho');
        const item = document.createElement('li');
        item.style.listStyle = "none";
        item.style.marginBottom = "10px";
        item.innerHTML = `✅ ${nomePizza} - ${precoPizza} 
            <button class="remover" style="color:red; border:none; background:none; cursor:pointer; margin-left:10px;">[X]</button>`;

        lista.appendChild(item);
        atualizarCarrinho();

        // Lógica de remover
        item.querySelector('.remover').addEventListener('click', function() {
            lista.removeChild(item);
            quantidadePizzas--;
            totalCarrinho -= precoNum;

            // Remove o item salvo — usando nome e preço para achar o item correto
           const index = itensPedido.findIndex(
                itemPedido => itemPedido.nome === nomePizza && itemPedido.preco === precoNum
            );
            if (index > -1) itensPedido.splice(index, 1);

            atualizarCarrinho();
        });

        // Abre o menu lateral automaticamente ao adicionar (com verificação de horário, se tiver)
        if (pizzariaAberta) {
            document.getElementById('menuPedido').classList.toggle('aberto');
        } else {
            alert("A pizzaria está fechada. Abrimos às 18:00.");
        }
    });
});

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
    .map(item => `${item.tipo} ${item.nome}`)
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
