export default (state) => ({
  add (configuration) {
    if (state.valid) {
      state.args = [
        ...state.args,
        Object.keys(configuration)
          .reduce((config, key) => {
            if (state.valid.includes(key)) {
              return Object.assign(config, { [key]: configuration[key] })
            } else {
              throw new Error(`configuration not valid`)
            }
          }, {})[0]
      ]
    }
    state.args = [ ...state.args, configuration ]
  }
})
