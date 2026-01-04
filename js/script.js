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

 