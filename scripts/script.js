// Поле "Месячный доход"
let salaryAmount = document.querySelector('.salary-amount');

// Поле "Дополнительный доход (наименование)"
let extraIncomeTitle = document.querySelector('.extra_income-title');
// Поле "Дополнительный доход (сумма)"
let extraIncomeAmount = document.querySelector('.extra_income-amount');

// Кнопка добавления дополнительного дохода
let btnIncomeAdd = document.getElementsByTagName('button')[0];

// Поле "Возможный доход"
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

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
let budgetMonthValue = document.querySelector('.budget_month-value');

// Поле "Дневной бюджет"
let budgetDayValue = document.querySelector('.budget_day-value');

// Поле "Расход за месяц"
let expensesMonthValue = document.querySelector('.expenses_month-value');

// Поле "Возможные доходы"
let additionalIncomeValue = document.querySelector('.additional_income-value');

// Поле "Возможные расходы"
let additionalExpensesValue = document.querySelector('.additional_expenses-value');

// Поле "Накопления за период"
let incomePeriodValue = document.querySelector('.income_period-value');

// Поле "Накопления за период"
let targetMonthValue = document.querySelector('.target_month-value');

// Кнопка "Рассчитать"
let start = document.getElementById('start');