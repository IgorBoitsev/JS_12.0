'use strict';

// Объявление используемых переменных
let money;
let income = 'Строительство';
let addExpenses = [];
let deposit = true;
let mission = 500000;
let period = 12;
let budgetDay;

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов.');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите еще одну обязательную статью расходов.');
let amount2 = +prompt('Во сколько это обойдется?');
// №1
let getExpensesMonth = function() {
  return amount1 + amount2;
}
// №2
let getAccumulatedMonth = function() {
  return money - (amount1 + amount2);
}
// №3
let accumulatedMonth = getAccumulatedMonth();
// №4
let getTargetMonth = function() {
  return Math.ceil(mission/accumulatedMonth)
};
budgetDay = Math.floor(accumulatedMonth/30);

let getStatusIncome = function() {
  if (budgetDay > 1200)
    return ('У вас высокий уровень дохода.');
      else if (budgetDay > 600) {
        return ('У вас средний уровень дохода.');
        } else {
              return ('К сложалению, у вас уровень дохода ниже среднего.');
              }
}

if (getTargetMonth() > 0) {

  console.log(getStatusIncome());
  console.log('Ваши расходы за месяц: ' + getExpensesMonth());
  console.log('Все это уходит на: ' + addExpenses);
  console.log('Бюджет на день: ' + budgetDay);
  console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев.');

} else {
    console.log('Вы за еду работаете?');
  }
 
function showTypeOf(data) {
  console.log(typeof data);
}

showTypeOf(budgetDay);