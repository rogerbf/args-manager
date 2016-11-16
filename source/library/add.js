export default state => ({
  add (configuration) {
    state.args = state.args.concat(configuration)
  }
})
