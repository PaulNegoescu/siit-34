'use strict';

const employee = {
  fName: 'Paul',
  lName: 'Negoescu',
  age: 37,
  weight: 85.5,
  height: 1.85,
  calculateBmi() {
    return (this.weight / this.height ** 2).toFixed(2);
  },
  wrapperFunction() {
    const getThis = () => {
      return this;
    };
    return getThis();
  },

  get fullName() {
    return `${this.fName} ${this.lName}`;
  },

  set fullName(value) {
    // Array Destructuring
    // Destructuring assignment
    [this.fName, this.lName] = value.split(' ');
  },
};

console.log(employee.fullName);
employee.fullName = 'Ionut Popescu';
console.log(employee.fullName);
console.log(employee.fName, employee.lName);

const o = {
  myFunc: employee.calculateBmi,
  weight: 10,
  height: 2,
  wrapper2: employee.wrapperFunction.bind('Paul'),
};

var myFunc = employee.getFullName;

// console.log(employee.calculateBmi());
// console.log(employee.getFullName.call('Paul'));
// console.log(myFunc());
// console.log(employee.getFullName());
// console.log('This in scope-ul functiei: ', this);

// function test() {
//   console.log('test');
// }

// const alta = test;
// console.log(alta());

// console.log(o.wrapper2());

//this in JavaScript (all functions have a this)
// 1. this is not established at the moment of function creation but at the moment of invocation:
//     a. this is whatever is to the left of the "." at the moment of function invocation
//     b. We can set this with the help of call and apply to whatever we want
//     c. Exception: if we don't use strict then if there is nothing to the left of the dot we will have a this of window.
//     d. Exception: arrow functions don't have their own this
// 2. this is established at the moment of function creation
//     a. arrow functions: use/borrow this from their surrounding scope
//     b. we can create functions with bind() which like call and apply sets the "this" for the function
//     c. this inside constructor functions is whatever we want but we invoke those with "new"

// Array and Object destructuring
const arr = [1, 2, 3];
const [unu, , trei] = arr;
console.log({ unu, trei });

const { height: inaltime, fullName: employeeName } = employee;

console.log({ inaltime, employeeName });

function something({ height, fName }) {
  console.log({ height, fName });
}

something(employee);

// ...............

console.clear();

// Objects are not primitives they get passed by reference
function changeSomeStuff(obj) {
  obj.fName = 'Andreea';
  console.log(obj);
}

changeSomeStuff(employee);
console.log(employee);

// 1. Primitives are passed by value, objects are passed by reference
// 2. Primitives are immutable, objects are mutable

// const name = 'Paul';
// console.log(name[0]);
// name[0] = 'I';
// console.log(name);

const arr2 = [1, 2, 3];
console.log(arr2[0]);
arr2[0] = 4;
console.log(arr2);

const arr3 = [...arr2].sort((a, b) => a - b);
console.log({ arr2, arr3 });

const employee2 = { ...employee };
// console.log(function () {} === function () {});
employee2.fName = 'Veronica';
console.log(employee2);

// function test(num) {
//   num = 4;
//   console.log(num);
// }

// let a = 6;
// test(a);
// console.log(a);

const obj1 = { test: 'Paul' };
console.log(obj1);
obj1.test = 'Andrei';
obj1.prop = 3;

class Whatever {}

console.log(typeof Whatever);
