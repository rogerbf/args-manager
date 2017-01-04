import normalize from './normalize'

export default (validArgs, arg) => {
  if (validArgs) {
    const normalized = normalize(arg)
    normalized.map(key => {
      if (validArgs.includes(key)) {
        return key
      } else {
        throw Error(`argument: ${key}, is not a valid argument`)
      }
    })
    return arg
  } else {
    return arg
  }
}
