import test from 'tape'
import validate from '../library/validate'

test(`is a function`, assert => {
  assert.equal(typeof (validate), `function`)
  assert.end()
})

test(`validate string`, assert => {
  const arg = `test`
  const validArgs = undefined
  assert.equal(validate(validArgs, arg), arg)
  assert.end()
})

test(`validate object`, assert => {
  const arg = { SocksPort: 9050 }
  const validArgs = [`SocksPort`, `ControlPort`]
  assert.deepEqual(validate(validArgs, arg), arg)
  assert.end()
})

test(`validate object (multiple keys)`, assert => {
  const arg = { SocksPort: 9050, ControlPort: 9055 }
  const validArgs = [`SocksPort`, `ControlPort`]
  assert.deepEqual(validate(validArgs, arg), arg)
  assert.end()
})

test(`validate invalid`, assert => {
  const validArgs = [`validarg1`, `validarg2`]
  const boundValidate = validate.bind(null, validArgs)
  assert.throws(boundValidate.bind(null, `test`))
  assert.equal(boundValidate(`validarg2`), `validarg2`)
  assert.end()
})

test(`validate array`, assert => {
  const validArgs = [`validargA`, `validargB`]
  const boundValidate = validate.bind(null, validArgs)
  assert.deepEqual(
    boundValidate([`validargB`, `validargA`]),
    [`validargB`, `validargA`]
  )
  assert.end()
})
