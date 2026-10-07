import { FormEvent, useEffect, useRef, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { FiArrowLeft, FiArrowUpLeft, FiCheck, FiMenu, FiMinus, FiPlus, FiRotateCcw, FiShoppingBag, FiX } from 'react-icons/fi'
import { MdAccessibilityNew } from 'react-icons/md'
import scrollToTop from '../../helpers/scrollToTop'
import { CatalogProduct, CatalogCategory } from '../../types/productType'
import { getCatalogCategories, getCatalogProducts, getFeaturedProducts, getProductById, getProductBySlug, getProductsByCategory } from '../../services/catalogService'
import './Storefront.css'

type Category = CatalogCategory
type Product = CatalogProduct
type CartLine = { productId: string; quantity: number; optionLabel?: string; optionValue?: string }

const categories = getCatalogCategories()
const products = getFeaturedProducts()
const formatPrice = (priceAgorot: number) => new Intl.NumberFormat('he-IL', {
  style: 'currency', currency: 'ILS', maximumFractionDigits: 0
}).format(priceAgorot / 100)
const getProductPath = (product: Product) => `/collection/product/${encodeURIComponent(product.id)}/${encodeURIComponent(product.slug)}`

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    scrollToTop()
  }, [pathname])

  return null
}

function getSavedCart(): CartLine[] {
  try {
    const saved = JSON.parse(localStorage.getItem('levi-gold-cart') || '[]') as CartLine[]
    const productIds = new Set(getCatalogProducts().map(product => product.id))
    return Array.isArray(saved) ? saved.filter(line =>
      typeof line?.productId === 'string' && productIds.has(line.productId) && Number.isInteger(line.quantity) && line.quantity > 0 &&
      (line.optionLabel === undefined || typeof line.optionLabel === 'string') &&
      (line.optionValue === undefined || typeof line.optionValue === 'string')
    ) : []
  } catch {
    return []
  }
}

function Header({ cartCount }: { cartCount: number }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { label: 'הקולקציה שלנו', to: '/collection' },
    { label: 'הסיפור שלנו', to: '/story' },
    { label: 'המגזין', to: '/articles' },
    { label: 'צור קשר', to: '/contact' }
  ]
  return <header className="shop-header"><div className="shop-header-inner">
    <button className="menu-toggle" type="button" aria-label={menuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FiX /> : <FiMenu />}</button>
    <nav id="primary-navigation" className={`shop-nav${menuOpen ? ' is-open' : ''}`} aria-label="ניווט ראשי">{links.map(link => <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>{link.label}</Link>)}</nav>
    <Link className="wordmark" to="/" aria-label="LEVI GOLD - לעמוד הבית"><img className="wordmark-logo" src={`${process.env.PUBLIC_URL}/Levi_Logo_white.png`} alt="LEVI GOLD" /></Link>
    <Link className="bag-link" to="/cart" aria-label={`סל קניות, ${cartCount} פריטים`}><FiShoppingBag aria-hidden="true" /><span>{cartCount}</span></Link>
  </div></header>
}

function Footer() {
  return <footer className="shop-footer" dir="rtl"><div className="footer-rule" /><div className="footer-columns">
    <div className="footer-brand"><Link className="wordmark" to="/" aria-label="LEVI GOLD - לעמוד הבית"><img className="wordmark-logo" src={`${process.env.PUBLIC_URL}/Levi_Logo_white.png`} alt="LEVI GOLD" /></Link><p>תכשיטים שנבחרו בקפידה, לרגעים שנשארים איתך.</p></div>
    <div><h2>הקולקציות</h2>{categories.map(item => <Link key={item.slug} to={`/collection/${item.slug}`}>{item.label}</Link>)}</div>
    <div><h2>LEVI GOLD</h2><Link to="/story">הסיפור שלנו</Link><Link to="/articles">המגזין</Link><Link to="/contact">צור קשר</Link></div>
    <div><h2>מידע ושירות</h2><Link to="/contact">שאלות ותשובות</Link><Link to="/contact">משלוחים והחזרות</Link><Link to="/contact">מדיניות פרטיות</Link></div>
  </div><p className="copyright">כל הזכויות שמורות ל־LEVI GOLD © {new Date().getFullYear()}</p></footer>
}

