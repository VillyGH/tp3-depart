export const uiTextPlugin = {
  // Parks
  parksLabel: 'Parcs : ',
  trailLabel: 'Trails : ',
  parcText: 'Parc: ',

  // Trails
  noTrailsAvailableMessage: 'Aucun sentier est disponible pour le moment',

  // Likes
  likesText: ' likes',
  imageLikeFilledUrl: 'https://cdn-icons-png.flaticon.com/128/633/633991.png',
  imageLikeEmptyUrl: 'https://cdn-icons-png.flaticon.com/128/126/126473.png',
  likeConfirmationMessage: 'Merci d’avoir partagé un j’aime pour le tronçons: ',
  removeLikeConfirmationMessage: 'Vous avez retiré un j’aime pour le tronçons: ',

  // Map
  mapUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  zoomValue: 13.5,
  polylineDefaultColor: 'green',

  // Erreurs
  parksError: 'Erreur dans le chargement des parcs',
  trailsError: 'Erreur dans le chargement des sentiers',
  likesError: 'Erreur dans le chargement des likes',
  segmentsError: 'Erreur dans le chargement des tronçons'

}

// Plugin pour VueJs
// https://coderethinked.com/3-different-ways-to-access-constants-in-a-vue-template/
uiTextPlugin.install = function (Vue) {
  Vue.prototype.$getUiText = key => {
    return uiTextPlugin[key]
  }
}

export default uiTextPlugin
