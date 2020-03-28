let money = 25000;
let income = 'Строительство';
let addExpenses = 'Квартира, машина, интернет, телефон';
let deposit = true;
let mission = 500000;
let period = 12;
let budgetDay = money/30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев.");
console.log("Цель: заработать " + mission + " долларов.");

let exp = addExpenses.toLowerCase().split(',');
console.log(exp);

console.log(budgetDay);
