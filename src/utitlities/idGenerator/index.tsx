function* idGenerator() {
  let i = 0
  while (true) {
    i++
    yield i
  }
}

export default idGenerator
