import normalize from './normalize'

// export default (validArgs, arg) => {
//   if (validArgs) {
//     const normalized = normalize(arg)
//     const included = normalized.filter(key => validArgs.includes(key))
//
//     if (normalized.length !== included.length) {
//       throw new Error(`argument could not be found in valid arguments array`)
//     } else {
//       return arg
//     }
//   } else {
//     return arg
//   }
// }

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
