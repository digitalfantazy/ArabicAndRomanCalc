const romanDigits = {
    Z: 2000,
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    VIII: 8,
    VII: 7,
    VI: 6,
    V: 5,
    IV: 4,
    III: 3,
    II: 2,
    I: 1
};


// Надо чтобы принимаемые числа были от 1 до 10 
function stringValidation(string) { // Валидация, проверка на то чтобы были только цифры

    // console.log();
    let pattern = /[^IXVCMLD0-9+*\/-\s]/g;
    // console.log([...string.matchAll(pattern)]);
    if ([...string.matchAll(pattern)].length >= 1 || string.length < 5 ) {
        throw new Error('В строке некорректные символы');
    }


    pattern = /[[+*\/-]{2,}/g; // Если в строке больше чем 1 операнд {} - указываем кол-во 
    // console.log([...string.matchAll(pattern)]);
    if ([...string.matchAll(pattern)].length >= 1 || string.length < 5 ) {
        throw new Error('В строке некорректные символы');
    }
    // return true;
}

function getOperaion(string) { // Получаем знак 
    // console.log('вызов в функции',[...string.match(/[+*\/-]/g)][0]);
    return [...string.match(/[+*\/-]/g)][0];
}

function getNumbers(string) {
    const result = string.split(/[+*\/-]/g).map(num => num.trim());// trim удалил пробелы в массиве
    if (result.length === 2) {
        return result;
    } else {
        throw new Error('В строке должно быть только два числа');
    }
        // return string.split(/[+*\/-]/g).map(num => num.trim()); 
    // console.log(string.split(/[+*\/-]/g).map(num => +num));
}

// const romanObj = (Object.keys(romanDigits));
function arabicToRoman(number) {

    if (number < 1) {
        return '';
    }
    let result = '';

    for (let key in romanDigits) {
      while ( number >= romanDigits[key] ) {
        result += key;
        number -= romanDigits[key];
      }
    }
    return result;
}
// console.log(arabicToRoman('8'));

function romanToArabic(string) {
    // console.log('Арабские', string.split(''));
    return string.split('').reduce((prevValue, currValue, i, arr) => {
        // debugger;
        const [a, b, c] = [
            romanDigits[arr[i]],
            romanDigits[arr[i + 1]],
            romanDigits[arr[i + 2]],
        ];
        if (b && c && a <= b && b < c) {

        }
        // console.log(a);
        // console.log(romanDigits[arr[i]]);
        return b > a ? prevValue - a : prevValue + a;
    }, 0);
}

function isRoman(string) { // Проверка на римские цифры 
    const pattern = /^[IXVCMLD]+$/;
    let arrNums = string.split(/[+*\/-]/g).map(num => num.trim());
    // console.log('Массив из римских цифр', arrNums);
    let countRoman = arrNums.reduce((prevValue, currValue) => prevValue + pattern.test(currValue), 0); // Считает сколько было римский цифр
    // console.log(countRoman);
    if (countRoman === 0) {
        return false;
    } else if (countRoman === 1) {
        throw new Error('Оба числа должы быть римскими или арабскими');
    } else if (countRoman === 2) {
        return true;
        // Перевести из римских в арабские 
        // arrNums = arrNums.map(num => romanToArabic(num));

        // console.log(arrNums);
    }
    return arrNums;
}

function sum(nums) {
    return nums.reduce((a, b) => a + b);
}

function mult(nums) {
    return nums.reduce((a, b) => a * b);
}

function division(nums) {
    return nums.reduce((a, b) => a / b);
}

function substraction(nums) {
    return nums.reduce((a, b) => a - b);
}

function checkOperation(string, nums, str) {
    // console.log(nums);

    nums.forEach(item => {
        if (item < 1 || item > 10) {
            throw new Error('Числа должны быть от 1 до 10');
        }
    });

    let result; // тут можно дописать проверку чтоб числа были от 1 до 10 Скорее всего forEach
    if (string === '+') {
        result = sum(nums);
    } else if (string === '*') {
        result = mult(nums);
    } else if (string === '/') {
        result = division(nums);
    } else if (string === '-') {
        result = substraction(nums);
    }

    if (isRoman(str)){
        // console.log(str);
        return arabicToRoman(result);
    } else { 
        return Math.floor(result);
    } 


}

function calculator(string) {
    stringValidation(string);
    const operaion = getOperaion(string);
    // console.log(operaion);
    let nums = getNumbers(string);
    // console.log(nums);
    const roman = isRoman(string);
    // console.log(roman);
    if (roman) {
        nums = nums.map(num => romanToArabic(num));
        // console.log(nums);
    }
    nums = nums.map(num => +num);
    // console.log(nums);
    // getOperaion(string);
    // getNumbers(string);
    // isRoman(string);
    // console.log(getOperaion(string));
    return String(checkOperation(operaion, nums, string));
}
// calculator();
// console.log('Результат', calculator('II + I'));
// console.log('Результат', calculator('VI / III'));
// console.log('Результат', calculator('V / IV'));
// console.log('Результат', calculator('II / IV'));
// console.log('Результат', calculator('1 + 1 + 1'));
console.log('Результат', calculator('1 + 2'));
// console.log('Результат', calculator('5 / 4'));
// console.log('Результат', calculator('2 / 4'));
// calculator('10 + 10');
// calculator('1 + 1');
// console.log(calculator('1 + 1'));

// console.log([...'string']); // ... разбиваем по символьно
// let pattern  = /[^IXV1-9+*\/-\s]/g;
// console.log([...'string']);

// console.log(calculator('     '));