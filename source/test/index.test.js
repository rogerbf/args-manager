import test from 'tape'
import createManager from '../index'

test(`{ createManager }`, assert => {
  assert.equal(typeof (createManager), `function`, `it is a function`)
  assert.end()
})

test(`createManager() and returned value`, assert => {
  const args = createManager()
  assert.equal(typeof (args), `function`, `it returns a function`)
  assert.test(`properties`, assert => {
    assert.deepEqual(args(), [], `calling returns an array`)
    assert.ok(args.hasOwnProperty(`add`), `it has a method: add`)
    assert.ok(args.hasOwnProperty(`clear`), `it has a method: clear`)
    assert.end()
  })
  assert.end()
})

test(`state.allowed - wrong type`, assert => {
  assert.throws(createManager.bind(null, { valid: `` }))
  assert.throws(createManager.bind(null, { valid: {} }))
  assert.throws(createManager.bind(null, { valid: 10 }))
  assert.throws(createManager.bind(null, { valid: null }))
  assert.end()
})

test(`init with args`, assert => {
  const args = createManager({ args: [{ metric: `superior` }] })
  const expected = [`metric`, `superior`]
  const actual = args()
  assert.deepEqual(actual, expected)
  assert.end()
})

test(`init, add, clear, custom builder`, assert => {
  const args = createManager({
    builder: (args) => {
      return args.reduce((argObj, obj) => {
        return Object.assign(argObj, obj)
      }, {})
    },
    valid: [`SocksPort`, `ControlPort`, `HashedPassword`]
  })

  args.add({ SocksPort: 9095 })
  args.add({ ControlPort: 8080 })
  args.add({ SocksPort: 7070, HashedPassword: `ff00` })

  // const expectedArgsArr = [
  //   `SocksPort`, `9095`,
  //   `ControlPort`, `8080`,
  //   `SocksPort`, `7070`,
  //   `HashedPassword`, `ff00`
  // ]
  //
  // assert.deepEqual(args(), expectedArgsArr)

  const expectedA = { SocksPort: 7070, ControlPort: 8080, HashedPassword: `ff00` }
  assert.deepEqual(args(), expectedA)

  args.clear()
  const expectedB = {}
  assert.deepEqual(args(), expectedB)

  assert.throws(args.add.bind(null, { testing: `a test` }))

  assert.end()
})

test(`add mixed string/object`, assert => {
  const args = createManager()
  assert.deepEqual(args(), [])
  args.add(`hello`)
  assert.deepEqual(args(), [`hello`])
  args.add({ there: `is here` })
  assert.deepEqual(args(), [`hello`, `there`, `is here`])
  args.add(42)
  assert.deepEqual(args(), [`hello`, `there`, `is here`, 42])
  assert.end()
})
