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
        extratoTable.innerHTML = 
        "<tr>"+
            "<th>Transação</th>"+
            "<th>Valor</th>"+
            "<th>Horário</th>"+
        "</tr>"
        if(this.extrato.length != 0){
            this.extrato.forEach(e =>{
                extratoTable.innerHTML += 
                "<tr>"+
                    "<td class='type'>"+
                        e.type+
                    "</td>"+
                    "<td class='"+e.type+"'>"+
                        e.value+
                    "</td>"+
                    "<td class='time'>"+
                        e.date+
                    "</td>"+
                "</tr>"
            })
        }else{
            extratoTable.innerHTML = 'Não foram encontradas transações'
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