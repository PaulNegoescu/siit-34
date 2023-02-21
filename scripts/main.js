'use strict';

/*
0. Sa se scrie o functie care primeste array-ul de mai jos ca parametru si returneaza un 
array de numere unde toate numerele au fost adunate cu 2
*/
console.clear();
const strArr = ['13', '2', '34', '14', '5', '86', '3.46'];

console.log('Typecast: ', typeCastAndAdd(strArr));

function typeCastAndAdd(arr) {
  // const res = [];
  // for (const elem of arr) {
  //   res.push(Number(elem) + 2);
  // }
  // return res;
  return arr.map((elem) => Number(elem) + 2);
}

function siitMap(inputArr, mappingFunction) {
  const res = [];
  for (const elem of inputArr) {
    //this) {
    res.push(mappingFunction(elem));
  }
  return res;
}

// Array.prototype.siitMap = siitMap;

console.log(
  'Typecase using siitMap: ',
  siitMap(strArr, (elem) => Number(elem) * 2)
);

/* 
1. Sa se implementeze o functie care primeste un array de obiecte si un nume de 
cheie si returneaza un array cu toate valorile corespunzatoare cheii din 
obiectele din array.
*/
const demoArr = [
  { id: 1, color: 'red', height: 15, width: 20, distance: 10 },
  { id: 2, color: 'green', height: 5, width: 30, distance: 15 },
  { id: 3, color: 'turqoize', height: 7, width: 9, distance: 8 },
  { id: 4, color: 'blue', height: 2, width: 3, distance: 3 },
  { id: 5, color: 'red', height: 10, width: 10, distance: 2 },
  { id: 6, color: 'crimson', height: 7, width: 8, distance: 16 },
];

// const o = {
//   prop: 2,
//   key: 'Paul',
// };

// const key = 'prop';
// console.warn(o['key']);

function pluck(arr, key) {
  // const list = [];
  // for (const elem of arr) {
  //   list.push(elem[key]);
  // }
  // return list;
  return arr.map((elem) => elem[key]);
}

const list = pluck(demoArr, 'color');

console.log('Pluck: ', list); // => ['red', 'green', 'turqoize' .......];

/*
2. Sa se implementeze o functie care returneaza ariile tuturor elementelor 
din array-ul de mai sus, aria e inaltime * latime.
*/
function calculateArea(arr) {
  // const areas = [];
  // for (let i = 0; i < arr.length; i++) {
  //   const item = arr[i];
  // // for (const item of arr) {
  // //   areas.push(item.height * item.width)
  //   const area = item.height * item.width;

  //   areas.push(area);
  // }
  // return areas;
  return arr.map((item) => item.height * item.width);
}

console.log('Calclulate area:', calculateArea(demoArr));

/*
3. Sa se scrie o functie care returneaza un subset din array-ul de mai sus unde 
elementele au aria mai mica sau egala cu 100
*/
function filterArr(arr) {
  // const res = [];
  // for (const elem of arr) {
  //   if (elem.height * elem.width <= 100) {
  //     res.push(elem);
  //   }
  // }
  // return res;
  return arr.filter((elem) => elem.height * elem.width <= 100);
}

console.log('Filter: ', filterArr(demoArr));

/*
5. Sa se scrie o functie care returneaza primul element
cu culoarea "color"
*/
function findColor(arr, color) {
  // for (const elem of arr) {
  //   if (elem.color === color) {
  //     return elem;
  //   }
  // }
  return arr.find((elem) => elem.color === color);
}
console.log('Find Color: ', findColor(demoArr, 'crimson'));

/*
6. Sa se scrie o functie care returneaza true DACA toate elementele 
din array au aria >= area, false altfel.
*/
function areasAreBigger(arr, area) {
  // for (const elem of arr) {
  //   if (!(elem.height * elem.width >= area)) {
  //     return false;
  //   }
  // }
  // return true;

  return arr.every((elem) => elem.height * elem.width >= area);
}

console.log('Areas are Bigger: ', areasAreBigger(demoArr, 6));

/*
7. Sa se scrie o functie care returneaza true daca cel putin unul din 
elementele array-ului are culoarea 'green';
*/
function atLeastOneIsOfColor(arr, color) {
  return arr.some((elem) => elem.color === color);
}

console.log('At Least One: ', atLeastOneIsOfColor(demoArr, 'green'));

/*
8. Sa se scrie o functie care returneaza distanta totala 
(suma distantelor elementelor)
*/
function sumOfDistances(arr) {
  return arr.reduce((sum, elem) => sum + elem.distance, 0);
}

console.log('Sum of distances: ', sumOfDistances(demoArr));

/*
9. Sa se scrie o functie care returneaza un obiect in care se numara de 
cate ori apare fiecare culoare in parte in array-ul de obiecte. 
{red: 2, blue: 1, etc...}
*/
function noColors(arr) {}

console.log('Number of colors: ', noColors(demoArr));

/*
10. Sa se scrie o functie care returneaza un array cu toate elementele 
care au o culoare unica. Oricare element dupa primul care are o culoare 
care s-ar repeta nu este inclus in array.
*/
function uniqueColors(arr) {}

console.log('Unique Colors: ', uniqueColors(demoArr));

/*
11. Sa se inverseze doua variabile.
*/
function switchNumbers() {
  let a = 5,
    b = 8;
  //Code here to change numbers

  //End code
  console.log('Switch numbers: ', { a, b });
}

switchNumbers();

/*
12. Folosind array-ul de mai jos, vreau sa se obtina o variabila care contine un array
 de obiecte strcturat astfel:
[
  {subject: 'Chemistry', time: '9AM', teacher: 'Mr. Darnick'},
  ...
]
*/
const classes = [
  ['Chemistry', '9AM', 'Mr. Darnick'],
  ['Physics', '10:15AM', 'Mrs. Lithun'],
  ['Math', '11:30AM', 'Mrs. Vitalis'],
];

function buildClasses(arr) {}
console.log('Classes: ', buildClasses(classes));

// console.clear();

/*
Bonus:

Folosind cele doua array-uri de mai jos sa se implementeze doua functii. Una dintre functii returneaza un
array cu obiectele care se regasesc in ambele rezultate dar fara cele care nu se regasesc in ambele. Funcia
le va identifica dupa id. A doua functie va face acelasi lucru dar le va identifica dupa un obiect care
contine proprietatile care trebuie sa fie la fel in cele doua rezultate.
*/
const result1 = [
  { id: 1, name: 'Sandra', type: 'user', username: 'sandra' },
  { id: 2, name: 'Paul', type: 'admin', username: 'johnny2' },
  { id: 3, name: 'Peter', type: 'user', username: 'pete' },
  { id: 4, name: 'Bobby', type: 'user', username: 'be_bob' },
];

const result2 = [
  { id: 2, name: 'John', email: 'johnny@example.com' },
  { id: 4, name: 'Bobby', email: 'bobby@example.com' },
];

function arrayIntersection1(arr1, arr2) {}
console.log(arrayIntersection1(result1, result2));

const props = ['id', 'name'];
function arrayIntersection2(arr1, arr2, props) {}
console.log(arrayIntersection2(result1, result2, props));
