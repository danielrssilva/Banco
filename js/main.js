console.log("Iniciando")
quantityInput = document.getElementById('value')
alertText = document.getElementById('alert')
saldoLabel =  document.getElementById('saldo')
mostrarSaldo = false
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
    sacar(valor){
        if(valor> (this.saldo + this.limite))
            throw("Limite insuficiente!")
        else{
            this.saldo -= valor
            this.showSaldoOnScreen()
            this.extrato.push({
                type: 'saque',
                value: valor
            })
        }
    }
    depositar(valor) { 
        if(valor < 100)
            throw("Não dá, bobão!")
        else{
            this.saldo += valor
            this.showSaldoOnScreen()
            this.extrato.push({
                type: 'deposito',
                value: valor
            })
        }
    }
    getSaldo() {
        return this.saldo;
    }
    mostrarExtrato(){
        alertText.innerHTML = "";
        if(this.extrato.length != 0){
            this.extrato.forEach(e => {
                alertText.innerHTML += "<p class='"+e.type+"'>"+e.value+"</p>"
            });
            if(this.getSaldo() > 0)
                alertText.innerHTML += "<p>Total: <span class='green'>R$"+this.getSaldo()+"</span></p>"
            else
                alertText.innerHTML += "<p>Total: <span class='red'>R$"+this.getSaldo()+"</span></p>"
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
            conta.sacar(quantityInput.value)
            alertText.innerHTML = "Saque de R$"+quantityInput.value+" efetuado!"
        }catch(e){
            alertText.innerHTML = "<p class='red'>"+e+"</p>"
        }
    }
}
realizarDeposito = function(){
    try{
        conta.depositar(parseFloat(quantityInput.value))
        alertText.innerHTML = "Deposito de R$"+quantityInput.value+" efetuado!"
    }catch(e){
        alertText.innerHTML = "<p class='red'>"+e+"</p>"
    }
    
}
mostrarExtrato = function(){
    conta.mostrarExtrato()
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
}();