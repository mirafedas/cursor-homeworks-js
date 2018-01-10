let casino;

function Casino(slotMachineNumber, money) {
  this.slotMachineNumber = slotMachineNumber;
  this.slotMachines = [];
  let moneyForMachine = parseInt(money / slotMachineNumber);
  let moneyRest = money - moneyForMachine * slotMachineNumber; 
  for (let i = 0; i < slotMachineNumber; i++) {
    let m = moneyForMachine + (!i ? moneyRest : 0);
    this.slotMachines.push(new SlotMachine(m, i));
  }
}

Casino.prototype.getAllMoneyInCasino = function(){
  let money = 0 
  this.slotMachines.forEach(m => money += m.money);
  return money;
}

Casino.prototype.getNumberOfMachines = function() {
  return this.slotMachines.length;
}

function SlotMachine(money, id) {
  this.id = id;
  this.money = money;
  this.lucky = !id;
}

function createCasino() {
  let money = $('[name=money]').val();
  let slm = $('[name=slotMachine]').val();
  if (slm <= 0) return alert('Number of slot machine should be > 0');
  if (money <= 0) return alert('Count of money should be > 0');casino = new Casino(slm, money);
  $('#init').hide();
  console.log('Casino created');
  $('#casinoAction').show()
  renderCasino();
}

function generateRandom() {
  let random = Math.floor(Math.random() * 900) + 100;
  return random;
}

function play(e) {
  let machine = $(e.target);
  let moneyToPlay = parseInt(machine.next().val());
  machine.next().val(moneyToPlay);
  if (moneyToPlay <= 0) {
    alert('Please put in coin to play!');
    return;
  }
  let id = machine.parent().parent().attr('id');
  casino.slotMachines[id].money += moneyToPlay;
  machine.parent().prev()[0].innerText = casino.slotMachines[id].money;
  let number = generateRandom();
  machine.prev()[0].innerText = number;
  let arrOfNumber = number.toString().split('');
  let sameNumber = 0;
  if(arrOfNumber[0] == arrOfNumber[1]) {
    sameNumber++;
  }
  if(arrOfNumber[0] == arrOfNumber[2]) {
    sameNumber++;
  }
  if(!sameNumber && arrOfNumber[1] == arrOfNumber[2]) {
    sameNumber++;
  }
  let lucky = casino.slotMachines[id].lucky;
  if ((arrOfNumber[0] == 7 || lucky)  && sameNumber == 2) {
    sameNumber = 100;
  }
  playResult(sameNumber, moneyToPlay, id);
  machine.parent().prev()[0].innerText = casino.slotMachines[id].money;
}

function playResult(sameNumber, rate, id) {
  if(!sameNumber) {
    console.log('You lose. Better luck next time');
    return;
  }
  if(sameNumber == 1) {
    let gain = rate*2;
    let slotMoney = casino.slotMachines[id].money;
    if (slotMoney < gain) {
      gain = slotMoney;
    }
    casino.slotMachines[id].money -= gain;
    console.log('You won ' + gain);
  } else if(sameNumber == 2) {
    let gain = rate*5;
    let slotMoney = casino.slotMachines[id].money;
    if (slotMoney < gain) {
      gain = slotMoney;
    }
    casino.slotMachines[id].money -= gain;
    console.log('You won ' + gain);
  } else {
    let gain = casino.slotMachines[id].money;
    casino.slotMachines[id].money -= gain;
    console.log('You won ' + gain);
  }
}

function deleteMachineById(e) {
  let id = $(e.target).parent().attr('id');
  let moneyFromMachine = casino.slotMachines[id].money;
  casino.slotMachines.splice(id, 1);
  let slotMachineNumber = casino.getNumberOfMachines();
  let moneyForMachine = parseInt(moneyFromMachine / slotMachineNumber);
  let moneyRest = moneyFromMachine - moneyForMachine * slotMachineNumber;
  casino.slotMachines.forEach((slm, index) => {
    if (!index) slm.money += moneyRest;
    slm.money += moneyForMachine;
  });
  renderCasino();  
}

function renderCasino() {
  let render = '';
  casino.slotMachines.forEach((m, index) => {
    let lucky = m.lucky ? 'lucky' : null;
    render += `
      <div id="${index}" style="display: flex; flex-direction: column; align-items: center">
        <div class='current-money'>${m.money}</div>
        <div class="machine ${lucky}">
          <div class="scoreboard"></div>
          <input value="play" type="button" class="btn" onclick="play(event)" />
          <input type="number" name="money" class="input-money" placeholder='coin' />
        </div>
        <input type="button" value="delete" style="width: 60px" onclick="deleteMachineById(event)" />
        <input type="button" value="take money" style="width: 80px" onclick="takeMoneyFromMachine(event)" />
        <input type="button" value="put money" style="width: 80px" onclick="putMoneyForMachine(event)" />
      </div>
      `
  });
  $('#slotMachines')[0].innerHTML = render;
}

function getMachinesNumber() {
  alert(`There are ${casino.getNumberOfMachines()} machines in casino.`);
}

function getMoneyCount() {
  alert(`There are ${casino.getAllMoneyInCasino()} money in casino.`);
}

function addSlotMachine() {
  let indexOfRichestMachine = 0;
  let moneyCount = 0;
  casino.slotMachines.forEach((m, index) => {
    if (m.money > moneyCount) {
      moneyCount = m.money;
      indexOfRichestMachine = index;
    }
  });
  let machine = casino.slotMachines[indexOfRichestMachine];
  let takeMoney = Math.floor(machine.money / 2);
  machine.money -= takeMoney;
  casino.slotMachines.push(new SlotMachine(takeMoney, casino.getNumberOfMachines()));
  renderCasino();
}

function takeMoneyFromCasino() {
  let moneyToTake = parseInt(prompt('Enter how much money you want to take:'));
  if(!moneyToTake || moneyToTake < 0 || moneyToTake > casino.getAllMoneyInCasino()) {
    alert('There is now so much money in casino or wrong number');
    return;
  }
  casino.slotMachines.sort((a, b) => b.money - a.money);
  casino.slotMachines.forEach(m => {
    let allMoneyInMachine = m.money;
    if(!moneyToTake) return;
    if(allMoneyInMachine > moneyToTake) {
      m.money -= moneyToTake;
      moneyToTake = 0;
    } else {
      moneyToTake -= m.money;
      m.money = 0;
    }
  });
  casino.slotMachines.sort((a, b) => a.id - b.id);
  renderCasino();
}

function takeMoneyFromMachine(e) {
  let id = $(e.target).parent().attr('id');
  let moneyFromMachine = casino.slotMachines[id].money;

  let moneyToTake = parseInt(prompt('Enter how much money you want to take:'));
  if(!moneyToTake || moneyToTake < 0 || moneyToTake > moneyFromMachine) {
    alert('There is now so much money in machine or wrong number');
    return;
  }
  casino.slotMachines[id].money -= moneyToTake;
  renderCasino();
}

function putMoneyForMachine(e) {
  let id = $(e.target).parent().attr('id');
  let moneyFromMachine = casino.slotMachines[id].money;

  let moneyToPut = parseInt(prompt('Enter how much money you want to put:'));
  if(!moneyToPut || moneyToPut <= 0) {
    alert('Number should not be minus');
    return;
  }
  casino.slotMachines[id].money += moneyToPut;
  renderCasino();
}

