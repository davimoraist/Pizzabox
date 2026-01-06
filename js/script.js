var horasTexto = document.getElementById('horas')

var agora = new Date()
var horaAtual = agora.getHours()
var minutoAtual = agora.getMinutes()

// transforma tudo em minutos
var horaEmMinutos = horaAtual * 60 + minutoAtual

var abertura = 18 * 60       // 18:00
var fechamento = 22 * 60 + 50 // 22:50

if (horaEmMinutos < abertura || horaEmMinutos > fechamento) {
    horasTexto.innerHTML = "❌ FECHADO - Abrimos às 18:00"
    horasTexto.style.backgroundColor = "#ff0000"
} else {
    horasTexto.innerHTML = "✅ ABERTO - Faça seu pedido!"
    horasTexto.style.backgroundColor = "#08954C"
}

 function toggleMenu(){
    document.getElementById('menuPedido').classList.toggle('aberto')
}

function toggleMenu(){
    document.getElementById('menuPedido').classList.toggle('aberto')
}

function buscarCEP(){
    const cep = document.getElementById('cep').value.replace(/\D/g,'')

    if(cep.length !== 8) return

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(dados => {
            if(dados.erro){
                alert('CEP não encontrado')
                return
            }
            document.getElementById('rua').value = dados.logradouro
            document.getElementById('bairro').value = dados.bairro
            document.getElementById('cidade').value = dados.localidade
            document.getElementById('estado').value = dados.uf
        })
}

 function enviarPedido(){
    const nome = document.getElementById('nome').value.trim()
    const telefone = document.getElementById('telefone').value.trim()
    const rua = document.getElementById('rua').value.trim()
    const numero = document.getElementById('numero').value.trim()
    const bairro = document.getElementById('bairro').value.trim()
    const cidade = document.getElementById('cidade').value.trim()
    const estado = document.getElementById('estado').value.trim()
    const cep = document.getElementById('cep').value.trim()

    if(!nome || !telefone || !rua || !numero || !bairro || !cidade || !estado || !cep){
        alert('Preencha todos os campos!')
        return
    }

    const mensagem =
`🍕 Pedido Pizzabox

👤 Nome: ${nome}
📞 Telefone: ${telefone}

📍 Endereço:
${rua}, Nº ${numero}
Bairro: ${bairro}
Cidade: ${cidade} - ${estado}
CEP: ${cep}`

    // ⚠️ MUDE PARA UM NÚMERO REAL
    const telefonePizzaria = '556195756256'

    const url = 'https://wa.me/' + telefonePizzaria + '?text=' + encodeURIComponent(mensagem)

    window.open(url, '_blank')
}

var margherita = document.getElementById('margherita')


function verpedido(){
   document.getElementById('verpedido').classList.toggle('aberto')   

   function margherita(){
            
    }

}