'use strict';

// Функция проверки введных данных на соответствие числовому типу
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Объявление используемого объекта
let appData = {
  income : {},
  deposit : false,
  percentDeposit : 0,
  moneyDeposit : 0,
  period : 12,
  addIncome : [],
  mission : 500000,
  budget : 0,
  budgetDay : 0,
  budgetMonth : 0,
  expensesMonth : 0,
  expenses : {},
  asking : function() {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Программирование');
      let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '15000');
      appData.income[cashIncome] = cashIncome; 
    }

    appData.addIncome = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.', 'Интернет, мобильная связь');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    // Заполнение статей расхода
    let amount = 0;
    let count = +prompt('Сколько у вас статей расхода?', '2');
    for (let i = 1; i <= count; i++) {
      // Названия статей расходов заносятся в массив
      let name = prompt('Введите ' + i + ' обязательную статью расходов.', i);
      
      do {
        amount = prompt('Во сколько это обойдется?', '3700');
        // Заносим данные в объект
        appData.expenses[name] = amount;
      } while (!isNumber(amount));
    }
    return;
  },
  getExpensesMonth : function() {
    // Суммарная величина обязательных ваплат за месяц 
    for(let key in appData.expenses)
      appData.expensesMonth += +appData.expenses[key];
    return;
  },
  getBudget : function() {
    // Величина накоплений за месяц
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    // Бюджет на каждый день
    appData.budgetDay = Math.floor(appData.budgetMonth/30);
    return;
  },
  getTargetMonth : function() {
    return Math.ceil(appData.mission/appData.budgetMonth);
  },
  getStatusIncome : function() {
    // Определние статуса, уровня дохода
    if (appData.budgetDay > 1200)
      return ('У вас высокий уровень дохода.');
        else if (appData.budgetDay > 600) {
          return ('У вас средний уровень дохода.');
          } else {
              return ('К сложалению, у вас уровень дохода ниже среднего.');
            }
  },
  getInfoDeposit : function() {
    if (appData.deposit) {
      appData.percentDeposit = prompt('Какой годовой процент?', '6');
      appData.moneyDeposit = prompt('Какая сумма заложена?', '37000');
    }
  },
  calcSavedMoney :  function() {
    return appData.budgetMonth * appData.period;
  }
}

// Проверка ввода числового значения
let start = function() {
  do
    appData.budget = prompt('Каков ваш месячный доход?');
  while (!isNumber(appData.budget));
}

start();
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

// Вывод информации о текущем состоянии
if (appData.getTargetMonth() > 0) {
  console.log(appData.getStatusIncome());
  console.log('Ваши расходы за месяц: ' + appData.expensesMonth);
  // console.log('Все это уходит на: ' + addExpenses);
  console.log('Бюджет на день: ' + appData.budgetDay);
  console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев.');
} else {
    console.log('Вы за еду работаете? К сожалению, цель не будет достигнута.');
  }

// Вывод в консоль всех свойств и значений объекта appData
console.log('Наша программа включает в себя следующие данные:');
for(let key in appData) {
  console.log('Свойство объекта: ' + key + '; его значение: ' + appData[key] + '.');
}