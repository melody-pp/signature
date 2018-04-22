import store from 'store'

export const SIG_LIST_KEY = 'sdjfpoaisjdlfjalkjsncuasdfljnalsufd';

export default {
  sigList: store.get(SIG_LIST_KEY) || []
}
