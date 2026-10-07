export type JewelryCategory = 'necklaces' | 'rings' | 'earrings' | 'bracelets'

export type CatalogCategory = {
  slug: JewelryCategory
  label: string
  image: string
}

export type CatalogProductOption = {
  label: string
  values: string[]
}

export type ProductAvailability = 'in-stock' | 'made-to-order' | 'to-be-confirmed'

export type CatalogProduct = {
  id: string
  slug: string
  name: string
  category: JewelryCategory
  description: string
  priceAgorot: number
  images: string[]
  material: string
  karat?: number
  options?: CatalogProductOption[]
  availability: ProductAvailability
  featured: boolean
  active: boolean
}