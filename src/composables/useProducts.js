import { ref, computed } from 'vue'
import { productImages } from '@/constants/productImages'

const productsData = [
  { id: 1, name: 'Tomatoes', nameYo: 'Tòmátì Ọ̀tún', price: 4.99, category: 'vegetables', image: productImages.tomatoes, description: 'Vine-ripened, bursting with flavor', descriptionYo: 'Tí a gbìn dáadáa, ó kún fún adùn', inStock: true, unit: 'kg' },
  { id: 2, name: 'Okra', nameYo: 'Ìlá Tuntun', price: 3.49, category: 'vegetables', image: productImages.okra, description: 'Tender and perfect for soups', descriptionYo: 'Tútù, ó dára fún ọbẹ̀', inStock: true, unit: 'kg' },
  { id: 3, name: 'Plantains', nameYo: 'Ọ̀gẹ̀dẹ̀ Dídùn', price: 2.99, category: 'fruits', image: productImages.plantains, description: 'Naturally sweet, versatile cooking banana', descriptionYo: 'Ó dùn lára rẹ̀, ó wúlò púpọ̀', inStock: true, unit: 'bunch' },
  { id: 4, name: 'Yam', nameYo: 'Ìṣu', price: 6.99, category: 'vegetables', image: productImages.yam, description: 'Premium quality white yam', descriptionYo: 'Ìṣu funfun tí ó tayọ', inStock: true, unit: 'kg' },
  { id: 5, name: 'Peppers', nameYo: 'Ọ̀tẹ̀', price: 5.49, category: 'vegetables', image: productImages.peppers, description: 'Fresh peppers for stews and sauces', descriptionYo: 'Ọ̀tẹ̀ tuntun fún ọbẹ̀ àti ọbẹ̀', inStock: true, unit: 'kg' },
  { id: 6, name: 'Smoked Fish', nameYo: 'Ẹja Gbigbóná', price: 14.99, category: 'livestock', image: productImages.smokedCatfish, description: 'Premium smoked catfish, traditionally prepared', descriptionYo: 'Ẹja gbigbóná tí a ṣe ní ọ̀nà ìbílẹ̀', inStock: true, unit: 'kg' },
  { id: 7, name: 'Chicken', nameYo: 'Adìe Gbogbo', price: 18.99, category: 'livestock', image: productImages.chicken, description: 'Farm-raised whole chicken, fresh and wholesome', descriptionYo: 'Adìe tí a tọ́jú lórí oko, tuntun àti tó tayọ', inStock: true, unit: 'kg' },
  { id: 8, name: 'Goat Meat', nameYo: 'Eran Ewúrẹ́', price: 22.99, category: 'livestock', image: productImages.goat, description: 'Lean goat meat from our farm', descriptionYo: 'Eran ewúrẹ́ láti oko wa', inStock: true, unit: 'kg' },
  { id: 9, name: 'Apples', nameYo: 'Ápú', price: 3.99, category: 'fruits', image: productImages.apples, description: 'Crisp, fresh apples', descriptionYo: 'Ápú tuntun, tó rọ̀', inStock: true, unit: 'kg' },
  { id: 10, name: 'Bananas', nameYo: 'Ọ̀gẹ̀dẹ̀', price: 2.49, category: 'fruits', image: productImages.bananas, description: 'Sweet ripe bananas', descriptionYo: 'Ọ̀gẹ̀dẹ̀ dídùn tí ó pẹ́', inStock: true, unit: 'bunch' },
  { id: 11, name: 'Garri', nameYo: 'Ẹba', price: 4.99, category: 'grains', image: productImages.garri, description: 'Premium cassava garri, perfect for eba', descriptionYo: 'Ẹba tó tayọ, ó dára fún eba', inStock: true, unit: 'kg' },
  { id: 12, name: 'Honey', nameYo: 'Oyin', price: 12.99, category: 'grains', image: productImages.honey, description: 'Pure natural honey from local hives', descriptionYo: 'Oyin àdábáyé láti ibi ìkọ́lé oyin', inStock: true, unit: 'liter' },
  { id: 13, name: 'Maize', nameYo: 'Àgbàdo', price: 3.99, category: 'grains', image: productImages.maize, description: 'Fresh maize for roasting or cooking', descriptionYo: 'Àgbàdo tuntun fún sisun tàbí sisẹ́', inStock: true, unit: 'kg' },
  { id: 14, name: 'Mangoes', nameYo: 'Mángórò', price: 4.49, category: 'fruits', image: productImages.mangoes, description: 'Sweet, juicy mangoes in season', descriptionYo: 'Mángórò dídùn, tó kún fún ọjẹ', inStock: true, unit: 'kg' },
  { id: 15, name: 'Oranges', nameYo: 'Ọsán', price: 3.99, category: 'fruits', image: productImages.oranges, description: 'Fresh citrus oranges', descriptionYo: 'Ọsán tuntun', inStock: true, unit: 'kg' },
  { id: 16, name: 'Pawpaw', nameYo: 'Ìbẹ́pẹ', price: 5.99, category: 'fruits', image: productImages.pawpaw, description: 'Ripe pawpaw, rich in vitamins', descriptionYo: 'Ìbẹ́pẹ tí ó pẹ́, kún fún fídíòmù', inStock: true, unit: 'kg' },
  { id: 17, name: 'Pineapple', nameYo: 'Ọ̀pẹ̀ọ̀rọ̀', price: 4.99, category: 'fruits', image: productImages.pineapple, description: 'Sweet tropical pineapple', descriptionYo: 'Ọ̀pẹ̀ọ̀rọ̀ dídùn', inStock: true, unit: 'kg' },
  { id: 18, name: 'Potato Chips', nameYo: 'Ọjọ́ Ìsu', price: 6.99, category: 'grains', image: productImages.potatoChips, description: 'Crispy homemade potato chips', descriptionYo: 'Ọjọ́ ìsu tí a ṣe lékùlé', inStock: true, unit: 'kg' },
  { id: 19, name: 'Potato Flour', nameYo: 'Iru Ìsu', price: 7.49, category: 'grains', image: productImages.potatoFlour, description: 'Fine potato flour for baking and cooking', descriptionYo: 'Iru ìsu fún sisọ́ àti sisẹ́', inStock: true, unit: 'kg' },
  { id: 20, name: 'Potatoes', nameYo: 'Ìsù ilẹ̀', price: 4.49, category: 'vegetables', image: productImages.potatoes, description: 'Fresh potatoes for all your recipes', descriptionYo: 'Ìsù ilẹ̀ tuntun fún gbogbo iru oúnjẹ', inStock: true, unit: 'kg' },
  { id: 21, name: 'Snails', nameYo: 'Ìgbín', price: 15.99, category: 'livestock', image: productImages.snails, description: 'Fresh snails, delicacy for soups and stews', descriptionYo: 'Ìgbín tuntun, oúnjẹ dára fún ọbẹ̀', inStock: true, unit: 'kg' },
  { id: 22, name: 'Watermelon', nameYo: 'Ọ̀bẹ̀', price: 3.49, category: 'fruits', image: productImages.watermelon, description: 'Sweet, refreshing watermelon', descriptionYo: 'Ọ̀bẹ̀ dídùn, tó mú ìtura', inStock: true, unit: 'kg' },
  { id: 23, name: 'Cat fish', nameYo: 'Ọ̀bẹ̀', price: 3.49, category: 'livestock', image: productImages.catfish, description: 'Fresh fish', descriptionYo: 'Ọ̀bẹ̀ dídùn, tó mú ìtura', inStock: true, unit: 'kg' }
]

export function useProducts() {
  const products = ref(productsData)
  const categories = computed(() => [
    { id: 'all', name: 'All Products', nameYo: 'Gbogbo Ọjà' },
    { id: 'vegetables', name: 'Vegetables', nameYo: 'Ewébẹ̀' },
    { id: 'fruits', name: 'Fruits', nameYo: 'Èso' },
    { id: 'grains', name: 'Grains & Pantry', nameYo: 'Irúgbìn àti Nǹkan Ilé' },
    { id: 'livestock', name: 'Livestock & Fish', nameYo: 'Ẹranko àti Ẹja' }
  ])
  const getProductById = (id) => products.value.find((p) => p.id === parseInt(id, 10))
  const getProductsByCategory = (category) =>
    category === 'all' ? products.value : products.value.filter((p) => p.category === category)
  return { products, categories, getProductById, getProductsByCategory }
}
