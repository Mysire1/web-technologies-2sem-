function task1() {
    let fruits = ['яблуко', 'банан', 'вишня', 'груша'];
    fruits.pop();
    document.getElementById('task1').innerText += '1.1: ' + fruits.join(', ') + '\n';

    fruits.unshift('ананас');
    document.getElementById('task1').innerText += '1.2: ' + fruits.join(', ') + '\n';

    fruits.sort().reverse();
    document.getElementById('task1').innerText += '1.3: ' + fruits.join(', ') + '\n';

    document.getElementById('task1').innerText += '1.4: Індекс яблука: ' + fruits.indexOf('яблуко') + '\n';
}

function task2() {
    let colors = ['червоний', 'синій', 'зелений', 'жовтий', 'темно-синій'];
    let longest = colors.reduce(function(a, b) {
        return a.length > b.length ? a : b;
    });
    let shortest = colors.reduce(function(a, b) {
        return a.length < b.length ? a : b;
    });

    document.getElementById('task2').innerText += '2.1: Довгий: ' + longest + ' Короткий: ' + shortest + '\n';

    colors = colors.filter(function(color) {
        return color.includes('синій');
    });

    document.getElementById('task2').innerText += '2.2: ' + colors.join(', ') + '\n';
    document.getElementById('task2').innerText += '2.3: ' + colors.join(', ') + '\n';
}

function task3() {
    let employees = [
        {name: 'Іван', age: 30, position: 'менеджер'},
        {name: 'Вадим', age: 25, position: 'розробник'},
        {name: 'Олексій', age: 35, position: 'розробник'}
    ];

    employees.sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });

    document.getElementById('task3').innerText += '3.1: ' + employees.map(function(emp) {
        return emp.name + ' (' + emp.position + ')';
    }).join(', ') + '\n';

    document.getElementById('task3').innerText += '3.2: ' + employees.filter(function(emp) {
        return emp.position === 'розробник';
    }).map(function(emp) {
        return emp.name;
    }).join(', ') + '\n';

    employees = employees.filter(function(emp) {
        return emp.age !== 35;
    });

    document.getElementById('task3').innerText += '3.3: ' + employees.map(function(emp) {
        return emp.name + ' (' + emp.age + ')';
    }).join(', ') + '\n';

    employees.push({name: 'Олег', age: 28, position: 'аналітик'});

    document.getElementById('task3').innerText += '3.4: ' + employees.map(function(emp) {
        return emp.name + ' (' + emp.position + ')';
    }).join(', ') + '\n';
}

function task4() {
    let students = [
        {name: 'Олексій', age: 22, course: 3},
        {name: 'Вадим', age: 19, course: 2},
        {name: 'Костя', age: 24, course: 4}
    ];
    students = students.filter(function(student) {
        return student.name !== 'Олексій';
    });

    document.getElementById('task4').innerText += '4.1: ' + students.map(function(student) {
        return student.name + ' (курс ' + student.course + ')';
    }).join(', ') + '\n';

    students.push({name: 'Анна', age: 20, course: 1});

    document.getElementById('task4').innerText += '4.2: ' + students.map(function(student) {
        return student.name + ' (курс ' + student.course + ')';
    }).join(', ') + '\n';

    students.sort(function(a, b) {
        return b.age - a.age;
    });

    document.getElementById('task4').innerText += '4.3: ' + students.map(function(student) {
        return student.name + ' (' + student.age + ')';
    }).join(', ') + '\n';

    document.getElementById('task4').innerText += '4.4: ' + students.filter(function(student) {
        return student.course === 3;
    }).map(function(student) {
        return student.name;
    }).join(', ') + '\n';
}

function task5() {
    let numbers = [1, 2, 3, 4, 5];

    document.getElementById('task5').innerText += '5.1: ' + numbers.map(function(num) {
        return num ** 2;
    }).join(', ') + '\n';

    document.getElementById('task5').innerText += '5.2: ' + numbers.filter(function(num) {
        return num % 2 === 0;
    }).join(', ') + '\n';

    document.getElementById('task5').innerText += '5.3: Сума: ' + numbers.reduce(function(sum, num) {
        return sum + num;
    }, 0) + '\n';

    numbers = [...[10, 11, 12, 13, 14], ...numbers];

    document.getElementById('task5').innerText += '5.4: ' + numbers.join(', ') + '\n';

    numbers.splice(0, 3);

    document.getElementById('task5').innerText += '5.5: ' + numbers.join(', ') + '\n';
}

function task6() {
    let library = [
        {title: 'Книга1', author: 'Автор1', genre: 'Фантастика', pages: 300, isAvailable: true},
        {title: 'Книга2', author: 'Автор2', genre: 'Детектив', pages: 250, isAvailable: false}
    ];

    document.getElementById('task6').innerText += '6: Всього книг: ' + library.length + ', доступних: ' + library.filter(function(book) {
        return book.isAvailable;
    }).length + '\n';
}

function task7() {
    let student = { name: 'Костя', age: 21, course: 2 };
    student.subjects = ['Математика', 'Фізика', 'Програмування'];
    delete student.age;

    document.getElementById('task7').innerText += '7: ' + student.name + ', предмети: ' + student.subjects.join(', ') + '\n';
}

task1();
task2();
task3();
task4();
task5();
task6();
task7();