import test from 'tape'
import build from '../library/build'

test(`build`, assert => {
  assert.equal(typeof (build), `function`, `it is a function`)
  assert.end()
})

test(`default builder`, assert => {
  const state = {
    args: [{ SocksPort: 9050 }, { ControlPort: 9051, SocksPort: 8080 }]
  }
  const builder = build(state)
  const actual = builder.build()
  const expected = `--SocksPort 9050 --ControlPort 9051 --SocksPort 8080`
  assert.equal(actual, expected)
  assert.end()
})

test(`custom builder`, assert => {
  const state = {
    args: [{ SocksPort: 9050 }, { ControlPort: 9051, SocksPort: 8080 }],
    builder: args => {
      return state.args.reduce((argsStr, obj) => {
        return argsStr.concat(Object.keys(obj).reduce((str, key) => {
          return str.concat(`-${key} ${obj[key]} `)
        }, ``))
      }, ``).trim()
    }
  }
  const builder = build(state)
  const actual = builder.build()
  const expected = `-SocksPort 9050 -ControlPort 9051 -SocksPort 8080`
  assert.equal(actual, expected)
  assert.end()
})
