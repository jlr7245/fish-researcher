console.log('main.js is connected!')

const river = {
  setup() {
    this.element = document.querySelector('.river')
    const { left, right, top, height } = this.element.getBoundingClientRect()
    this.setMidPoint(height)
    this.left = left
    this.height = height
    this.top = top
    this.right = right
  },
  randomPoint() {
    const diff = this.right - this.left - 50
    const offset = Math.floor(Math.random() * diff)
    return `${offset + this.left}px`
  },
  setMidPoint(height) {
    this.midpoint = height / 2
  }
}

const evaluateFish = () => {
  const codeString = constants.input.value
  const arr = state.caughtFish.map(eval(codeString))
  console.log(arr)
  constants.output.innerHTML = `[${arr.join(', ')}]`
}

const state = {
  caughtFish: new Proxy([], changeOnArbitraryLength(10, evaluateFish)),
  createFish(howMany) {
    times(howMany)(() => new Fish(
      getRandomColor(),
      river.randomPoint(),
      generateStamp(),
      generateSpeed()
    ).init())
  }
}

class Fish {
  constructor(color, offset, stamp, speed) {
    this.color = color
    this.stamp = stamp
    this.offset = offset
    this.speed = speed
    this.hasBeenCaught = false
    this.data = {
      color, speed
    }
  }

  create() {
    this.domElement = document.createElement('div')
    this.domElement.classList.add('fish')
    this.domElement.style.backgroundColor = this.color
    this.domElement.style.left = this.offset
    this.domElement.style.top = '-50px'
    this.domElement.dataset.stamp = this.stamp
    constants.body.appendChild(this.domElement)
  }

  init() {
    this.create()
    this.move()
  }

  move() {
    setInterval(() => {
      const currentTopVal = parseInt(this.domElement.style.top)
      this.domElement.style.top = `${currentTopVal + this.speed * 0.2}px`
      if (this.domElement.getBoundingClientRect().bottom > river.midpoint && !this.hasBeenCaught) {
        this.catch()
        this.hasBeenCaught = true
      }
      if (this.domElement.getBoundingClientRect().bottom > river.height) this.remove()
    }, 30)
  }

  remove() {
    constants.body.removeChild(this.domElement)
  }

  catch() {
    this.domElement.innerHTML = 'c'
    state.caughtFish.push({...this.data})
  }

}


document.addEventListener('DOMContentLoaded', () => {
  river.setup()
  constants.body = document.querySelector('body')
  constants.input = document.querySelector('#thingtodo')
  constants.output = document.querySelector('#output')
  document.querySelector('#doit').addEventListener('click', () => state.createFish(10))
})
