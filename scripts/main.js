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

function counter() {
  const display = document.querySelector('[data-counter-display]');
  const buttons = document.querySelectorAll('[data-counter-button]');

  // buttons[0].addEventListener('click', handleClick);
  // buttons[1].addEventListener('click', handleClick);
  // buttons[2].addEventListener('click', handleClick);

  for (const button of buttons) {
    button.addEventListener('click', handleClick);
  }

  // buttons.forEach((button) => button.addEventListener('click', handleClick));

  const initialCount = 0;
  let count = initialCount;
  updateHtml();

  function handleClick(e) {
    const which = e.target.dataset.counterButton;
    switch (which) {
      case 'increment': {
        count++;
        break;
      }
      case 'decrement': {
        count--;
        break;
      }
      case 'reset': {
        count = initialCount;
        break;
      }
      default: {
        // console.error(`The value "${which}" provided is not valid`);
        count += Number(which);
        break;
      }
    }
    // count += value;
    updateHtml();
  }

  function updateHtml() {
    display.innerText = count;
    if (count > 0) {
      //sa se aplice clasa positive
      display.classList.add('positive');
    } else if (count < 0) {
      //sa se aplice clasa negative
      display.classList.add('negative');
    } else {
      //sa se scoata toate clasele
      display.classList.remove('positive', 'negative');
    }
  }
}

counter();

// IIFE - Immediately Invoked Function Expression
(function () {
  // tot codul
  console.log('ceva');
})();
