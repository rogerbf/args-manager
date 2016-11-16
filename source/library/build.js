export default args => {
  return args.reduce((consolidated, obj) => {
    if (typeof (obj) === `object`) {
      return [
        ...consolidated,
        ...Object.keys(obj).reduce((acc, key) => [ ...acc, key, obj[key] ], [])
      ]
    } else {
      return [ ...consolidated, obj ]
    }
  }, [])
}
