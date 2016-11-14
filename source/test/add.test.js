import test from 'tape'
import add from '../library/add'

test(`add`, assert => {
  assert.equal(typeof (add), `function`, `it is a function`)
  assert.end()
})

test(`add() single object`, assert => {
  const state = {
    args: []
  }
  const app = Object.assign(() => state.args, add(state))

  app.add({ SocksPort: 9050 })
  const expectedState = [{ SocksPort: 9050 }]
  assert.deepEqual(app(), expectedState, `mutates state as expected`)
  assert.end()
})

test(`add() single object with set valid keys`, assert => {
  const state = {
    args: [],
    valid: [`ControlPort`]
  }
  const app = Object.assign(() => state.args, add(state))

  assert.throws(app.add.bind(null, { SocksPort: 9050 }))
  assert.deepEqual(app(), [])
  assert.equal(app().length, 0)
  assert.end()
})

test(`add() object with two keys`, assert => {
  const state = { args: [] }
  const app = Object.assign(() => state.args, add(state))

  app.add({ SocksPort: 9050, ControlPort: 9051 })
  const expectedState = [{ SocksPort: 9050, ControlPort: 9051 }]
  assert.deepEqual(app(), expectedState, `mutates state as expected`)
  assert.equal(app().length, 1)
  assert.end()
})

test(`add() array of objects with set valid keys`, assert => {
  const state = { args: [], valid: [`Test`, `Opt2`, `SocksPort`] }
  const app = Object.assign(() => state.args, add(state))

  assert.throws(app.add.bind(null, { SocksPort: 9050, ControlPort: 9051 }))
  assert.deepEqual(app(), [])
  assert.equal(app().length, 0)

  app.add({ Test: `this is a test` })
  const expected = [{ Test: `this is a test` }]
  assert.deepEqual(app(), expected)

  assert.end()
})

test(`add(String)`, assert => {
  const state = { args: [] }
  const app = Object.assign(() => state.args, add(state))
  app.add(`hello`)
  assert.deepEqual(app(), [`hello`])
  app.add({ hello: `there` })
  assert.deepEqual(app(), [`hello`, { hello: `there` }])
  assert.end()
})

test(`add with unwanted types`, assert => {
  const state = { args: [] }
  const app = Object.assign(() => state.args, add(state))
  assert.throws(app.add.bind(null, [`hello`]))
  assert.end()
})

test(`add with mixed types and validation`, assert => {
  const state = { args: [], valid: [`Test`, `Opt2`, `SocksPort`] }
  const app = Object.assign(() => state.args, add(state))

  app.add(`Test`)
  assert.deepEqual(app(), [`Test`])
  app.add(42)
  assert.deepEqual(app(), [`Test`, 42])
  assert.end()
})
