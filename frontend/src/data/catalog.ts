import { CatalogCategory, CatalogProduct } from '../types/productType'

export const catalogCategories: CatalogCategory[] = [
  {
    slug: 'necklaces',
    label: 'שרשראות',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85'
  },
  {
    slug: 'rings',
    label: 'טבעות',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85'
  },
  {
    slug: 'earrings',
    label: 'עגילים',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85'
  },
  {
    slug: 'bracelets',
    label: 'צמידים',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85'
  }
]

export const catalogProducts: CatalogProduct[] = [
  {
    id: 'lg-necklace-001',
    slug: 'light-point-necklace',
    name: 'שרשרת נקודת אור',
    category: 'necklaces',
    description: 'שרשרת עדינה עם תליון קטן, לשילוב יומיומי.',
    priceAgorot: 28900,
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85'
    ],
    material: 'זהב צהוב',
    karat: 14,
    options: [{ label: 'אורך שרשרת', values: ['40 ס״מ', '45 ס״מ', '50 ס״מ'] }],
    availability: 'to-be-confirmed',
    featured: true,
    active: true
  },
  {
    id: 'lg-necklace-002',
    slug: 'fine-link-necklace',
    name: 'שרשרת חוליות עדינה',
    category: 'necklaces',
    description: 'חוליות דקות עם מראה נקי שאפשר לענוד לבד או בשכבות.',
    priceAgorot: 35900,
    images: [
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85'
    ],
    material: 'ציפוי זהב',
    options: [{ label: 'אורך שרשרת', values: ['40 ס״מ', '45 ס״מ', '50 ס״מ'] }],
    availability: 'to-be-confirmed',
    featured: true,
    active: true
  },
  {
    id: 'lg-ring-001',
    slug: 'clean-line-ring',
    name: 'טבעת קו נקי',
    category: 'rings',
    description: 'טבעת בעיצוב על־זמני, עם קווים פשוטים ונוכחות עדינה.',
    priceAgorot: 32900,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=85'
    ],
    material: 'זהב צהוב',
    karat: 14,
    options: [{ label: 'מידת טבעת', values: ['52', '54', '56'] }],
    availability: 'to-be-confirmed',
    featured: true,
    active: true
  },
  {
    id: 'lg-earrings-001',
    slug: 'gold-hoop-earrings',
    name: 'עגילי חישוק',
    category: 'earrings',
    description: 'חישוקים קלאסיים שמשתלבים בקלות בכל הופעה.',
    priceAgorot: 24900,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85'
    ],
    material: 'ציפוי זהב',
    availability: 'to-be-confirmed',
    featured: true,
    active: true
  },
  {
    id: 'lg-bracelet-001',
    slug: 'gold-link-bracelet',
    name: 'צמיד חוליות',
    category: 'bracelets',
    description: 'צמיד חוליות עדין שאפשר לשלב עם התכשיטים האהובים שלך.',
    priceAgorot: 41900,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85'
    ],
    material: 'זהב צהוב',
    karat: 14,
    options: [{ label: 'אורך צמיד', values: ['16 ס״מ', '18 ס״מ', '20 ס״מ'] }],
    availability: 'to-be-confirmed',
    featured: true,
    active: true
  }
]