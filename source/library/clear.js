export default state => ({
  clear () {
    Object.assign(state, { args: [] })
  }
})
