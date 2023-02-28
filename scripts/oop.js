function User(fName, lName, weight, height) {
  this.fName = fName;
  this.lName = lName;
  this.weight = weight;
  this.height = height;
}

User.somethingStatic = function () {};

User.prototype.calculateBmi = function () {
  return (this.weight / this.height ** 2).toFixed(2);
};
User.prototype.toString = function () {
  return this.fName + ' ' + this.lName;
};

const user1 = new User('Paul', 'Negoescu', 85, 1.8);
const user2 = new User('Andreea', 'Popescu', 55, 1.5);

class Admin extends User {
  #myPrivateThing = 'ceva';
  isAdmin = true;

  // constructor(...args) {
  //   // rest operator ... -> during function definition
  //   super(...args); // spread operator ... -> used anywhere else
  //   this.isAdmin = true;
  // }

  toString() {
    return `${super.toString()} ${this.fName} ${
      this.#myPrivateThing
    } is and Admin!`;
  }

  doSpecialAdminStuff() {
    console.log(super.calculateBmi() + 'Special admin stuff');
  }

  get fullName() {
    return `${this.fName} ${this.lName}`;
  }

  static doSomething() {
    console.log('Static method');
  }
}

Admin.prototype.stillWorks = function () {};

const admin1 = new Admin('George', 'Toderica', 110, 1.75);
admin1.fName = 'Ioana';
console.log(admin1);

Admin.doSomething();
console.log(Math.floor(9.35));
