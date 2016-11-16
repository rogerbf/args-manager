import add from './library/add'
import clear from './library/clear'
import defaultBuild from './library/build'
import defaultValidate from './library/validate'

const prepareState = state => {
  if (state.constructor.name !== `Object`) {
    throw new Error(`expected to be called with an object`)
  }

  // state.args
  if (state.args && !Array.isArray(state.args)) {
    throw new Error(`expected args to be an array`)
  } else {
    Object.assign(state, { args: state.args || [] })
  }

  // state.validArgs
  if (state.validArgs && !Array.isArray(state.validArgs)) {
    throw new Error(`expected validArgs to be an array`)
  } else {
    Object.assign(state, { validArgs: state.validArgs || undefined })
  }

  // state.build
  if (state.build && typeof (state.build) !== `function`) {
    throw new Error(`build should be a function`)
  } else {
    Object.assign(state, { build: state.build || defaultBuild })
  }

  // state.validate
  if (state.validate && typeof (state.validate) !== `function`) {
    throw new Error(`validate should be a function`)
  } else {
    Object.assign(state, { validate: state.validate || defaultValidate })
  }
}

export default function createManager (state = {}) {
  prepareState(state)

  const core = Object.assign(
    {},
    add(state),
    clear(state),
  )

  return Object.assign(
    () => state.build(state.args),
    { add (arg) { core.add(state.validate(state.validArgs, arg)) } },
    { clear () { core.clear() } },
  )
}
