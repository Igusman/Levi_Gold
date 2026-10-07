import { CatalogProduct, JewelryCategory } from '../types/productType'
import { catalogCategories, catalogProducts } from '../data/catalog'

export function getCatalogCategories() {
  return catalogCategories
}

export function getCatalogProducts() {
  return catalogProducts.filter(product => product.active)
}

export function getFeaturedProducts() {
  return getCatalogProducts().filter(product => product.featured)
}

export function getProductsByCategory(category: JewelryCategory) {
  return getCatalogProducts().filter(product => product.category === category)
}

export function getProductById(id: string): CatalogProduct | undefined {
  return catalogProducts.find(product => product.id === id && product.active)
}

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return getCatalogProducts().find(product => product.slug === slug)
}