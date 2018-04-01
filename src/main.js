console.log('main.js is connected!')

const times = x => f => {
  if (x > 0) {
    f()
    setTimeout(() => times(x - 1)(f), 50)
  }
}

const getRandomColor = () => constants.colors[Math.floor(Math.random() * constants.colors.length)]
const generateStamp = () => Math.floor(Math.random() * Date.now()).toString(16)
const generateSpeed = () => Math.floor(Math.random() * 50) + 30

let river = {
  setup() {
    this.element = document.querySelector('.river')
    const { left, right, top, height } = this.element.getBoundingClientRect()
    return { left, right, top, height, ...this }
  },
  randomPoint() {
    const diff = this.right - this.left - 50
    const offset = Math.floor(Math.random() * diff)
    return `${offset + this.left}px`
  }
}

const constants = {
  colors: ['red', 'green', 'blue', 'yellow', 'purple'],
  body: null
}

function createFish(howMany) {
  times(howMany)(() => new Fish(
    getRandomColor(),
    river.randomPoint(),
    generateStamp(),
    generateSpeed()
  ).init())
}

class Fish {
  constructor(color, offset, stamp, speed) {
    this.color = color
    this.stamp = stamp
    this.offset = offset
    this.speed = speed
  }

  create() {
    this.domElement = document.createElement('div')
    this.domElement.classList.add('fish')
    this.domElement.style.backgroundColor = this.color
    this.domElement.style.left = this.offset
    this.domElement.style.top = 0
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
      if (this.domElement.getBoundingClientRect().bottom > river.height) this.remove()
    }, 30)
  }

  remove() {
    constants.body.removeChild(this.domElement)
  }

}


document.addEventListener('DOMContentLoaded', () => {
  river = river.setup()
  constants.body = document.querySelector('body')
  createFish(5)
})
