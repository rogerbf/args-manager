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
    assert.ok(args.hasOwnProperty(`build`), `it has a method: build`)
    assert.ok(args.hasOwnProperty(`clear`), `it has a method: clear`)
    // assert.ok(args.hasOwnProperty(`load`), `it has a method: load`)
    // assert.ok(args.hasOwnProperty(`save`), `it has a method: save`)
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
