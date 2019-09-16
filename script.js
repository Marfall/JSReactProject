let money, time;

function start() {
    money = +prompt('Ваш бюджет на месяц?', '');
    time = prompt('Введите дату в формате YYYY-MM-DD', '');

    while(isNaN(money) || money =="" || money== null) {
        money = +prompt('Ваш бюджет на месяц?', '');    
    }
}
start();


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

function chooseExpenses() {
    for (let i = 0; i <  2; i++) {
        let a = prompt("Введите обязательную статью расходов в этом месяце", '');
        let b = prompt('Во сколько обойдется', '');

        if ( typeof(a) === 'string' && typeof(a) != null && typeof(b) != null 
         && a != '' && b != '' && a.length < 50 ) {        
            console.log("done");
            appData.expenses[a] = b;
        }  else {
            console.log("bad result");
            i--;
        }
}
}
chooseExpenses();

    appData.moneyPerDay = (appData.budget / 30).toFixed();  //округление до целого - 1 до первого знака, возвращает строку

    alert("Ежедневный бюджет: " + appData.moneyPerDay);

    if (appData.moneyPerDay < 100) {
        console.log("Минимальный уровнь достатка");
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        console.log("Средний уровень достатка");
    } else if (appData.moneyPerDay > 2000) {
        console.log("Высокий уровень достатка");
    } else {
        console.log("Произошла ошибка");
    }

    function checkSavings() {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?"),
                percent = +prompt("Под какой процент?");

                appData.monthIncome = save/100/12*percent;
        }
    }
