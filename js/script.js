var cardapio = document.getElementsByClassName('cardapio')

// ================== CONTROLE DE HORÁRIO ==================
var horasTexto = document.getElementById('horas');
var agora = new Date();
var horaEmMinutos = agora.getHours() * 60 + agora.getMinutes();
var abertura = 18 * 60;
var fechamento = 22 * 60 + 50;

if (horaEmMinutos < abertura || horaEmMinutos > fechamento) {
    horasTexto.innerHTML = "❌ FECHADO - Abrimos às 18:00";
    horasTexto.style.backgroundColor = "#ff0000";
} else {
    horasTexto.innerHTML = "✅ ABERTO - Faça seu pedido!";
    horasTexto.style.backgroundColor = "#08954C";
}

// ================== INTERFACE ==================
 function toggleMenu() {
    document.getElementById('menuPedido').classList.toggle('aberto');
}

// ================== CARRINHO ==================
let totalCarrinho = 0;
let quantidadePizzas = 0;
let itensPedido = []; // Lista para guardar os nomes das pizzas

function atualizarCarrinho() {
    document.getElementById('quantidade').innerText = quantidadePizzas;
    document.getElementById('total').innerText = totalCarrinho.toFixed(2).replace('.', ',');
}

// Lógica de adicionar ao carrinho
document.querySelectorAll('.btn-carrinho').forEach(function(botao) {
    botao.addEventListener('click', function() {
        const box = botao.closest('.box');
        const nomePizza = box.querySelector('h4').innerText;
        const precoPizza = box.querySelector('p strong').innerText;
        let precoNum = parseFloat(precoPizza.replace('R$ ', '').replace(',', '.'));

        // Adiciona aos totais
        quantidadePizzas++;
        totalCarrinho += precoNum;
        itensPedido.push(nomePizza); // Salva o nome para o WhatsApp

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
            // Remove o nome da lista de itens
            const index = itensPedido.indexOf(nomePizza);
            if (index > -1) itensPedido.splice(index, 1);
            atualizarCarrinho();
        });

        // Abre o menu lateral automaticamente ao adicionar
        document.getElementById('menuPedido').classList.add('aberto');
    });
});

// ================== BUSCAR CEP ==================
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

💳 *Pagamento:* ${formaPagamento}

🛒 *ITENS:*
- ${listaParaWhatsApp}

💰 *TOTAL:* R$ ${totalCarrinho.toFixed(2).replace('.', ',')}
`
    );

    const fone = "556195756256";
    window.open(`https://wa.me/${fone}?text=${mensagem}`, '_blank');
}
