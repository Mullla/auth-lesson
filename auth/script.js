'use strict';

const loginName = document.querySelector('.name'),
    signInBtn = document.querySelector('.sign-in'), // авторизация (вход)
    signUpBtn = document.querySelector('.sign-up'), // регистрация
    usersList = document.querySelector('.users-list'),
    userTemplate = document.getElementById('template').content, // шаблон "карточки" юзера - элемент списка юзеров
    userCard = userTemplate.querySelector('.user');

let usersData = [];

if (localStorage.getItem('users' !== null)) {
    let data = localStorage.getItem('users', 'jsonUsers');
    usersData = JSON.parse(data);
} else {
    usersData = [
        {
            firstName: 'Добавьте пользователя.',
            lastName: 'Для этого нажмите зарегистрироваться',
            login: '',
            regDate: 'совсем скоро'
        }
    ];
}
// let data = localStorage.getItem('users', 'jsonUsers');
//     usersData = JSON.parse(data);

function render() {
    usersList.textContent = '';

    usersData.forEach(function (item) {
        const userItem = userCard.cloneNode(true),
            userName = userItem.querySelector('.username'), // имя и фамилия юзера
            userRegister = userItem.querySelector('.register-time'); // время регистрации
        
            usersList.append(userItem);

            userName.textContent = item.firstName + ' ' + item.lastName; // отображение имени и фамилии на странице
            userRegister.textContent = item.regDate; // отображение даты регистрации на странице

            const removeUserBtn = userItem.querySelector('.delete-btn');
            removeUserBtn.addEventListener('click', function () {
                usersData.splice(usersData.indexOf(item), 1);
                render();
            });

    });

    let jsonUsers = JSON.stringify(usersData);
    localStorage.setItem('users', jsonUsers);
}

// добавление юзера
function addUser() {
    let name = prompt('Введите имя и фамилию через пробел'); // строка

    while (name.match(/[A-zА-я]+/g).length !== 2) {
        name = prompt('Введите Имя и Фамилия через пробел');
    }

    let arrName = name.split(' '); // строка разбивается по пробелу и записывается в массив

    let date = new Date();
    const dateOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

    const newUser = {
        firstName: arrName[0].trim(),
        lastName: arrName[1].trim(),
        login: addLogin(),
        password: addPassword(),
        regDate: date.toLocaleString('ru', dateOptions)
    }

        usersData.push(newUser); // добавление нового пользователя в массив
        render(); // переотрисовка списка юзеров
}

function addLogin() {
    let login = prompt('Введите логин').trim();

    while (!login) {
        alert('Поле не может быть пустым!');
        login = prompt('Введите логин').trim();
    }

    return login;
}

function addPassword() {
    let password = prompt('Введите пароль').trim();

    while (!password) {
        alert('Поле не может быть пустым!');
        password = prompt('Введите пароль').trim();
    }

    return password;
}

function autorize() {
    const username = prompt('Введите логин'),
        password = prompt('Введите пароль');

        if (!usersData.find(item => item.login === username) || !usersData.find(item => item.password === password)) {
            alert('Пользователь с такими данными не найден');
        } else {
            let index = usersData.indexOf(usersData.find(item => item.login === username)); // поиск индекса объекта, в котором есть это имя
            loginName.textContent = usersData[index].firstName;
        }
}

signUpBtn.addEventListener('click', addUser);
signInBtn.addEventListener('click', autorize);

render();