function ProductGrid({ items, onAdd }: { items: Product[]; onAdd: (product: Product) => void }) {
  return <div className="product-grid">{items.map((product, index) => <article className="product-tile" key={product.id}>
    <Link className="product-image" to={getProductPath(product)} aria-label={`לפרטים על ${product.name}`}><img src={product.images[0]} alt={product.name} loading="lazy" /><span>0{index + 1}</span></Link>
    <div className="product-caption" dir="rtl"><div><Link className="product-title-link" to={getProductPath(product)}><h3>{product.name}</h3></Link><p>{product.description}</p><strong className="product-price">{formatPrice(product.priceAgorot)}</strong></div><button type="button" onClick={() => onAdd(product)} aria-label={`הוספת ${product.name} לסל`}><FiArrowUpLeft /></button></div>
  </article>)}</div>
}

function JournalCards() {
  const articles = [
    { title: 'איך משלבים שכבות של שרשראות?', type: 'מדריך קצר', image: products[0].images[0], imageAlt: 'שרשרת זהב עדינה עם תליון' },
    { title: 'לבחור תכשיט שמרגיש בדיוק שלך', type: 'השראה', image: products[2].images[0], imageAlt: 'טבעת בגוון זהב' },
    { title: 'כמה הרגלים קטנים לשמירה על הברק', type: 'טיפוח', image: products[4].images[0], imageAlt: 'צמיד חוליות בגוון זהב' }
  ]
  return <div className="journal-grid">{articles.map(article => <article className="journal-card" key={article.title}><img src={article.image} alt={article.imageAlt} loading="lazy" /><span>{article.type}</span><h3>{article.title}</h3></article>)}</div>
}

function HomePage({ onAdd }: { onAdd: (product: Product) => void }) {
  return <main id="main-content" tabIndex={-1}>
    <section className="hero" dir="rtl"><div className="hero-copy"><p className="eyebrow">תכשיטים עם נוכחות שקטה</p><h1>תכשיט שאוהבים לענוד <em>כל יום</em></h1><p>עיצובים על־זמניים, גוונים של זהב ופרטים קטנים שהופכים כל רגע לאישי.</p><Link className="dark-button" to="/collection/necklaces">גלו את הקולקציה <FiArrowLeft /></Link></div><div className="hero-photo"><img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=90" alt="תכשיטי זהב בעיצוב עדין" /><span>LEVI GOLD · EVERYDAY OBJECTS</span></div><p className="hero-note">נבחר בקפידה · נענד באהבה</p></section>
    <section className="page-width categories-section" dir="rtl"><div className="section-heading"><p className="eyebrow">למצוא את הפריט שלך</p><h2>הקולקציות שלנו</h2></div><div className="category-grid">{categories.map((category, index) => <Link className="category-tile" to={`/collection/${category.slug}`} key={category.slug}><img src={category.image} alt="" loading="lazy" /><span className="category-number">0{index + 1}</span><span className="category-caption">{category.label}<FiArrowUpLeft /></span></Link>)}</div></section>
    <section className="featured-section" dir="rtl"><div className="page-width"><div className="section-heading heading-row"><div><p className="eyebrow">פריטים אהובים</p><h2>הנבחרים שלנו</h2></div><Link className="text-link" to="/collection/necklaces">לכל הקולקציות <FiArrowLeft /></Link></div><ProductGrid items={products} onAdd={onAdd} /><p className="catalog-note">מחירי המוצרים והתמונות להמחשה בלבד.</p></div></section>
    <section className="story-preview page-width" dir="rtl"><img src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85" alt="פרטי תכשיט בגוון זהב" loading="lazy" /><div><p className="eyebrow">LEVI GOLD</p><h2>היופי נמצא<br />בפרטים הקטנים.</h2><p>תכשיט טוב לא צריך להתאמץ. הוא פשוט מרגיש נכון, משתלב בסיפור שלך ונשאר קרוב לאורך זמן.</p><Link className="text-link" to="/story">הסיפור שלנו <FiArrowLeft /></Link></div></section>
    <section className="journal-section page-width" dir="rtl"><div className="section-heading heading-row"><div><p className="eyebrow">השראה, בחירה וטיפוח</p><h2>מהמגזין שלנו</h2></div><Link className="text-link" to="/articles">לכל המאמרים <FiArrowLeft /></Link></div><JournalCards /></section>
    <section className="social-band" dir="rtl"><p className="eyebrow">רגעים של LEVI GOLD</p><h2>היומיום, בפרטים יפים.</h2><Link className="text-link" to="/contact">בואו נדבר <FiArrowLeft /></Link></section>
  </main>
}

