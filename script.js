let money = prompt('Ваш бюджет на месяц?', '');
let time = prompt('введите дату в формате YYYY-MM-DD', '');

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

let x1 = prompt('Введите обязательную статью расходов в этом месяце', ''),
    x2 = prompt('Во сколько ообойдется'),
    x3 = prompt('Введите обязательную статью расходов в этом месяце', ''),
    x4 = prompt('Во сколько ообойдется');

    appData.expenses.x1 = x2;
    appData.expenses.x3 = x4;

    alert(appData.budget/30);