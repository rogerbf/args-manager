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
  assert.end()
})

test(`add() array of objects`, assert => {
  const state = { args: [] }
  const app = Object.assign(() => state.args, add(state))

  app.add({ SocksPort: 9050, ControlPort: 9051 })
  const expectedState = [{ SocksPort: 9050, ControlPort: 9051 }]
  assert.deepEqual(app(), expectedState, `mutates state as expected`)
  assert.end()
})

test(`add() array of objects with set valid keys`, assert => {
  const state = { args: [], valid: [`Test`, `Opt2`, `SocksPort`] }
  const app = Object.assign(() => state.args, add(state))

  assert.throws(app.add.bind(null, { SocksPort: 9050, ControlPort: 9051 }))
  assert.deepEqual(app(), [])
  assert.end()
})
