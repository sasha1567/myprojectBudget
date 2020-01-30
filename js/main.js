'use strict';

let startCountBtn = document.getElementById('start'),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value'),
	incomeValue = document.getElementsByClassName('income-value'),
	monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
	yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0];	

let expensesOblig = document.getElementsByClassName('expenses-item');

let expensesItemButton = document.getElementsByTagName('button')[0];
let optionalExpensesButton = document.getElementsByTagName('button')[1];
let countBudgetButton = document.getElementsByTagName('button')[2];

let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');

let incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('.checksavings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

expensesItemButton.disabled = true;
optionalExpensesButton.disabled = true;
countBudgetButton.disabled = true;


startCountBtn.addEventListener('click', function() {
	time = prompt ("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt ("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed(); //округлили до ближайшего целого числа
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    expensesItemButton.disabled = false;
	optionalExpensesButton.disabled = false;
	countBudgetButton.disabled = false;

});
    
expensesItemButton.addEventListener('click', function() {
	let sum = 0;

	for (let i = 0; i < expensesOblig.length; i++) {
         let a = expensesOblig[i].value, 
             b = expensesOblig[++i].value;
        
            if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {

                console.log ("done");
        
                appData.expenses[a] = b;
                sum += +b;
            } else {
                console.log ("bad result");
                i = i - 1;
            }
        
        }
    expensesValue.textContent = sum;
});

optionalExpensesButton.addEventListener('click', function() {
	 for (let i = 0; i < optionalExpensesItem.length; i++) {
            let questionOptExpenses = optionalExpensesItem[i].value;
            appData.optionalExpenses[i] = questionOptExpenses;
            optionalExpensesValue[0].textContent += appData.optionalExpenses[i] + ' '; 
        }
});

countBudgetButton.addEventListener('click', function() {

	if(appData.budget != undefined) {
		appData.moneyPerDay = (appData.budget / 30).toFixed();
	dayBudgetValue.textContent = appData.moneyPerDay;
	if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Это минимальный уровень достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Это средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Это высокий уровень достатка";
        } else {
            levelValue.textContent = "Ошибка";
        }
	} else {
		dayBudgetValue.textContent = "Произошла ошибка";
	}
});

incomeItem.addEventListener('input', function() {
	let items = incomeItem.value;
	appData.income = items.split(", ");
	incomeValue[0].textContent = appData.income; 
});

checkSavings.addEventListener('click', function() {
	if (appData.savings == true) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}
	console.log(appData.savings);
});

sumValue.addEventListener('input', function() {
	if (appData.savings == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthIncome = sum/100/12*percent;	
		appData.yearIncome = sum/100*percent;
		monthSavingsValue.textContent = appData.monthIncome.toFixed(1); //округляем до 1 точки после запятой
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);

	}
});

percentValue.addEventListener('input', function() {
	if (appData.savings == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthIncome = sum/100/12*percent;	
		appData.yearIncome = sum/100*percent;
		monthSavingsValue.textContent = appData.monthIncome.toFixed(1); //округляем до 1 точки после запятой
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};