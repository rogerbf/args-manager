import test from 'tape'
import normalize from '../library/normalize'

test(`is a function`, assert => {
  assert.equal(typeof (normalize), `function`)
  assert.end()
})

test(`normalize() object`, assert => {
  const config = { Host: `localhost`, Port: 9009 }
  assert.deepEqual(normalize(config), [`Host`, `Port`])
  assert.end()
})

test(`normalize() object`, assert => {
  const config = { SocksPort: 9050 }
  assert.deepEqual(normalize(config), [`SocksPort`])
  assert.end()
})

test(`normalize() array`, assert => {
  const config = [`--silent`, `--monitor`]
  assert.deepEqual(normalize(config), [`--silent`, `--monitor`])
  assert.end()
})

test(`normalize() string`, assert => {
  const config = `--hush`
  assert.deepEqual(normalize(config), [`--hush`])
  assert.end()
})

test(`normalize() number`, assert => {
  const config = 10
  assert.deepEqual(normalize(config), [10])
  assert.end()
})
