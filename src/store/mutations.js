const juanWrapper = document.getElementById('juan-wrapper')

export default {

  setPageIndex (state, index) {
    state.pageIndex = index
  },
  toPageIndex0 (state, index) {
    const {juan} = juanWrapper
    new TimelineLite({
      onComplete: () => {
        state.isBusy = false
        state.pageIndex = index
      }
    })
      .set(this.$refs.juan, {width: 0})
      .to(this.$refs.juan, 2, {width: '60vw'})
  }
}
