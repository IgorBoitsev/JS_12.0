'use strict';

// Объявление используемых переменных
let money;
let income = 'Строительство';
let addExpenses;
let deposit = true;
let mission = 500000;
let period = 12;
let budgetDay = money/30;

// №2
money = prompt('Ваш месячный доход?');
// №3
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
// №4
deposit = confirm('Есть ли у вас депозит в банке?');
// №5
let expenses1 = prompt('Введите обязательную статью расходов.');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите еще одну обязательную статью расходов.');
let amount2 = prompt('Во сколько это обойдется?');
// №6
let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ' + budgetMonth);
// №7
console.log('Цель будет достигнута за ' + Math.ceil(mission/budgetMonth) + ' месяцев.');
// №8
budgetDay = Math.floor(budgetMonth/30);
console.log('Бюджет на день: ' + budgetDay);
// №9


console.log(deposit);
// Функционал из прошлых заданий
/*console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев.");
console.log("Цель: заработать " + mission + " долларов.");

let exp = addExpenses.toLowerCase().split(',');
console.log(exp);

console.log(budgetDay);*/