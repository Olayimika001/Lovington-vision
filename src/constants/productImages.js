/**
 * Product images from /public/images. Paths with spaces are URL-encoded.
 * Add herbs.jpg and palm-oil.jpg to /public/images when you have them (Bitter Leaf, Palm Oil).
 */
function local(path) {
  const full = path.startsWith('/') ? path : `/images/${path}`
  return encodeURI(full)
}

export const productImages = {
  tomatoes: local('organic-tomatoes.jpg'),
  okra: local('fresh okra.jpg'),
  plantains: local('plantain.jpg'),
  yam: local('yam.jpg'),
  herbs: local('herbs.jpg'),
  palmOil: local('palm-oil.jpg'),
  seeds: local('seeds.jpg'),
  peppers: local('peppers.jpg'),
  smokedCatfish: local('smoked fish.jpg'),
  chicken: local('chicken.jpg'),
  goat: local('Goat meat.jpg'),
}
