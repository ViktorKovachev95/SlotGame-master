`use strict`
// Application build
import Service from './Service.js';

const app = new PIXI.Application({resizeTo:window});
app.renderer.backgroundColor = 0x000000;
app.renderer.resize(window.innerWidth, window.innerHeight);
document.body.appendChild(app.view);
const BET_STEP = 20;

Object.assign(window, { app })

//Loading Assets
app.loader
   .add('assets', 'assets/SpriteSheet.json')

function onAssetsLoaded() {
   const symbolContainer = new PIXI.Container();
   var balance = Number(prompt('Enter balance'));
   var service = new Service(balance , 8);
   //Slot Frame
   const slotFrame = new PIXI.Sprite(PIXI.Texture.from('SlotFrame.png'));
   app.stage.addChild(slotFrame);   
   //TODO: Switch funtion button while spinning the reels after you do the animation
   // https://codepen.io/ulx/pen/NpqmWq?editors=0010 izplqskai go onCLick po dolu v toq file 
   //Spin button
   const spinButtonNormal = new PIXI.Sprite(PIXI.Texture.from(`SpinButton_Normal.png`));
   const spinButtonActive = new PIXI.Sprite(PIXI.Texture.from(`SpinButton_Active.png`));
   
   spinButtonNormal.interactive= true;
   spinButtonNormal.buttonMode = true;
   spinButtonNormal.x =  app.screen.width/1.53;
   spinButtonNormal.y =  app.screen.height/1.16;
   spinButtonNormal.addListener("pointerdown", onClick);
   app.stage.addChild(spinButtonNormal);   

   //winner
   const winText = new PIXI.Text('YOU WIN !!!!');
   winText.style.fill = "green";
   winText.visible = false;
   winText.x = 1400;
   winText.y = 20;
   app.stage.addChild(winText);

   //loser
   const loseText = new PIXI.Text('YOU LOSE !!!!');
   loseText.style.fill = "red";
   loseText.visible = false;
   loseText.x = 1400;
   loseText.y = 20;
   app.stage.addChild(loseText);

   //balance
   const balanceText = new PIXI.Text(`Balance: ${service.getBalance()}`)
   balanceText.style.fill = "red";
   balanceText.x = 1400;
   balanceText.y = 60;
   app.stage.addChild(balanceText);

   //bet
   const betText = new PIXI.Text(`Current bet: ${service.getBet()}`)
   betText.style.fill = "red";
   betText.x = 1400;
   betText.y = 120;
   app.stage.addChild(betText);

   
   function drawSymbols(symbolsData){
      for(const [i, reelData] of symbolsData.entries()){
         for(const[j, symbolNum] of reelData.entries()){
            const textureKey = `Symbol_${symbolNum}.png`;
            const textureUrl = textureKey;
            const symbol = new PIXI.Sprite(PIXI.Texture.from(textureUrl));
            symbol.x = i*270;
            symbol.y = j*270;
            symbolContainer.addChild(symbol);
         }
      }app.stage.addChild(symbolContainer);
   }

   const symbolsData = service.randomSymbolsGenerator(); 
   drawSymbols(symbolsData);
   
   
   Object.assign(window,{service})
   //Increase credit
   const addCreditBtn = new PIXI.Graphics();
   addCreditBtn.beginFill(0x8fce00);
   addCreditBtn.drawCircle(20,20,20);
   addCreditBtn.endFill();
   addCreditBtn.x = 1540;
   addCreditBtn.y = 200;
   addCreditBtn.interactive= true;
   addCreditBtn.buttonMode = true;
   addCreditBtn.addListener("pointerdown", onAddCreditClick);
   app.stage.addChild(addCreditBtn);

   function onAddCreditClick(){
      if (service.getBet() + BET_STEP <= service.getBalance()){
         service.setBet(service.getBet() + 20);
         betText.text = `Current bet: ${service.getBet()}`;
      }
   };

   //Decrease credit
   const decreaseCreditBtn = new PIXI.Graphics();
   decreaseCreditBtn.beginFill(0xf44336);
   decreaseCreditBtn.drawCircle(20,20,20);
   decreaseCreditBtn.endFill();
   decreaseCreditBtn.x = 1440;
   decreaseCreditBtn.y = 200;
   decreaseCreditBtn.interactive= true;
   decreaseCreditBtn.buttonMode = true;
   decreaseCreditBtn.addListener("pointerdown", onDecreaseCreditClick);
   app.stage.addChild(decreaseCreditBtn);

   function onDecreaseCreditClick(){
      if (service.getBet() - BET_STEP >= BET_STEP){
         service.setBet(service.getBet() - BET_STEP);
         betText.text = `Current bet: ${service.getBet()}`;
      }
   }
   function onClick(){
      //service.randomSymbolsGenerator();
      let chislo = 0;
      function loopTicker(){
         const symbolsData = service.randomSymbolsGenerator();
         drawSymbols(symbolsData);
         
         chislo+=1;
         console.log(chislo);
         
      }
      
      app.ticker.add(loopTicker)

      function stopLoopingTicker() {
         app.ticker.remove(loopTicker);
         service.winLine();
      }

      setTimeout(stopLoopingTicker,1000)
      
      
     // setTimeout()
   }
}; app.loader.load(onAssetsLoaded);



      // if(service.hasBalance()){
      //    service.spin();
      // } else {
      //    loseText.visible = true;
      // }

      // if(service.checkWin()){
      //    winText.visible = true;
      // } else {
      //    winText.visible = false;
      // }
      // balanceText.text = `Balance: ${service.getBalance()}`

      // const onSpinInputClick = () => {
      //    const results = service.spin(50);
         

      //    animateSpinningSymbols(
      //       () => {
      //          container.removeChildren();
      //          drawSymbols(results);
      //       }
      //    )
      // }

      // const animateSpinningSymbols = (onAnimationFinished) => {
      //    const onEnterFrame = () => {
      //       container.removeChildren();
      //       const symbolsData = service.randomSymbolsGenerator();
      //       drawSymbols(symbolsData);
      //    }
      // }

      // app.ticker.remove(onEnterFrame);

      // setTimeout(
      //    ()=>{
      //       app.ticker.remove(onEnterFrame);
      //       onAnimationFinished();
      //    },
      //    2000
      // 