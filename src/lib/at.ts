// .at()

const food = ["Olives", "Pasts", "Milk"]

console.log(food.at(0));
console.log(food.at(-1)); // Milk


const x = "hello"
console.log(x.at(-1));

// Transpilling

food.at(0)
food.at(-1)

// ↓ converts old style using (std tool for converting bable)

// food[0]
// food[length -1]


// polyfilling
Array.prototype.at = function (index) {
  if (index < 0) {
    return this[this.length -1]
  }
  return this[index]
}

