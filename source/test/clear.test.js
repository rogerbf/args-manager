import test from 'tape'
import clear from '../library/clear'

test(`clear`, assert => {
  assert.equal(typeof (clear), `function`, `it is a function`)
  assert.end()
})

test(`state cleared`, assert => {
  const state = { args: [{ SocksPort: 9050 }] }
  const app = clear(state)
  app.clear()
  const expected = []
  assert.deepEqual(state.args, expected)
  assert.end()
})
