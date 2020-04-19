'use strict';

// Поле "Месячный доход"
const salaryAmount = document.querySelector('.salary-amount');

// Блок полей "Дополнительный доход" ---------------------
let incomeItems = document.querySelectorAll('.income-items');
// Поле "Дополнительный доход (наименование)"
let extraIncomeTitle = document.querySelector('.extra_income-title');
// Поле "Дополнительный доход (сумма)"
let extraIncomeAmount = document.querySelector('.extra_income-amount');

// Кнопка добавления дополнительного дохода
const btnIncomeAdd = document.getElementsByTagName('button')[0];

// Поле "Возможный доход" -------------------
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

// Блок полей "Обязательные расходы"
let expensesItems = document.querySelectorAll('.expenses-items');
// Поле "Обязательные расходы (наименование)"
let requiredExpensesTitle = document.querySelector('.required_expenses-title');
// Поле "Обязательные расходы (сумма)"
let requiredExpensesAmount = document.querySelector('.required_expenses-amount');

// Кнопка добавления обязательных расходов
const btnExpensesAdd = document.getElementsByTagName('button')[1];

// Поле "Возможные расходы" ---------------------
const additionalExpensesItem = document.querySelector('.additional_expenses-item');

// Чекбокс для депозита
const depositCheck = document.getElementById('deposit-check');
// Название банка
const depositBank = document.querySelector('.deposit-bank');
// Сумма вклада
const depositAmount = document.querySelector('.deposit-amount');
// Процентная ставка
const depositPercent = document.querySelector('.deposit-percent');

// Поле "Цель"
const targetAmount = document.querySelector('.target-amount');

// Ползунок "Период расчета"
const periodSelect = document.querySelector('.period-select');
// Цифра под ползунком
const periodAmount = document.querySelector('.period-amount');

// Поле "Доход за месяц"
const budgetMonthValue = document.getElementsByClassName('result-total')[0];

// Поле "Дневной бюджет"
const budgetDayValue = document.getElementsByClassName(`result-total`)[1];

// Поле "Расход за месяц"
const expensesMonthValue = document.getElementsByClassName('result-total')[2];

// Поле "Возможные доходы"
const additionalIncomeValue = document.getElementsByClassName('result-total')[3];

// Поле "Возможные расходы"
const additionalExpensesValue = document.getElementsByClassName('result-total')[4];

// Поле "Накопления за период"
const incomePeriodValue = document.getElementsByClassName('result-total')[5];

// Поле "Срок достижения цели в месяцах"
const targetMonthValue = document.getElementsByClassName('result-total')[6];

// Кнопка "Рассчитать"
const start = document.getElementById('start');

// Кнопка "Сбросить"
const cancel = document.getElementById('cancel');

// Все текстовые поля для ввода наименования
// const inputsName = document.querySelectorAll('[placeholder="Наименование"]');
// Все текстовые поля для ввода суммы
// const inputsSum = document.querySelectorAll('[placeholder="Сумма"]');

class AppData {
  constructor() {
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
  }

  salaryAmountControl() {
    // Добавление атрибута "disabled" кнопке
    if (salaryAmount.value == '') {
      start.setAttribute('disabled', true);
      start.style = 'opacity: .7; cursor: default;';
    } else {
        start.removeAttribute('disabled');
        start.style = 'opacity: 1; cursor: pointer;';
      }
    return;
  }

  start() {
    this.budget = +salaryAmount.value;
    
    if (this.inputsSumTextControl()) {
      alert('Поля "Наименование" и "Сумма" должны содержать буквы русского алфавита и цифры соответственно.');
    } else {
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddIncome();
        this.getAddExpenses();
        this.getInfoDeposit();
        this.getBudget();
  
        this.showResult();
  
        this.hideShowButtons();
        this.blockUnblockTextInputs();
      }

      // Записываем данные в LocalStorage
      // localStorage.setItem('appData', JSON.stringify(appData));
      // console.log(localStorage.appData);
      
  }

