const levels = {
  1: {
    levelNum: 1,
    skill: 'map',
    text: 'Use the `map` method to get an array containing just the color of each fish.',
    solution(arr) {
      return arr.map(fish => fish.color)
    },
    evaluate(codeString) {
      return this.caughtFish.map(eval(codeString))
    }
  }
}