window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    });

    // Timer 

    let deadline = '2019-09-25';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
            
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                        if(num <= 9) {
                            return '0' + num;
                        } else return num;
                    };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);

    //Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

        more.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden'; //запрет прокрутки страницы как только открывается модальное окно

            close.addEventListener('click', function() {
                overlay.style.display = 'none';
                more.classList.remove('more-splash');
                document.body.style.overflow = '';
            });
        });

        // Form

        let message = {
            loading: 'Загрузка...',
            success: 'Спасибо!  Скоро мы с вами свяжемся!',
            failure: 'Что-то пошло не так...'

        };

        let form = document.querySelector('.main-form'),
            input = form.getElementsByTagName('input'),
            statusMessage = document.createElement('div');     //создаст div на странице

            statusMessage.classList.add('status');             //стилизует div

            form.addEventListener('submit', function(event) {
                event.preventDefault();                        //отменить стандартное поведение баузера на перезагрузку всей страницы при отправке формы
                                                            //обработчик события вешается на фому,а не на кнопку

                form.appendChild(statusMessage);            //оповещение пользователя - помещаем новый элемент в форму

                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                //request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');  //данные из формы
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                let formData = new FormData(form);      //получаем от пользователя все в объект FormData

                let obj = {};

                formData.forEach(function(value, key) {         // превращение в обычный объект (промежуточная операция)
                    obj[key] = value;
                });
                
                let json = JSON.stringify(obj);

                request.send(json);      // отправляем объект на сервер в формате json


               //request.send(formData);

                request.addEventListener('readystatechange', function() {
                    if (request.readyState < 4) {
                        statusMessage.innerHTML = message.loading;
                    }  else if (request.readyState === 4 && request.status == 200) {
                        statusMessage.innerHTML = message.success;
                    } else {
                        statusMessage.innerHTML = message.failure;
                    }
                });
                
                    for (let i = 0; i < input.length; i++) {    //очистка input после submit формы
                        input[i].value = '';
                    }
            });              


            //Slider

            let slideIndex  = 1,
                slides = document.querySelectorAll('.slider-item'),
                prev = document.querySelector('.prev'),
                next = document.querySelector('.next'),
                dotsWrap = document.querySelector('.slider-dots'),
                dots = document.querySelectorAll('.dot');
            
            showSlides(slideIndex);

            function showSlides(n) {

                if (n > slides.length) {
                    slideIndex = 1;                // к первому слайду
                }

                if (n < 1) {
                    slideIndex = slides.length;   // к последнему слайду
                }

                slides.forEach((item) => item.style.display = 'none');    //скрыть слайды

                // for(let i = 0; i < slides.lang; i++) {
                //     slides[i].style.showSlides = 'none';
                // }

                dots.forEach((item) => item.classList.remove('dot-active'));   //удаляем класс

                slides[slideIndex - 1].style.display = 'block';
                dots[slideIndex - 1].classList.add('dot-active');
            }

            function plusSlides(n) {                
                showSlides (slideIndex += n);          //перелистываем слайды вперед
            }

            function currentSlide(n) {
                showSlides(slideIndex = n);
            }

            prev.addEventListener('click', function() {
                plusSlides(-1);
            });

            next.addEventListener('click', function(){
                plusSlides(1);
            });

            dotsWrap.addEventListener('click', function(event) {    //используем делегирование событий
                for (let i = 0; i < dots.length + 1; i++) {
                    if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                        currentSlide(i);   
                    }  
                }
            });   
            
            
            //Calculator

            let persons = document.querySelectorAll('.counter-block-input')[0],
            restDays = document.querySelectorAll('.counter-block-input')[1],
            place = document.getElementById('select'),
            totalValue = document.getElementById('total'),
            personsSum = 0,
            daysSum = 0,
            total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('change', function() {
            personsSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if(restDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('change', function() {
            daysSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if(persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function() {
            if (restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        });
            
   
});


// Второе задание

// let age = document.getElementById('age');
 
// function showUser(surname, name) {
//          alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
// }
 
// showUser.apply(age, ["Горький","Максим"]);

// let s = "abc";
// function accum(s) {
//     console.log(s);
//     let res = "";
//     for (let i = 0; i < s.length; i++) {
        
//         for (let j = 0; j <= i; j++) {
//             if (j == 0) {
//                 res = res + s[i].toUpperCase();
//             } else {
//                 res = res + s[i];
//             }    
            
//         }
//         if (i < s.length - 1) {
//               res = res + '-';  
//         }

//         console.log(res);
//     }
// }
// accum(s);

// let s = "abc";
// function accum(s) {
//     let res = '';
//     for (let i = 0; i < s.length; i++) {
        
//         for (let j = 0; j <= i; j++) {
//             if (j == 0) {
//                 res = res + s[i].toUpperCase();
//             } else {
//                 res = res + s[i];
//             }    
//          }
//         if (i < s.length - 1) {
//               res = res + '-';  
//         }
//     }

//     return res;
// }
// console.log(accum(s));

// class Options {
// 	constructor(height, width, bg, fontSize, textAlign) {
// 		this.height = height;
// 		this.width = width;
// 		this.bg = bg;
// 		this.fontSize = fontSize;
// 		this.textAlign = textAlign;
// 	}

// 	createDiv() {
// 		let elem = document.createElement('div');
// 		document.body.appendChild(elem);
// 		let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
// 		elem.style.cssText = param;
// 	}
// }

// const item = new Options(300, 350, "red", 14, "center");

// item.createDiv();