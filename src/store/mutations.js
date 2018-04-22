import {SIG_LIST_KEY} from "./state";
import store from 'store'
export default {
  addSig(state, sigUrl) {
    state.sigList.push(sigUrl)
    store.set(SIG_LIST_KEY,state.sigList)
  }
}
