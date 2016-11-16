export default configuration => {
  if (Array.isArray(configuration)) {
    return configuration
  } else {
    if (typeof (configuration) === `object`) {
      return Object.keys(configuration)
    } else {
      return Array.of(configuration)
    }
  }
}
