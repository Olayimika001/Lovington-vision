/**
 * Product images from /public/images. Paths with spaces are URL-encoded.
 * Uses BASE_URL so images work on mobile and when deployed to a subpath (e.g. GitHub Pages).
 * Add herbs.jpg and palm-oil.jpg to /public/images when you have them (Bitter Leaf, Palm Oil).
 */
function local(path) {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const segment = path.startsWith('/') ? path.slice(1) : path
  const full = `${base}/images/${segment}`
  return full.split('/').map((part, i) => (i === 0 ? part : encodeURIComponent(part))).join('/')
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