  // Сброс всех данных
  reset() {
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

    // Удаление данных из LocalStorage
    // localStorage.removeItem('appData');
  }

  // Вывод результатов посчета
  showResult() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.accumulateMoney();

    // Изменение накоплений за период при изменении значения ползунка periodSelect
    periodSelect.addEventListener('input', function(){
      incomePeriodValue.value = _this.accumulateMoney();
    });

// document.querySelector('.result').querySelectorAll('[type=text]').forEach((item) => console.log(item.value));
  }

  // // Добалвение полей для доходов
  // addIncomeBlock() {
  //   const cloneIncomeItem = incomeItems[0].cloneNode(true);

  //   // Удаление значений в полях при добавлении
  //   const eit = cloneIncomeItem.querySelector('.extra_income-title');
  //   const eia = cloneIncomeItem.querySelector('.extra_income-amount');
  //   eit.value = '';  
  //   eia.value = '';
    
  //   // Добавление новых полей
  //   incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomeAdd);
  //   incomeItems = document.querySelectorAll('.income-items');
  //   if (incomeItems.length === 3) {
  //     btnIncomeAdd.style.display = 'none';
  //   }

  //   // Обновляем текстовые поля для вводимых данных (для дальнейшей проверки)
  //   inputsName = document.querySelectorAll('[placeholder="Наименование"]');
  //   inputsSum = document.querySelectorAll('[placeholder="Сумма"]');
  // }

  // // Добавление полей для раcходов
  // addExpensesBlock() {
  //   const cloneExpensesItem = expensesItems[0].cloneNode(true);

  //   // Удаление значений в полях при добавлении
  //   const ret = cloneExpensesItem.querySelector('.required_expenses-title');
  //   const rea = cloneExpensesItem.querySelector('.required_expenses-amount');
  //   ret.value = '';  
  //   rea.value = '';
    
  //   // Добавление новых полей
  //   expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesAdd);
  //   expensesItems = document.querySelectorAll('.expenses-items');
  //   if (expensesItems.length === 3) {
  //     btnExpensesAdd.style.display = 'none';
  //   }

  //   // Обновляем текстовые поля для вводимых данных (для дальнейшей проверки)
  //   inputsName = document.querySelectorAll('[placeholder="Наименование"]');
  //   inputsSum = document.querySelectorAll('[placeholder="Сумма"]');
  // }

  // Добавление полей для расходов и доходов
  addExpIncBlock() {
    const target = event.target.className.split(' ')[1];

    const add = (item, btn) => {
      let cloneItem = item[0].cloneNode(true);
      let type = item[0].querySelector('input').className.split('-')[0];
      
      // Удаление значений в полях при добавлении
      let title = cloneItem.querySelector(`.${type}-title`);
      let amount = cloneItem.querySelector(`.${type}-amount`);
      
      title.value = '';
      amount.value = '';

      // Добавление новых полей
      item[0].parentNode.insertBefore(cloneItem, btn);
      const cl = item[0].className.split('-')[0]
      item = document.querySelectorAll(`.${cl}-items`);
      if (item.length === 3) {
        btn.style.display = 'none';
      }
    }

    if (target == 'income_add') {
      add(incomeItems, btnIncomeAdd);
    } else {
        add(expensesItems, btnExpensesAdd);
    }
  }

  // Поулчение данных из полей "Дополнительные доходы" и "Обязательные расходы"
  getExpInc() {
    const count = item => {
      const type = item.className.split('-')[0];
      const startStr = item.querySelectorAll('input')[0].className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[type][itemTitle] = itemAmount;
      }
    }

    incomeItems.forEach(count);
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }

    expensesItems.forEach(count);
  }

  // Получение возможных расходов
  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  // Получение возможных доходов
  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  // Получение возможных расходов и возможных доходов ***из урока 15***
  // getAddExpInc() {

  // }

  getExpensesMonth() {
    // Суммарная величина обязательных ваплат за месяц 
    for(let key in this.expenses)
      this.expensesMonth += +this.expenses[key];
    return;
  }

  getBudget() {

    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    // Величина накоплений за месяц
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    // Бюджет на каждый день (округленный)
    this.budgetDay = Math.floor(this.budgetMonth/30);
    return;
  }

  // Расчет срока достижения цели
  getTargetMonth() {
    return Math.ceil(targetAmount.value/this.budgetMonth);
  }

  // Определение уровня дохода
  // getStatusIncome() {
  //   // Определние статуса, уровня дохода
  //   if (this.budgetDay > 1200)
  //     return ('У вас высокий уровень дохода.');
  //       else if (this.budgetDay > 600) {
  //         return ('У вас средний уровень дохода.');
  //         } else {
  //             return ('К сложалению, у вас уровень дохода ниже среднего.');
  //           }
  // }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  changePercent() {
    const selectValue = this.value;
    if (selectValue === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.addEventListener('change', () => {
        if(depositPercent.value < 0 || depositPercent.value > 100)
          alert('Введите процентную ставку в диапазоне от 0 до 100');
          depositPercent.value = '';
      });
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = '';
      depositPercent.value = selectValue;
    }
  }

  // Выбор процентной ставки банка
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
    
  }

  // Смена цифры под ползунком
  getPeriodAmount() {
    periodAmount.textContent = periodSelect.value;
  }

  // Накопления за выбарнный период
  accumulateMoney() {
    return this.budgetMonth * periodSelect.value;
  }

  // Функция отображения кнопок
  hideShowButtons() {
    if (getComputedStyle(start).display !== 'none') {
      start.style = 'display: none';
      cancel.style = 'display: block';
    } else {
        start.style = 'display: block';
        cancel.style = 'display: none';
      }
  }

  // Блокировка/разблокировка всех инпутов после нажатия кнопки "Рассчитать"
  blockUnblockTextInputs() {
    const textInputs = document.querySelectorAll('[type = text]');
    textInputs.forEach((item) => {
      if (item.hasAttribute('disabled') == false) {
        item.setAttribute('disabled', true);
        item.style.background = '#ebebe4';
      } else {
        item.removeAttribute('disabled');
      }
    });
  }

  // Функция очистки всех текстовых полей
  clearAllTextInputs() {
    const textInputs = document.querySelectorAll('[type = text]');
    textInputs.forEach(function(item){
      item.value = '';
    });
    
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
  }

  // Проверка правильности ввода данных (формата данных) ***из урока 12***
  inputsSumTextControl() {
    let errors = false;
    let inputsName = document.querySelectorAll('[placeholder="Наименование"]');
    let inputsSum = document.querySelectorAll('[placeholder="Сумма"]');

    inputsName.forEach(function(inputElem){
      if (inputElem.value.match(/\d/g) !== null) {
        inputElem.style = 'background: #ff5a5a';
        errors = true;
      }
      else
        inputElem.style = 'background: none';
    });

    inputsSum.forEach(function(inputElem){
      if (inputElem.value.match(/\p{sc=Cyrillic}/gu) !== null) {
        inputElem.style = 'background: #ff5a5a';
        errors = true;
      }
      else
        inputElem.style = 'background: none';
    });

    return errors;
  }

  eventsListeners = function() {
    salaryAmount.addEventListener('change', this.salaryAmountControl);
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    btnIncomeAdd.addEventListener('click', this.addExpIncBlock.bind(this));
    btnExpensesAdd.addEventListener('click', this.addExpIncBlock.bind(this));
    periodSelect.addEventListener('input', this.getPeriodAmount.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }
};

const appData = new AppData();
// let appData2 = new AppData();
// appData2 = JSON.parse(localStorage.getItem('appData'));
// console.log(appData2);
// console.log(document.querySelector('.result').querySelectorAll('[type=text]'));
// document.querySelector('.result').querySelectorAll('[type=text]').forEach((item) => console.log(item.value));

appData.inputsSumTextControl(); 
appData.eventsListeners();
