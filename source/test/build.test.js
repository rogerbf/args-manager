import test from 'tape'
import build from '../library/build'

test(`build`, assert => {
  assert.equal(typeof (build), `function`, `it is a function`)
  assert.end()
})

test(`build()`, assert => {
  const args = [{ SocksPort: 9050 }, { ControlPort: 9051, SocksPort: 8080 }]
  const actual = build(args)
  const expected = [`SocksPort`, 9050, `ControlPort`, 9051, `SocksPort`, 8080]
  assert.deepEqual(actual, expected)
  assert.end()
})

test(`build mixed types`, assert => {
  const args = [{ SocksPort: 9050 }, `testing`, { ControlPort: 9051, SocksPort: 8080 }, 42]
  const actual = build(args)
  const expected = [`SocksPort`, 9050, `testing`, `ControlPort`, 9051, `SocksPort`, 8080, 42]
  assert.deepEqual(actual, expected)
  assert.end()
})
