import idGenerator from '.'

describe('Check the function of the idGenerator', () => {
  it('should generate id properly', () => {
    const gen = idGenerator()
    expect(gen.next().value).toBe(1)
    expect(gen.next().value).toBe(2)
    expect(gen.next().value).toBe(3)
  })
})