function CollectionPage({ onAdd }: { onAdd: (product: Product) => void }) {
  const { category: slug } = useParams<{ category: string }>()
  const category = categories.find(item => item.slug === slug)
  if (!category) return <Navigate to="/" replace />
  const items = getProductsByCategory(category.slug)
  return <main id="main-content" tabIndex={-1} className="inner-page page-width" dir="rtl"><p className="eyebrow">LEVI GOLD · קולקציות</p><h1 className="inner-title">{category.label}</h1><p className="inner-intro">עיצובים שנבחרו בקפידה כדי להיות חלק מהיום שלך.</p><nav className="collection-tabs" aria-label="קטגוריות תכשיטים"><Link to="/collection">הכל</Link>{categories.map(item => <Link className={item.slug === slug ? 'current' : ''} key={item.slug} to={`/collection/${item.slug}`}>{item.label}</Link>)}</nav><ProductGrid items={items} onAdd={onAdd} /><p className="catalog-note">התמונות ושמות הפריטים להמחשה בלבד. מחירים ופרטי הקטלוג יתווספו בהמשך.</p></main>
}

function CollectionIndexPage({ onAdd }: { onAdd: (product: Product) => void }) {
  return <main id="main-content" tabIndex={-1} className="inner-page page-width" dir="rtl">
    <p className="eyebrow">LEVI GOLD</p>
    <h1 className="inner-title">הקולקציה שלנו</h1>
    <p className="inner-intro">חמישה פריטים נבחרים, מקולקציות LEVI GOLD.</p>
    <nav className="collection-tabs" aria-label="קטגוריות תכשיטים">
      <Link className="current" to="/collection">הכל</Link>
      {categories.map(category => <Link key={category.slug} to={`/collection/${category.slug}`}>{category.label}</Link>)}
    </nav>
    <ProductGrid items={getCatalogProducts()} onAdd={onAdd} />
    <p className="catalog-note">מחירי המוצרים והתמונות להמחשה בלבד.</p>
  </main>
}

function ProductPage({ onAdd, canonicalize = false }: { onAdd: (product: Product, option?: { label: string; value: string }) => void; canonicalize?: boolean }) {
  const { id = '', slug } = useParams<{ id: string; slug?: string }>()
  const product = getProductById(id)
  if (!product) {
    const legacyProduct = slug === undefined ? getProductBySlug(id) : undefined
    return <Navigate to={legacyProduct ? getProductPath(legacyProduct) : '/collection'} replace />
  }
  if (canonicalize) return <Navigate to={getProductPath(product)} replace />
  if (slug !== product.slug) return <Navigate to={getProductPath(product)} replace />
  return <ProductDetails product={product} onAdd={onAdd} />
}

