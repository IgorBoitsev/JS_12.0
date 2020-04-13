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
// Цифра под ползунком
let periodAmount = document.querySelector('.period-amount');

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

// Поле "Срок достижения цели в месяцах"
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
  addIncome : [],
  incomeMonth : 0,
  budget : 0,
  budgetDay : 0,
  budgetMonth : 0,
  expensesMonth : 0,
  addExpenses : [],
  expenses : {},
  start : function() {

    // if (salaryAmount.value === '') {
    //   alert('Поле "Месячный доход" должно быть заполнено!');
    //   return;
    // }
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },

  // Проверка на заполнение поля "Месячный доход"
  salaryAmountControl : function() {
    // Добавление атрибута "disabled" кнопке
    if (salaryAmount.value == '') {
      start.setAttribute('disabled', true);
    } else
        start.removeAttribute('disabled');
    return;
  },

  // Вывод результатов посчета
  showResult : function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.accumulateMoney();

    // Изменение накоплений за период при изменении значения ползунка periodSelect
    periodSelect.addEventListener('input', function(){
      incomePeriodValue.value = appData.accumulateMoney();
    });
  },

  // Функция добавления полей для доходов
  addIncomeBlock : function() {

    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    // Удаление значений в полях при добавлении
    let eit = cloneIncomeItem.querySelector('.extra_income-title');
    let eia = cloneIncomeItem.querySelector('.extra_income-amount');
    eit.value = '';  
    eia.value = '';
    
    // Добавление новых полей
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnIncomeAdd.style.display = 'none';
    }   
  },

  // Получение данных из полей "Дополнительный доход"
  getIncome : function() {

    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.extra_income-title').value;
      let cashIncome = item.querySelector('.extra_income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });

      for (let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
      }
  },

  // Функция добавления полей для раcходов
  addExpensesBlock : function() {

    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    // Удаление значений в полях при добавлении
    let ret = cloneExpensesItem.querySelector('.required_expenses-title');
    let rea = cloneExpensesItem.querySelector('.required_expenses-amount');
    ret.value = '';  
    rea.value = '';
    
    // Добавление новых полей
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnExpensesAdd.style.display = 'none';
    }   
  },

  // Получение данных из полей "Обязательные расходы"
  getExpenses : function() {

    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.required_expenses-title').value;
      let cashExpenses = item.querySelector('.required_expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },

  // Получение возможных расходов
  getAddExpenses : function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  // Получение возможных доходов
  getAddIncome : function() {
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth : function() {
    // Суммарная величина обязательных ваплат за месяц 
    for(let key in appData.expenses)
      appData.expensesMonth += +appData.expenses[key];
    return;
  },
  getBudget : function() {
    // Величина накоплений за месяц
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    // Бюджет на каждый день (округленный)
    appData.budgetDay = Math.floor(appData.budgetMonth/30);
    return;
  },
  getTargetMonth : function() {
    return Math.ceil(targetAmount.value/appData.budgetMonth);
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
  // Смена цифры под ползунком
  getPeriodAmount : function() {
    periodAmount.textContent = periodSelect.value;
  },
  // Накопления за выбарнный период
  accumulateMoney :  function() {
    return appData.budgetMonth * periodSelect.value;
  }
}


salaryAmount.addEventListener('change', appData.salaryAmountControl);
salaryAmount.addEventListener('onchange', console.log('1'));

start.addEventListener('click', appData.start);

btnExpensesAdd.addEventListener('click', appData.addExpensesBlock);
btnIncomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriodAmount);

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