// POJO: Plain Old JavaScript Object
// Object Literal
const o = {
  orice: 'val',
  1: 'doi',
  prop: [1, 2, 4],
  obj: {
    nume: 'Paul',
  },
  func1() {
    console.log('This is a method');
  },
};
// o.func1();

// console.dir(document.body.children.titlu);
// const h1 = document.querySelector('[data-heading]');

// h1.style.marginLeft = '60px';

const display = document.querySelector('[data-counter-display]');
const buttons = document.querySelectorAll('[data-counter-button]');

buttons[0].addEventListener('click', handleClick);

let count = 0;

function handleClick() {
  count--;
  display.innerText = count;
}