function ProductDetails({ product, onAdd }: { product: Product; onAdd: (product: Product, option?: { label: string; value: string }) => void }) {
  const [activeImage, setActiveImage] = useState(product.images[0])
  const [selectedOption, setSelectedOption] = useState(product.options?.[0]?.values[0] || '')
  const category = categories.find(item => item.slug === product.category)

  useEffect(() => {
    setActiveImage(product.images[0])
    setSelectedOption(product.options?.[0]?.values[0] || '')
  }, [product])

  const availabilityText = product.availability === 'in-stock'
    ? 'זמין במלאי'
    : product.availability === 'made-to-order'
      ? 'מיוצר לפי הזמנה'
      : 'זמינות תאושר עם עדכון המלאי'

  return <main id="main-content" tabIndex={-1} className="product-detail page-width" dir="rtl">
    <nav className="product-breadcrumbs" aria-label="פירורי לחם"><Link to="/collection">הקולקציה</Link><span>/</span>{category && <Link to={`/collection/${category.slug}`}>{category.label}</Link>}<span>/</span><span>{product.name}</span></nav>
    <div className="product-detail-layout">
      <section className="product-gallery" aria-label={`תמונות ${product.name}`}>
        <div className="product-main-image"><img src={activeImage} alt={product.name} /></div>
        {product.images.length > 1 && <div className="product-thumbnails">{product.images.map((image, index) => <button className={image === activeImage ? 'is-selected' : ''} type="button" key={image} onClick={() => setActiveImage(image)} aria-label={`תמונה ${index + 1} של ${product.name}`} aria-pressed={image === activeImage}><img src={image} alt="" /></button>)}</div>}
      </section>
      <section className="product-details-copy">
        <p className="eyebrow">{category?.label} · LEVI GOLD</p>
        <h1>{product.name}</h1>
        <p className="detail-price">{formatPrice(product.priceAgorot)}</p>
        <p className="detail-description">{product.description}</p>
        <dl className="product-specifications"><div><dt>חומר</dt><dd>{product.material}</dd></div>{product.karat && <div><dt>קראט</dt><dd>{product.karat} קראט</dd></div>}<div><dt>זמינות</dt><dd>{availabilityText}</dd></div></dl>
        {product.options?.map(option => <label className="product-option" key={option.label}>{option.label}<select value={selectedOption} onChange={event => setSelectedOption(event.target.value)}>{option.values.map(value => <option key={value} value={value}>{value}</option>)}</select></label>)}
        <button className="dark-button product-add-button" type="button" onClick={() => onAdd(product, product.options?.[0] && selectedOption ? { label: product.options[0].label, value: selectedOption } : undefined)}>הוספה לסל <FiArrowUpLeft /></button>
        <p className="product-demo-note">מחיר, מידות, תמונות וזמינות הם נתוני המחשה בלבד.</p>
      </section>
    </div>
  </main>
}

function StoryPage() {
  return <main id="main-content" tabIndex={-1} className="inner-page story-page page-width" dir="rtl"><p className="eyebrow">נעים להכיר</p><h1 className="inner-title">הסיפור שלנו</h1><div className="story-page-grid"><img src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1400&q=85" alt="תכשיט בגוון זהב" /><div><h2>תכשיטים שמרגישים כמו שלך.</h2><p>LEVI GOLD נולדה מתוך אהבה ליופי שקט ולפריטים שיש להם מקום בחיים עצמם. כל קולקציה מתחילה בבחירה של צורה, חומר ותחושה, וממשיכה איתך לרגעים הקטנים והגדולים.</p><p>אנחנו כאן כדי לעזור לך למצוא את התכשיט שמתאים לסיפור שלך.</p><Link className="dark-button" to="/collection/rings">לגלות את הקולקציות <FiArrowLeft /></Link></div></div></main>
}

function ArticlesPage() {
  return <main id="main-content" tabIndex={-1} className="inner-page page-width" dir="rtl"><p className="eyebrow">רעיונות ופרטים קטנים</p><h1 className="inner-title">המגזין שלנו</h1><p className="inner-intro">השראה, בחירה וטיפים לעולם התכשיטים.</p><JournalCards /></main>
}

function ContactPage() {
  const [sent, setSent] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true) }
  return <main id="main-content" tabIndex={-1} className="inner-page contact-page page-width" dir="rtl"><div><p className="eyebrow">נשמח לשמוע ממך</p><h1 className="inner-title">איך אפשר לעזור?</h1><p className="inner-intro">יש לך שאלה על תכשיט, הזמנה או הקולקציה? כתבי לנו.</p></div><form className="contact-form" onSubmit={submit}><label>שם מלא<input name="name" autoComplete="name" required /></label><label>אימייל<input name="email" type="email" autoComplete="email" required /></label><label className="full-field">נושא<input name="subject" required /></label><label className="full-field">הודעה<textarea name="message" rows={5} required /></label><button className="dark-button" type="submit">שליחה <FiArrowLeft /></button>{sent && <p className="form-message" role="status">תודה, הטופס נשמר בהדגמה. שליחת הודעות תחובר בהמשך.</p>}</form></main>
}

