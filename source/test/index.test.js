import test from 'tape'
import createManager from '../index'

test(`createManager is a function`, assert => {
  assert.equal(typeof (createManager), `function`)
  assert.end()
})

test(`createManager()`, assert => {
  const args = createManager()

  assert.equal(typeof (args), `function`)
  assert.equal(typeof (args.add), `function`)
  assert.equal(typeof (args.clear), `function`)

  args.add(`--hush`)
  assert.deepEqual(args(), [ `--hush` ])

  args.add({ SocksPort: 9050 })
  assert.deepEqual(args(), [ `--hush`, `SocksPort`, 9050 ])

  args.add([`--kv`, `key=value`])
  assert.deepEqual(args(), [ `--hush`, `SocksPort`, 9050, `--kv`, `key=value` ])

  args.clear()
  assert.deepEqual(args(), [])

  assert.end()
})

test(`createManager({ validArgs })`, assert => {
  const args = createManager({ validArgs: [ `ControlPort`, `HidServAuth` ] })

  assert.throws(args.add.bind(null, `invalidArg`))

  args.add({ HidServAuth: `4lsysj239fg9sdva.onion CoPsZkTbUsTy20dQ7EHWaR` })
  assert.deepEqual(
    args(),
    [ `HidServAuth`, `4lsysj239fg9sdva.onion CoPsZkTbUsTy20dQ7EHWaR` ]
  )

  args.add({ ControlPort: 9051 })
  assert.deepEqual(
    args(),
    [ `HidServAuth`, `4lsysj239fg9sdva.onion CoPsZkTbUsTy20dQ7EHWaR`,
      `ControlPort`, 9051 ]
  )
  assert.end()
})

test(`createManager({ validate })`, assert => {
  const validate = (list, arg) => {
    if (typeof (arg) !== `string`) {
      throw new Error(`arg must be a string`)
    } else {
      return arg
    }
  }
  const args = createManager({ validate })

  args.add(`--Server`)
  assert.deepEqual(args(), [ `--Server` ])

  assert.throws(args.add.bind(null, { Port: 8080 }))

  assert.end()
})

test(`createManager({ build })`, assert => {
  const build = (args) => {
    return args.map(arg => `--${arg}`)
  }
  const args = createManager({ build })

  args.add(`server`)
  args.add(`listen`)
  assert.deepEqual(args(), [`--server`, `--listen`])

  assert.end()
})

test(`createManager() throws`, assert => {
  assert.throws(createManager.bind(null, ``))
  assert.throws(createManager.bind(null, []))
  assert.throws(createManager.bind(null, 42))

  assert.throws(createManager.bind(null, { args: ` ` }))
  assert.throws(createManager.bind(null, { args: {} }))
  assert.throws(createManager.bind(null, { args: 10 }))

  assert.throws(createManager.bind(null, { validArgs: ` ` }))
  assert.throws(createManager.bind(null, { validArgs: {} }))
  assert.throws(createManager.bind(null, { validArgs: 10 }))

  assert.throws(createManager.bind(null, { build: ` ` }))
  assert.throws(createManager.bind(null, { build: {} }))
  assert.throws(createManager.bind(null, { build: [] }))
  assert.throws(createManager.bind(null, { build: 10 }))

  assert.throws(createManager.bind(null, { validate: ` ` }))
  assert.throws(createManager.bind(null, { validate: {} }))
  assert.throws(createManager.bind(null, { validate: [] }))
  assert.throws(createManager.bind(null, { validate: 10 }))

  assert.end()
})
