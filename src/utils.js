const times = x => f => {
  if (x > 0) {
    f()
    setTimeout(() => times(x - 1)(f), 50)
  }
}

const getRandomColor = () => constants.colors[Math.floor(Math.random() * constants.colors.length)]
const generateStamp = () => Math.floor(Math.random() * Date.now()).toString(16)
const generateSpeed = () => Math.floor(Math.random() * 20) + 20

const constants = {
  colors: ['red', 'green', 'blue', 'yellow', 'purple'],
  body: null,
  input: null,
  inputValue() {
    return this.input.value
  }
}

const updateOnLengthChange = (cb) => ({
  set: (target, prop, val, rec) => {
    target[prop] = val
    if (prop === 'length') {
      cb()
    }
    return true
  }
})
