/**
 * Product image URLs – real farm produce.
 * Pexels (Pexels License). Replace with your own assets (e.g. /products/tomatoes.jpg) if needed.
 */
const P = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600`

export const productImages = {
  tomatoes: P(4197907),   // tomatoes in bowl
  okra: P(616404),        // assorted vegetables
  plantains: P(2132169),   // bananas/plantains
  yam: P(1410235),        // sweet potato / root vegetable
  herbs: P(1438672),      // fresh herbs
  palmOil: P(257816),      // oil / liquid
  seeds: P(1417945),      // seeds / grains
  peppers: P(1400172),    // variety vegetables incl peppers
}
