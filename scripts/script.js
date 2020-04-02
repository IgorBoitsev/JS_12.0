'use strict';

// Функция проверки введных данных на соответствие числовому типу
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Функция проверки типа данных конкретных переменных
function showTypeOf(data) {
  console.log(typeof data);
}

// Объявление используемых переменных
let money,
    income = 'Строительство',
    addExpenses = [],
    deposit,
    mission = 500000,
    period = 12,
    budgetDay,
    expensesAmount = {};

// Проверка ввода числового значения
do
  money = prompt('Каков ваш месячный доход?');
while (!isNumber(money));

// addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
// deposit = confirm('Есть ли у вас депозит в банке?');

// Суммарная величина обязательных ваплат за месяц 
let getExpensesMonth = function() {
  let sum = 0;
  let amount = 0;
  let count = +prompt('Сколько у вас статей расхода?');
  for (let i = 1; i <= count; i++) {
    // Названия статей расходов заносятся в массив
    let name = prompt('Введите ' + i + ' обязательную статью расходов.');
    
    do {
      amount = +prompt('Во сколько это обойдется?');
      // Заносим данные в объект
      expensesAmount['"' + name + '"'] = amount;
    } while (!isNumber(amount));
    // Суммируем все расходы
    sum += amount;
  }
  return sum;
}
let expensesMonth = getExpensesMonth();

// Величина накоплений за месяц
let getAccumulatedMonth = function() {
  return (money - expensesMonth);
}
let accumulatedMonth = getAccumulatedMonth();

// 
let getTargetMonth = function() {
  return Math.ceil(mission/accumulatedMonth)
};

// Бюджет на каждый день
budgetDay = Math.floor(accumulatedMonth/30);

// Определние статуса, уровня дохода
let getStatusIncome = function() {
  if (budgetDay > 1200)
    return ('У вас высокий уровень дохода.');
      else if (budgetDay > 600) {
        return ('У вас средний уровень дохода.');
        } else {
              return ('К сложалению, у вас уровень дохода ниже среднего.');
              }
}

// Вывод информации о текущем состоянии
if (getTargetMonth() > 0) {
  console.log(getStatusIncome());
  console.log('Ваши расходы за месяц: ' + expensesMonth);
  // console.log('Все это уходит на: ' + addExpenses);
  console.log('Бюджет на день: ' + budgetDay);
  console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев.');
} else {
    console.log('Вы за еду работаете? К сожалению, цель не будет достигнута.');
  }

// showTypeOf(expensesMonth);
// console.log(expensesAmount);