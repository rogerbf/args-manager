export default state => ({
  build () {
    if (state.builder) {
      return state.builder(state.args)
    } else {
      return state.args.reduce((argsStr, obj) => {
        if (typeof (obj) !== `object`) {
          return argsStr.concat(`${obj} `)
        } else {
          return argsStr.concat(Object.keys(obj).reduce((str, key) => {
            return str.concat(`${key} ${obj[key]} `)
          }, ``))
        }
      }, ``).trim().split(` `)
    }
  }
})
