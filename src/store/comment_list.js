export default {
  state: {
    items: ''
  },
  mutations: {
    setList (state, list) {
      state.items = list
    },
    getList (state) {
      return state.items
    },
    addItem (state, item) {
      state.items.unshift(item)
    }
  }
}