function CartPage({ cart, onRemove, onQuantityChange }: { cart: CartLine[]; onRemove: (id: string, optionValue?: string) => void; onQuantityChange: (id: string, quantity: number, optionValue?: string) => void }) {
  const items = cart.flatMap(line => { const product = getProductById(line.productId); return product ? [{ ...product, quantity: line.quantity, optionLabel: line.optionLabel, optionValue: line.optionValue }] : [] })
  const totalAgorot = items.reduce((total, item) => total + item.priceAgorot * item.quantity, 0)
  return <main id="main-content" tabIndex={-1} className="inner-page cart-page page-width" dir="rtl"><p className="eyebrow">LEVI GOLD</p><h1 className="inner-title">סל הקניות</h1>{items.length === 0 ? <div className="empty-cart"><FiShoppingBag /><p>הסל שלך עוד מחכה לפריט הראשון.</p><Link className="dark-button" to="/collection">לגלות את הקולקציה <FiArrowLeft /></Link></div> : <div className="cart-list">{items.map(item => <article className="cart-row" key={`${item.id}-${item.optionValue || ''}`}><img src={item.images[0]} alt={item.name} /><div><h2>{item.name}</h2><p>{item.material}{item.karat ? ` · ${item.karat} קראט` : ''}</p>{item.optionLabel && item.optionValue && <p>{item.optionLabel}: {item.optionValue}</p>}<strong>{formatPrice(item.priceAgorot)}</strong></div><label>כמות<input type="number" min="1" value={item.quantity} onChange={event => onQuantityChange(item.id, Number(event.target.value), item.optionValue)} /></label><button type="button" className="remove-item" onClick={() => onRemove(item.id, item.optionValue)}>הסרה</button></article>)}<p className="catalog-note">סה״כ במחירי הדגמה: {formatPrice(totalAgorot)}. אין אפשרות לבצע רכישה כרגע.</p></div>}</main>
}

