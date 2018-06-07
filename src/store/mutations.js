export default {
  setPageIndex (state, index) {
    state.pageIndex = index
  },
  setIsBusy (state, isBusy) {
    state.isBusy = isBusy
  },
  toPageIndex0 () {
    this.$store.commit('setPageIndex', 0)
    const {juan} = this.$refs
    new TimelineLite({
      onComplete: () => {
        setIsBusy(false)
      }
    })
      .set(juan, {width: 0})
      .to(juan, 2, {width: '60vw'})
  }
}
