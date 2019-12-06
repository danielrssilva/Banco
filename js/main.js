quantityInput = document.getElementById('value')
alertText = document.getElementById('alert')
saldoLabel =  document.getElementById('saldo')
extratoTable = document.getElementById('transactions-table')

mostrarSaldo = false
isMostrarExtrato = false

class Conta { 
    constructor() { 
        this.numero = []; 
        this.saldo = 0
        this.limite = 500
        this.extrato = []
        this.setContaNum();
    }
    setContaNum(){
        for(var i = 0; i<10; i++){
            this.numero.push(Math.floor(Math.random() * (10 - 1)) + 1)
        }
    }
    sacar(valor, data){
        if(valor > (this.saldo + this.limite))
            throw("Limite insuficiente!")
        else{
            this.saldo -= valor
            this.showSaldoOnScreen()
            this.extrato.push({
                type: 'saque',
                value: valor,
                date: data
            })
            if(isMostrarExtrato){
                this.getExtrato()
            }
        }
    }
    depositar(valor, data) { 
        if(valor < 100)
            throw("Não dá, bobão!")
        else{
            this.saldo += valor
            this.showSaldoOnScreen()
            this.extrato.push({
                type: 'deposito',
                value: valor,
                date: data
            })
            if(isMostrarExtrato){
                this.getExtrato()
            }
        }
    }
    getSaldo() {
        return this.saldo;
    }
    getExtrato(){
        extratoTable.innerHTML = ""
        if(this.extrato.length != 0){
            this.extrato.forEach(e =>{
                extratoTable.innerHTML += 
                "<tr>"+
                    "<td>"+
                        e.type+
                    "</td>"+
                    "<td class='"+e.type+"'>"+
                        e.value+
                    "</td>"+
                    "<td>"+
                        e.date+
                    "</td>"+
                "</tr>"
            })
        }
    }
    showSaldoOnScreen(){
        if(this.getSaldo() > 0 && mostrarSaldo == true)
            saldoLabel.innerHTML = "<span class='green'>R$"+this.getSaldo()+"</span>"
        else if(this.getSaldo() <= 0 && mostrarSaldo == true)
            saldoLabel.innerHTML = "<span class='red'>R$"+this.getSaldo()+"</span>"
    }
    getNum(){
        return this.numero
    }
} 

class ContaPoupanca extends Conta { 
    atualizar(indice) { 
        this.saldo += this.saldo * indice
        console.log(this.getSaldo())
    }
}
const conta = new ContaPoupanca()
realizarSaque = function(){
    if(quantityInput.value > 0 || quantityInput.value < 0){
        try{
            var today = new Date();
            var date = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            conta.sacar(quantityInput.value, date)
            alertText.innerHTML = "Saque de R$"+quantityInput.value+" efetuado! Horário:"+date
        }catch(e){
            alertText.innerHTML = "<p class='red'>"+e+"</p>"
        }
    }
}
realizarDeposito = function(){
    if(quantityInput.value > 0 || quantityInput.value < 0){
        try{
            var today = new Date();
            var date = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            conta.depositar(parseFloat(quantityInput.value), date)
            alertText.innerHTML = "Deposito de R$"+quantityInput.value+" efetuado! Horário:"+date
        }catch(e){
            alertText.innerHTML = "<p class='red'>"+e+"</p>"
        }
    }    
}
mostrarExtrato = function(){
    if(isMostrarExtrato == false){
        extratoTable.style.display = "block"
        isMostrarExtrato = true;
        conta.getExtrato()
        document.getElementById('extrato-button').value = "Esconder extrato"
    }else{
        document.getElementById('extrato-button').value = "Mostrar extrato"
        extratoTable.innerHTML = "";
        isMostrarExtrato = false;
    }
}
showSaldo = function(){
    if(mostrarSaldo == false){
        mostrarSaldo = true
        conta.showSaldoOnScreen()
    }else{
        mostrarSaldo = false
        saldoLabel.innerHTML = "Mostrar saldo"
    }
}
showConta = function(){
    contaLabel = document.getElementById('numconta')
    nums = conta.getNum();
    for(var i = 0; i<10; i++){
        if(i == 2 || i == 5)
            contaLabel.innerHTML += nums[i]+"."
        else if(i == 8)
            contaLabel.innerHTML += nums[i]+'-'
        else
            contaLabel.innerHTML += nums[i]
    }
    console.log(conta.extrato)
}();