`use strict`
    


/**

имаме 
service.scrollIndex = 0

при service.getCurrentSymbols()
(в прозорчето какви символи има)

взимаме scrollIndex, и за всеки reel (с reelIndex от 0 до 4) връщаме масив с 
[
    this.reels[reelIndex][scrollIndex],
    this.reels[reelIndex][scrollIndex+1],
    this.reels[reelIndex][scrollIndex+2],
]
(x 5)

e.g.
[
    [1,2,3],
    [1,2,3],
    [1,2,3],
    [1,2,3],
    [1,2,3],
]

------

на всеки кадър по време на анимацията
(в loopTicker)

service.scrollIndex++;

(зада създадем илюзията че барабаните се въртят на вс кадър)

------

x x x x x 

 */

class Service {
    constructor(balance, symbols){
        this.balance = balance
        this.symbols = 8
        this.symbolsArr= []
        this.bet = 20
        this.scrollIndex=[0,1,2]
        this.reelIndex=[0,1,2,3,4]
        this.reels = [
            new Array(8000).fill(0).map(() => Math.trunc(Math.random()*this.symbols+1)),
            new Array(9000).fill(0).map(() => Math.trunc(Math.random()*this.symbols+1)),
            new Array(7500).fill(0).map(() => Math.trunc(Math.random()*this.symbols+1)),
            new Array(8500).fill(0).map(() => Math.trunc(Math.random()*this.symbols+1)),
            new Array(8200).fill(0).map(() => Math.trunc(Math.random()*this.symbols+1)),
        ]
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
    reelsGenerator(){
        for(const [reelIndex , symbols] of this.reels.entries()){
            for(const [symbolIndex, symbolNum] of symbols.entries()){
                const reelGraph = `${reelIndex}:${symbolNum}`;
                console.log(reelGraph);
                }
            for (let i=0; i<this.scrollIndex; i++){
                var reelSymbol = []
                console.log(reel);
            }
            }
        }           
       //console.log(`${indexx+1}: ${symbolNum}`);
            //const symbolID = (`${indexx+1}: ${symbolNum}`);
            // const symbolID = (`${indexx+1}: ${symbolNum}`);
            //     console.log(symbolID);

        
    getCurrentSymbols(){

    }

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