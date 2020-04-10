'use strict';

// Поле "Месячный доход"
let salaryAmount = document.querySelector('.salary-amount');

// Блок полей "Дополнительный доход"
let incomeItems = document.querySelectorAll('.income-items');
// Поле "Дополнительный доход (наименование)"
let extraIncomeTitle = document.querySelector('.extra_income-title');
// Поле "Дополнительный доход (сумма)"
let extraIncomeAmount = document.querySelector('.extra_income-amount');

// Кнопка добавления дополнительного дохода
let btnIncomeAdd = document.getElementsByTagName('button')[0];

// Поле "Возможный доход"
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

// Блок полей "Обязательные расходы"
let expensesItems = document.querySelectorAll('.expenses-items');
// Поле "Обязательные расходы (наименование)"
let requiredExpensesTitle = document.querySelector('.required_expenses-title');
// Поле "Обязательные расходы (сумма)"
let requiredExpensesAmount = document.querySelector('.required_expenses-amount');

// Кнопка добавления обязательных расходов
let btnExpensesAdd = document.getElementsByTagName('button')[1];

// Поле "Возможные расходы"
let additionalExpensesItem = document.querySelector('.additional_expenses-item');

// Чекбокс для депозита
let depositCheck = document.getElementById('deposit-check');

// Поле "Цель"
let targetAmount = document.querySelector('.target-amount');

// Ползунок "Период расчета"
let periodSelect = document.querySelector('.period-select');

// Поле "Доход за месяц"
let budgetMonthValue = document.getElementsByClassName('result-total')[0];

// Поле "Дневной бюджет"
let budgetDayValue = document.getElementsByClassName('result-total')[1];

// Поле "Расход за месяц"
let expensesMonthValue = document.getElementsByClassName('result-total')[2];

// Поле "Возможные доходы"
let additionalIncomeValue = document.getElementsByClassName('result-total')[3];

// Поле "Возможные расходы"
let additionalExpensesValue = document.getElementsByClassName('result-total')[4];

// Поле "Накопления за период"
let incomePeriodValue = document.getElementsByClassName('result-total')[5];

// Поле "Накопления за период"
let targetMonthValue = document.getElementsByClassName('result-total')[6];

// Кнопка "Рассчитать"
let start = document.getElementById('start');





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
  addExpenses : [],
  expenses : {},
  start : function() {

    if (salaryAmount.value === '') {
      alert('Поле "Месячный доход" должно быть заполнено!');
      return;
    }
    appData.budget = salaryAmount.value;
    console.log('salaryAmount.value: ', salaryAmount.value);
    
  // appData.asking();
  // appData.getExpensesMonth();
  // appData.getBudget();
  },
  // Функция добавления полей для доходов
  addIncomeBlock : function() {

    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnIncomeAdd.style.display = 'none';
    }   
  },
  // Функция добавления полей для раcходов
  addExpensesBlock : function() {

    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnExpensesAdd.style.display = 'none';
    }   
  },
  asking : function() {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome, cashIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Программирование');
      } while (isNumber(itemIncome));
      do {
        cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете?', '15000');
        appData.income[itemIncome] = cashIncome;
      } while (!isNumber(cashIncome));
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.', 'Интернет, мобильная связь');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    // Заполнение статей расхода
    let amount, count;
    do {
      count = +prompt('Сколько у вас статей расхода?', '2');
    } while (!isNumber(count));
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
      do {
        appData.percentDeposit = +prompt('Какой годовой процент?', '6');
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = +prompt('Какая сумма заложена?', '37000');
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney :  function() {
    return appData.budgetMonth * appData.period;
  }
}


start.addEventListener('click', appData.start);

btnExpensesAdd.addEventListener('click', appData.addExpensesBlock);
btnIncomeAdd.addEventListener('click', appData.addIncomeBlock);

appData.getInfoDeposit();
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
// console.log('Наша программа включает в себя следующие данные:');
// for(let key in appData) {
//   console.log('Свойство объекта: ' + key + '; его значение: ' + appData[key] + '.');
// }

// Вывод возможных расходов в консоль
// let str = '';
// for (let i = 0; i < appData.addExpenses.length; i++) {
//   appData.addExpenses[i] = appData.addExpenses[i].trim();
//   str = str + appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1) + ', ';
// }
// console.log(str.slice(0, str.length - 2));