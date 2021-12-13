`use strict`

class Service {
    constructor(balance, symbols){
        this.balance = balance
        this.symbols = 8
        this.symbolsArr= []
        this.bet = 20;

        this.reels = [
            new Array(8000).fill(0).map(() => Math.trunc(Math.random()*this.symbols+1)),
            new Array(9000).fill(0).map(() => Math.trunc(Math.random()*this.symbols+1)),
            new Array(7500).fill(0).map(() => Math.trunc(Math.random()*this.symbols+1)),
            new Array(8500).fill(0).map(() => Math.trunc(Math.random()*this.symbols+1)),
            new Array(8200).fill(0).map(() => Math.trunc(Math.random()*this.symbols+1)),
        ]
        console.log(this.reels)
        this.reelsScroll = []
    }

    getBalance(){
        return this.balance;
    }

    setBalance(newBalance){
        this.balance = newBalance;
    }

    hasBalance(){
        return this.balance > 0 && this.bet <= this.balance
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
    //plqskai v app js
    

     reelsGenerator(){
         var reels = this.reels;
         for(let i=0; i<5; i++){
            var reelsScroll = this.reelsScroll;
            reelsScroll[i] = reels.map(()=>[Math.floor(Math.random()*reels.length+1)])
         }
         console.log(reelsScroll);
         return this.reels;
         console.log(reels);
           
     }
    // randomSymbolsGenerator(){
    //     this.clearSymbols();
    //     console.log(this.symbolsArr)
    //     for(let i=0; i<5 ; i++){
    //         const columnArr = new Array();  
            
    //         for(let j=0;j<3; j++){
    //             const symbolNum = Math.trunc(Math.random()*this.symbols+1);
    //             columnArr.push(symbolNum);
    //         };
    //         this.symbolsArr[i] = columnArr;
    //     };
    //     return this.symbolsArr;
    // }

    winLine(){
        const line = {};
        const indexFilter = this.symbolsArr.map(reelSymbols=>{
            return reelSymbols[1]
        })
        indexFilter.forEach((x)=>{
            line[x] = (line[x]||0)+1;
        });
        console.log(line)
        return Object.values(line).find(middlewin => middlewin>=3);
        
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
