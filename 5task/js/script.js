let adv = document.querySelectorAll('.adv'),
    menu = document.getElementsByClassName('menu')[0],
    menuItem = document.getElementsByClassName('menu-item'),
    title = document.getElementById("title"),
    menuItemLi = document.createElement("li"),
    promptForApple = document.querySelector("#prompt");
    
  

menu.insertBefore(menuItem[2], menuItem[1]);
adv[0].remove();
title.textContent = "Мы продаем только подлинную технику Apple";


menuItemLi.classList.add("menu-item");      //добавить клас элементу
menuItemLi.textContent = "Пятый элемент";   //добавить текст в элемент
menu.appendChild(menuItemLi);               //вставить в конец родителя
//menu.insertBefore(menuItemLi, menuItem[0]);   вставить в любое расположение

document.body.style.backgroundImage = "url ('img/apple_true.jpg')";

let yourOpinion = prompt("Ваше отношение к технике Apple?");
promptForApple.textContent = yourOpinion;