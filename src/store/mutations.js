export default {
  setState (state, data) {
    Object.keys(data).forEach(key => {
      state[key] = data[key]
    })
  }
}
