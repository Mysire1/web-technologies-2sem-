function task1() {
    let fruits = ['яблуко', 'банан', 'вишня', 'груша'];
    fruits.pop();
    console.log('1.1:', fruits);

    fruits.unshift('ананас');
    console.log('1.2:', fruits);

    fruits.sort().reverse();
    console.log('1.3:', fruits);

    console.log('1.4: Індекс яблука:', fruits.indexOf('яблуко'));
}

function task2() {
    let colors = ['червоний', 'синій', 'зелений', 'жовтий', 'темно-синій'];
    let longest = colors.reduce((a, b) => a.length > b.length ? a : b);
    let shortest = colors.reduce((a, b) => a.length < b.length ? a : b);

    console.log('2.1: Довгий:', longest, 'Короткий:', shortest);

    colors = colors.filter(color => color.includes('синій'));

    console.log('2.2:', colors);
    console.log('2.3:', colors);
}

function task3() {
    let employees = [
        {name: 'Іван', age: 30, position: 'менеджер'},
        {name: 'Вадим', age: 25, position: 'розробник'},
        {name: 'Олексій', age: 35, position: 'розробник'}
    ];

    employees.sort((a, b) => a.name.localeCompare(b.name));
    console.log('3.1:', employees);

    let devs = employees.filter(emp => emp.position === 'розробник');
    console.log('3.2:', devs);

    employees = employees.filter(emp => emp.age !== 35);
    console.log('3.3:', employees);

    employees.push({name: 'Олег', age: 28, position: 'аналітик'});
    console.log('3.4:', employees);
}

function task4() {
    let students = [
        {name: 'Олексій', age: 22, course: 3},
        {name: 'Вадим', age: 19, course: 2},
        {name: 'Костя', age: 24, course: 4}
    ];

    students = students.filter(s => s.name !== 'Олексій');
    console.log('4.1:', students);

    students.push({name: 'Аня', age: 20, course: 1});
    console.log('4.2:', students);

    students.sort((a, b) => b.age - a.age);
    console.log('4.3:', students);

    let thirdCourse = students.filter(s => s.course === 3);
    console.log('4.4:', thirdCourse);
}

function task5() {
    let numbers = [1, 2, 3, 4, 5];

    let squares = numbers.map(num => num ** 2);
    console.log('5.1:', squares);

    let evens = numbers.filter(num => num % 2 === 0);
    console.log('5.2:', evens);

    let sum = numbers.reduce((sum, num) => sum + num, 0);
    console.log('5.3: Сума:', sum);

    numbers = [...[10, 11, 12, 13, 14], ...numbers];
    console.log('5.4:', numbers);

    numbers.splice(0, 3);
    console.log('5.5:', numbers);
}

function libraryManagement() {
    let library = [
        {title: 'Книга1', author: 'Автор1', genre: 'Фантастика', pages: 300, isAvailable: true},
        {title: 'Книга2', author: 'Автор2', genre: 'Детектив', pages: 250, isAvailable: false},
        {title: 'Книга3', author: 'Автор1', genre: 'Роман', pages: 200, isAvailable: true}
    ];

    function addBook(title, author, genre, pages) {
        library.push({title, author, genre, pages, isAvailable: true});
    }

    function removeBook(title) {
        library = library.filter(book => book.title !== title);
    }

    function findBooksByAuthor(author) {
        return library.filter(book => book.author === author);
    }

    function toggleBookAvailability(title, isBorrowed) {
        const book = library.find(book => book.title === title);
        if (book) {
            book.isAvailable = !isBorrowed;
        }
    }

    function sortBooksByPages() {
        library.sort((a, b) => a.pages - b.pages);
    }

    function getBooksStatistics() {
        const total = library.length;
        const available = library.filter(book => book.isAvailable).length;
        const borrowed = total - available;
        const avgPages = total === 0 ? 0 : (library.reduce((sum, book) => sum + book.pages, 0) / total).toFixed(2);

        return {
            totalBooks: total,
            availableBooks: available,
            borrowedBooks: borrowed,
            averagePages: Number(avgPages)
        };
    }

    console.log("6.1 Бібліотека:", library);

    addBook('Книга4', 'Автор3', 'Фентезі', 400);
    console.log("6.2 Нова бібліотека:", library);

    removeBook('Книга2');
    console.log("6.3 Видалено.Оновленна Бібліотека:", library);

    console.log("6.4 Книги автора:", findBooksByAuthor('Автор1'));

    toggleBookAvailability('Книга1', true);
    console.log("6.5 Статус книги:", library.find(b => b.title === 'Книга1'));

    sortBooksByPages();
    console.log("6.6 Сортування за сторінками:", library);

    console.log("6.7 Статистика:", getBooksStatistics());
}

function task7() {
    let student = {
        name: 'Костя',
        age: 21,
        course: 2,
        subjects: ['Математика', 'Фізика', 'Програмування']
    };

    delete student.age;

    console.log('7:', student);
}

task1()
task2()
task3()
task4()
task5()
libraryManagement()
task7()