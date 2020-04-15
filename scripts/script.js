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

// Кнопка "Сбросить"
let cancel = document.getElementById('cancel');

// Все текстовые поля для ввода наименования
let inputsName = document.querySelectorAll('[placeholder="Наименование"]');
// Все текстовые поля для ввода суммы
let inputsSum = document.querySelectorAll('[placeholder="Сумма"]');

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
    
    this.budget = +salaryAmount.value;
    
    // if (this.inputsSumTextControl() === false) {
    //   alert('Поля "Наименование" и "Сумма" должны содержать буквы русского алфавита и цифры соответственно.');
    // } else {
       this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();

        this.hideShowButtons();
        this.blockUnblockTextInputs();
      // }
  },

  // Функция сбороса всех данных
  reset : function() {

    this.hideShowButtons();
    this.blockUnblockTextInputs();
    this.clearAllTextInputs();
    this.salaryAmountControl();

    // Обнуление всех значений в объекте
    this.income = {};
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addIncome = [];
    this.incomeMonth = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.expenses = {};
  },

  // Проверка на заполнение поля "Месячный доход"
  salaryAmountControl : function() {
    // Добавление атрибута "disabled" кнопке
    if (salaryAmount.value == '') {
      start.setAttribute('disabled', true);
      start.style = 'opacity: .7; cursor: default;';
    } else {
        start.removeAttribute('disabled');
        start.style = 'opacity: 1; cursor: pointer;';
      }
    return;
  },

  // Вывод результатов посчета
  showResult : function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.accumulateMoney();

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

    // Обновляем текстовые поля для вводимых данных (для дальнейшей проверки)
    inputsName = document.querySelectorAll('[placeholder="Наименование"]');
    inputsSum = document.querySelectorAll('[placeholder="Сумма"]');
  },

  // Получение данных из полей "Дополнительный доход"
  getIncome : function() {

    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.extra_income-title').value;
      let cashIncome = item.querySelector('.extra_income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    }, appData);

      for (let key in appData.income) {
        this.incomeMonth += +this.income[key];
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

    // Обновляем текстовые поля для вводимых данных (для дальнейшей проверки)
    inputsName = document.querySelectorAll('[placeholder="Наименование"]');
    inputsSum = document.querySelectorAll('[placeholder="Сумма"]');
  },

  // Получение данных из полей "Обязательные расходы"
  getExpenses : function() {

    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.required_expenses-title').value;
      let cashExpenses = item.querySelector('.required_expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    }, appData);
  },

  // Получение возможных расходов
  getAddExpenses : function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, appData);
  },

  // Получение возможных доходов
  getAddIncome : function() {
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }, appData);
  },

  getExpensesMonth : function() {
    // Суммарная величина обязательных ваплат за месяц 
    for(let key in appData.expenses)
      this.expensesMonth += +this.expenses[key];
    return;
  },
  getBudget : function() {
    // Величина накоплений за месяц
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    // Бюджет на каждый день (округленный)
    this.budgetDay = Math.floor(this.budgetMonth/30);
    return;
  },
  getTargetMonth : function() {
    return Math.ceil(targetAmount.value/this.budgetMonth);
  },
  getStatusIncome : function() {
    // Определние статуса, уровня дохода
    if (this.budgetDay > 1200)
      return ('У вас высокий уровень дохода.');
        else if (this.budgetDay > 600) {
          return ('У вас средний уровень дохода.');
          } else {
              return ('К сложалению, у вас уровень дохода ниже среднего.');
            }
  },
  getInfoDeposit : function() {
    if (this.deposit) {
      do {
        this.percentDeposit = +prompt('Какой годовой процент?', '6');
      } while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = +prompt('Какая сумма заложена?', '37000');
      } while (!isNumber(this.moneyDeposit));
    }
  },
  // Смена цифры под ползунком
  getPeriodAmount : function() {
    periodAmount.textContent = periodSelect.value;
  },
  // Накопления за выбарнный период
  accumulateMoney :  function() {
    return this.budgetMonth * periodSelect.value;
  },

  // Функция отображения кнопок
  hideShowButtons : function() {
    if (getComputedStyle(start).display !== 'none') {
      start.style = 'display: none';
      cancel.style = 'display: block';
    } else {
        start.style = 'display: block';
        cancel.style = 'display: none';
      }
  },

  // Блокировка/разблокировка всех инпутов после нажатия кнопки "Рассчитать"
  blockUnblockTextInputs : function() {
    let textInputs = document.querySelectorAll('[type = text]');
    textInputs.forEach(function(item){
      if (item.hasAttribute('disabled') == false) {
        item.setAttribute('disabled', true);
      } else {
        item.removeAttribute('disabled');
      }
    });
  },

  // Функция очистки всех текстовых полей
  clearAllTextInputs : function() {
    let textInputs = document.querySelectorAll('[type = text]');
    textInputs.forEach(function(item){
      item.value = '';
    });
    
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
  },

  // Функция проверки правильности ввода данных (формата данных)
  // inputsSumTextControl : function() {
  //   let errors = false;

  //   inputsName.forEach(function(inputElem){
  //     if (inputElem.value.match(/\p{sc=Cyrillic}/g) !== null || inputElem.value == '') {
  //       inputElem.style = 'background: #ff5a5a';
  //       errors = true;
  //     }
  //     // else
  //     //   inputElem.style = 'background: none';
  //   });

  //   inputsSum.forEach(function(inputElem){
  //     if (inputElem.value.match(/\D/g) !== null || inputElem.value == '') {
  //       inputElem.style = 'background: #ff5a5a';
  //       errors = true;
  //     }
  //     // else
  //     //   inputElem.style = 'background: none';
  //   });

  //   return errors;
  // }
}

salaryAmount.addEventListener('change', appData.salaryAmountControl);

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));

btnIncomeAdd.addEventListener('click', appData.addIncomeBlock.bind(appData));
btnExpensesAdd.addEventListener('click', appData.addExpensesBlock.bind(appData));
periodSelect.addEventListener('input', appData.getPeriodAmount.bind(appData));

appData.getInfoDeposit();
appData.getTargetMonth();
appData.getStatusIncome();