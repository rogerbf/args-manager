import add from './library/add'
import build from './library/build'
import clear from './library/clear'

export default function createManager (state = {}) {
  if (!state.hasOwnProperty(`args`)) { Object.assign(state, { args: [] }) }
  if (state.hasOwnProperty(`valid`) && !Array.isArray(state.valid)) {
    throw new Error(`valid is not an array`)
  }
  if (!state.hasOwnProperty(`valid`)) { Object.assign(state, { valid: undefined }) }

  const builder = build(state)

  return Object.assign(
    () => builder.build(),
    add(state),
    clear(state),
  )
}
