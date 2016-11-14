export default (state) => ({
  add (configuration) {
    if (!Array.isArray(configuration)) {
      if (state.valid) {
        if (typeof (configuration) !== `object`) {
          state.args = [ ...state.args, configuration ]
        }
        if (typeof (configuration) === `object`) {
          const invalid = Object.keys(configuration)
            .filter(key => !state.valid.includes(key))
          if (invalid.length !== 0) {
            throw new Error(`argument not allowed:` + invalid)
          } else {
            state.args = [ ...state.args, configuration ]
          }
        }
      } else {
        state.args = [ ...state.args, configuration ]
      }
    } else {
      throw new Error(`got wrong type`)
    }
  }
})
