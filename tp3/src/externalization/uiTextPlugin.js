export const uiTextPlugin = {
  imageLikeFilledUrl: 'https://cdn-icons-png.flaticon.com/128/633/633991.png',
  imageLikeEmptyUrl: 'https://cdn-icons-png.flaticon.com/128/126/126473.png',

  // Map
  mapUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  polylineDefaultColor: 'green'

}

// Plugin pour VueJs
// https://coderethinked.com/3-different-ways-to-access-constants-in-a-vue-template/
uiTextPlugin.install = function (Vue) {
  Vue.prototype.$getUiText = key => {
    return uiTextPlugin[key]
  }
}

export default uiTextPlugin
