import { ref, computed } from 'vue'
import { productImages } from '@/constants/productImages'

const productsData = [
  { id: 1, name: 'Tomatoes', nameYo: 'Tòmátì Ọ̀tún', price: 4.99, category: 'vegetables', image: productImages.tomatoes, description: 'Vine-ripened, bursting with flavor', descriptionYo: 'Tí a gbìn dáadáa, ó kún fún adùn', inStock: true, unit: 'kg' },
  { id: 2, name: 'Okra', nameYo: 'Ìlá Tuntun', price: 3.49, category: 'vegetables', image: productImages.okra, description: 'Tender and perfect for soups', descriptionYo: 'Tútù, ó dára fún ọbẹ̀', inStock: true, unit: 'kg' },
  { id: 3, name: 'Plantains', nameYo: 'Ọ̀gẹ̀dẹ̀ Dídùn', price: 2.99, category: 'fruits', image: productImages.plantains,description: 'Naturally sweet, versatile cooking banana', descriptionYo: 'Ó dùn lára rẹ̀, ó wúlò púpọ̀', inStock: true, unit: 'bunch' },
  { id: 4, name: 'Yam', nameYo: 'Ìṣu', price: 6.99, category: 'vegetables', image: productImages.yam, description: 'Premium quality white yam', descriptionYo: 'Ìṣu funfun tí ó tayọ', inStock: true, unit: 'kg' },
  // { id: 5, name: 'Bitter Leaf', nameYo: 'Ewúro', price: 5.49, category: 'herbs', image: productImages.herbs, icon: '🌿', description: 'Fresh medicinal herb', descriptionYo: 'Ewé ìwòsàn tuntun', inStock: true, unit: 'bunch' },
  // { id: 6, name: 'Palm Oil', nameYo: 'Epo Pupa', price: 12.99, category: 'grains', image: productImages.palmOil, icon: '🫒', description: 'Pure red palm oil, traditionally extracted', descriptionYo: 'Epo pupa tí kò ní àdàlú, a mú u jáde ní ọ̀nà ìbílẹ̀', inStock: true, unit: 'liter' },
  { id: 7, name: 'Smoked fish', nameYo: 'Ẹja Gbigbóná', price: 14.99, category: 'livestock', image: productImages.smokedCatfish, description: 'Premium smoked catfish, traditionally prepared', descriptionYo: 'Ẹja gbigbóná tí a ṣe ní ọ̀nà ìbílẹ̀', inStock: true, unit: 'kg' },
  { id: 8, name: 'Chicken', nameYo: 'Adìe Gbogbo', price: 18.99, category: 'livestock', image: productImages.chicken, description: 'Farm-raised whole chicken, fresh and wholesome', descriptionYo: 'Adìe tí a tọ́jú lórí oko, tuntun àti tó tayọ', inStock: true, unit: 'kg' },
  { id: 9, name: 'Goat Meat', nameYo: 'Eran Ewúrẹ́', price: 22.99, category: 'livestock', image: productImages.goat, description: 'Lean goat meat from our farm', descriptionYo: 'Eran ewúrẹ́ láti oko wa', inStock: true, unit: 'kg' }
]

export function useProducts() {
  const products = ref(productsData)
  const categories = computed(() => [
    { id: 'all', name: 'All Products', nameYo: 'Gbogbo Ọjà' },
    { id: 'vegetables', name: 'Vegetables', nameYo: 'Ewébẹ̀' },
    { id: 'fruits', name: 'Fruits', nameYo: 'Èso' },
    // { id: 'grains', name: 'Grains & Seeds', nameYo: 'Irúgbìn àti Èso' },
    // { id: 'herbs', name: 'Herbs & Spices', nameYo: 'Ewé Atùn' },
    { id: 'livestock', name: 'Livestock & Fish', nameYo: 'Ẹranko àti Ẹja' }
  ])
  const getProductById = (id) => products.value.find((p) => p.id === parseInt(id, 10))
  const getProductsByCategory = (category) =>
    category === 'all' ? products.value : products.value.filter((p) => p.category === category)
  return { products, categories, getProductById, getProductsByCategory }
}
