export const uiTextPlugin = {
  imageLikeUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.JsZmLAs1DLqQVICPoeTleQHaHa%26pid%3DApi&f=1'
}

// Plugin pour VueJs
// https://coderethinked.com/3-different-ways-to-access-constants-in-a-vue-template/
uiTextPlugin.install = function (Vue) {
  Vue.prototype.$getUiText = key => {
    return uiTextPlugin[key]
  }
}

export default uiTextPlugin
