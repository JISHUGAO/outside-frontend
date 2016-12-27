import Vue from 'vue'

export default {
  data () {
    return {
      staticUrl: 'http://static.localhost.gaoweisong.com',
    }
  },
  methods: {
    getDefaultAvatar () {
      var defaultAvatar = this.staticUrl + '/img/default/avatar.jpeg'
      return defaultAvatar
    },
    fetch (url, options = {}) {
      var defaultOptions = {}
      return this.$http.get(url, this.objectMerge(defaultOptions, options)).then(function (response) {
              return response.json()
            }).then(function (data) {
              return new Promise(function (resolve, reject) {
                if (data.code === 0) {
                  resolve(data.data)
                } else {
                  reject(data.data)
                }
              })
              
            })
    },
    post (url, params, options = {}) {
      var defaultOptions = {
          'emulateJSON': true
        }
      return this.$http.post(url, params, this.objectMerge(defaultOptions, options)).then(function (response) {
          return response.json()
        }).then(function (data) {
          return new Promise(function (resolve, reject) {
            if (data.code === 0) {
              resolve(data.data)
            } else {
              reject(data.data)
            }
          })
        })
    },
    objectMerge (ob1, ob2) {
      for (var k in ob2) {
        ob1[k] = ob2[k]
      }
      return ob1
    },
    setBreadcrumb () {
      var route = this.$route;
      this.$store.state.currentPageName = ''
      if (route.name === 'category') {
        var categoryId = route.params.id
        var menus = this.$store.state.menus
        for (var index in menus) {
          if (categoryId == menus[index].id) {
            this.$store.state.currentPageName = menus[index].name
          }
        }
      }
    }

  }

}