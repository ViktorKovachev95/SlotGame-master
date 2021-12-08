const symbolContainer = new PIXI.Container();

class Service {
    constructor(balance, symbols){
        this.balance = balance
        this.symbols = 8
        this.symbolsArr= []
        this.bet = 20;
    }

    getBalance(){
        return this.balance;
    }

    setBalance(newBalance){
        this.balance = newBalance;
    }

    getBet(){
        return this.bet;
    }

    setBet(bet){
        this.bet = bet;
    }

    getSymbols(){
         return this.symbols;    
    }

    spin(){
        const results = this.randomSymbolsGenerator()
        return results;
    }

    clearSymbols(){
        for (var i = symbolContainer.children.length - 1; i >= 0; i--) {	
            symbolContainer.removeChild(symbolContainer.children[i]);
        };
    }

    randomSymbolsGenerator(){
        this.clearSymbols();
        const rowArr = new Array(); 
        console.log(rowArr)
        for(let i=0; i<5 ; i++){
            const columnArr = new Array();  
            
            for(let j=0;j<3; j++){
                const symbolNum = Math.trunc(Math.random()*`${this.symbols}`+1);
                columnArr.push(symbolNum);
            }
            rowArr[i] = columnArr;   
        }
        if(this.winLine()){
            this.setBalance(this.balance + this.bet*2);
        } else {
            this.setBalance(this.balance - this.bet);
        }
        return rowArr;
    }
    
    winLine(){        
        var counts = {};
        if(randomSymbolsGenerator.rowArr.length){
               var middleColumn = randomSymbolsGenerator.rowArr.map(column => {
                   return column.find((symbol, index) => index === 0)
               }).sort((a, b) => a - b)
        }

        middleColumn.forEach((x) => {
            counts[x] = (counts[x] || 0) + 1;
        });

        console.log(middleColumn);
        return Object.values(counts).find(count => count >= 3);
    }
 
    hasBalance(){
        return this.balance > 0 && this.bet <= this.balance
    }
    
}

export default Service;
        
        
        
            // checkWin(){        
    //     var counts = {};
    //     if(this.symbolArr.length){
    //            var middleColumn = this.symbolArr.map(column => {
    //                return column.find((symbol, index) => index === 1)
    //            }).sort((a, b) => a - b)
    //     }

    //     middleColumn.forEach((x) => {
    //         counts[x] = (counts[x] || 0) + 1;
    //     });
    //     return Object.values(counts).find(count => count >= 3);
    // }