function Storefront() {
  const [cart, setCart] = useState<CartLine[]>(getSavedCart)
  const [cartNotice, setCartNotice] = useState<{ message: string } | null>(null)
  const [accessibilityOpen, setAccessibilityOpen] = useState(false)
  const [textScale, setTextScale] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [underlinedLinks, setUnderlinedLinks] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [readableFont, setReadableFont] = useState(false)
  const accessibilityButtonRef = useRef<HTMLButtonElement>(null)
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0)
  useEffect(() => { localStorage.setItem('levi-gold-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => {
    if (!cartNotice) return
    const timeout = window.setTimeout(() => setCartNotice(null), 2500)
    return () => window.clearTimeout(timeout)
  }, [cartNotice])
  useEffect(() => {
    if (!accessibilityOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAccessibilityOpen(false)
        accessibilityButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [accessibilityOpen])
  const addToCart = (product: Product, option?: { label: string; value: string }) => {
    setCartNotice({ message: `${product.name} נוסף לסל` })
    setCart(current => {
      const match = current.find(line => line.productId === product.id && line.optionLabel === option?.label && line.optionValue === option?.value)
      return match ? current.map(line => line === match ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { productId: product.id, quantity: 1, optionLabel: option?.label, optionValue: option?.value }]
    })
  }
  const removeFromCart = (id: string, optionValue?: string) => {
    const product = getProductById(id)
    if (product) setCartNotice({ message: `${product.name} הוסר מהעגלה` })
    setCart(current => current.filter(line => line.productId !== id || line.optionValue !== optionValue))
  }
  const updateQuantity = (id: string, quantity: number, optionValue?: string) => { if (Number.isInteger(quantity) && quantity > 0) setCart(current => current.map(line => line.productId === id && line.optionValue === optionValue ? { ...line, quantity } : line)) }
  const resetAccessibility = () => {
    setTextScale(100)
    setHighContrast(false)
    setUnderlinedLinks(false)
    setReducedMotion(false)
    setReadableFont(false)
  }
  const storefrontClassName = [
    'storefront',
    textScale > 100 ? `accessibility-scale-${textScale}` : '',
    highContrast ? 'accessibility-high-contrast' : '',
    underlinedLinks ? 'accessibility-underlined-links' : '',
    reducedMotion ? 'accessibility-reduced-motion' : '',
    readableFont ? 'accessibility-readable-font' : ''
  ].filter(Boolean).join(' ')

  return <div className={storefrontClassName}><a className="skip-link" href="#main-content">דילוג לתוכן הראשי</a><ScrollToTop /><Header cartCount={cartCount} />{cartNotice && <div className="cart-toast" role="status" aria-live="polite" dir="rtl"><FiCheck aria-hidden="true" /><span>{cartNotice.message}</span></div>}<Routes><Route path="/" element={<HomePage onAdd={addToCart} />} /><Route path="/collection" element={<CollectionIndexPage onAdd={addToCart} />} /><Route path="/collection/product/:id/:slug?" element={<ProductPage onAdd={addToCart} />} /><Route path="/collection/:category" element={<CollectionPage onAdd={addToCart} />} /><Route path="/product/:id/:slug?" element={<ProductPage onAdd={addToCart} canonicalize />} /><Route path="/story" element={<StoryPage />} /><Route path="/articles" element={<ArticlesPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/cart" element={<CartPage cart={cart} onRemove={removeFromCart} onQuantityChange={updateQuantity} />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes><Footer />
    <div className="accessibility-widget" dir="rtl">
      <button ref={accessibilityButtonRef} className="accessibility-trigger" type="button" aria-label={accessibilityOpen ? 'סגירת תפריט נגישות' : 'פתיחת תפריט נגישות'} aria-expanded={accessibilityOpen} aria-controls={accessibilityOpen ? 'accessibility-options' : undefined} onClick={() => setAccessibilityOpen(value => !value)}><MdAccessibilityNew aria-hidden="true" /></button>
      {accessibilityOpen && <section className="accessibility-panel" id="accessibility-options" aria-labelledby="accessibility-title">
        <div className="accessibility-panel-heading"><h2 id="accessibility-title">אפשרויות נגישות</h2><button type="button" aria-label="סגירת תפריט נגישות" onClick={() => { setAccessibilityOpen(false); accessibilityButtonRef.current?.focus() }}><FiX aria-hidden="true" /></button></div>
        <div className="accessibility-option">
          <span>הגדלת תצוגה</span>
          <div className="accessibility-scale-controls"><button type="button" aria-label="הקטנת תצוגה" disabled={textScale === 100} onClick={() => setTextScale(current => Math.max(100, current - 10))}><FiMinus aria-hidden="true" /></button><span aria-live="polite">{textScale}%</span><button type="button" aria-label="הגדלת תצוגה" disabled={textScale === 120} onClick={() => setTextScale(current => Math.min(120, current + 10))}><FiPlus aria-hidden="true" /></button></div>
        </div>
        <button className="accessibility-toggle" type="button" aria-pressed={highContrast} onClick={() => setHighContrast(value => !value)}>ניגודיות גבוהה<span aria-hidden="true">{highContrast ? 'פעיל' : 'כבוי'}</span></button>
        <button className="accessibility-toggle" type="button" aria-pressed={underlinedLinks} onClick={() => setUnderlinedLinks(value => !value)}>קו תחתון לקישורים<span aria-hidden="true">{underlinedLinks ? 'פעיל' : 'כבוי'}</span></button>
        <button className="accessibility-toggle" type="button" aria-pressed={reducedMotion} onClick={() => setReducedMotion(value => !value)}>הפחתת אנימציות<span aria-hidden="true">{reducedMotion ? 'פעיל' : 'כבוי'}</span></button>
        <button className="accessibility-toggle" type="button" aria-pressed={readableFont} onClick={() => setReadableFont(value => !value)}>גופן קריא<span aria-hidden="true">{readableFont ? 'פעיל' : 'כבוי'}</span></button>
        <button className="accessibility-reset" type="button" onClick={resetAccessibility}><FiRotateCcw aria-hidden="true" /> שחזור ברירות מחדל</button>
      </section>}
    </div>
  </div>
}

export default Storefront