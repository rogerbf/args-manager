import add from './library/add'
import build from './library/build'
import clear from './library/clear'
// import load from './library/load'
// import save from './library/save'

export default function createManager (state = {}) {
  if (!state.hasOwnProperty(`args`)) { Object.assign(state, { args: [] }) }
  if (state.hasOwnProperty(`valid`) && !Array.isArray(state.valid)) {
    throw new Error(`valid is not an array`)
  }
  if (!state.hasOwnProperty(`valid`)) { Object.assign(state, { valid: undefined }) }

  return Object.assign(
    () => state.args,
    add(state),
    build(state),
    clear(state),
    // load(state),
    // save(state),
  )
}
