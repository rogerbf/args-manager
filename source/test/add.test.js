import test from 'tape'
import add from '../library/add'

test(`add`, assert => {
  assert.equal(typeof (add), `function`, `it is a function`)
  assert.end()
})

test(`add string`, assert => {
  const state = { args: [] }
  const app = Object.assign(
    () => state.args,
    add(state)
  )
  app.add(`--force`)
  const expected = [`--force`]
  const actual = app()
  assert.deepEqual(actual, expected)
  assert.end()
})

test(`add number`, assert => {
  const state = { args: [] }
  const app = Object.assign(
    () => state.args,
    add(state)
  )
  app.add(42)
  const expected = [42]
  const actual = app()
  assert.deepEqual(actual, expected)
  assert.end()
})

test(`add array`, assert => {
  const state = { args: [] }
  const app = Object.assign(
    () => state.args,
    add(state)
  )
  app.add([`--hush`, 3000])
  const expected = [`--hush`, 3000]
  const actual = app()
  assert.deepEqual(actual, expected)
  assert.end()
})

test(`add object`, assert => {
  const state = { args: [] }
  const app = Object.assign(
    () => state.args,
    add(state)
  )
  app.add({ SocksPort: 9050 })
  const expected = [{ SocksPort: 9050 }]
  const actual = app()
  assert.deepEqual(actual, expected)
  assert.end()
})
