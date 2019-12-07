this.quantityInput = document.getElementById('value')
this.alertText = document.getElementById('alert')
this.saldoLabel =  document.getElementById('saldo')
this.extratoTable = document.getElementById('transactions-table')
mostrarSaldo = false
isMostrarExtrato = false

const conta = new ContaPoupanca()//Cria objeto conta do script conta.js

realizarSaque = function(){
    if(quantityInput.value > 0 || quantityInput.value < 0){
        try{
            var today = new Date();
            var date = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            conta.sacar(quantityInput.value, date)
            alertText.innerHTML = "Última transação: saque de R$"+quantityInput.value+" - Horário: "+date
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
            alertText.innerHTML = "Última transação: deposito de R$"+quantityInput.value+" - Horário: "+date
        }catch(e){
            alertText.innerHTML = "<p class='red'>"+e+"</p>"
        }
    }    
}
mostrarExtrato = function(){
    if(isMostrarExtrato == false){
        extratoTable.style.display = "inline-block"
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