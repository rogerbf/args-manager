export default state => ({
  build () {
    if (state.builder) {
      return state.builder(state.args)
    } else {
      return state.args.reduce((consolidated, obj) => {
        if (typeof (obj) === `object`) {
          return [
            ...consolidated,
            ...Object.keys(obj).reduce((acc, key) => {
              return [ ...acc, key, obj[key] ]
            }, [])
          ]
        } else {
          return [ ...consolidated, obj ]
        }
      }, [])
    }
  }
})
