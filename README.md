# Product Dashboard

A modern, full-featured e-commerce product dashboard built with Next.js 15, Material UI, Redux Toolkit, and TypeScript. This application showcases advanced frontend development practices including SSR/CSR rendering strategies, state management, shopping cart functionality, and a premium glassmorphism UI design.

## 🌟 Live Demo

[View Live Demo](#) <!-- Add your deployment URL here -->

## 📸 Screenshots

### Product List Page

<!-- Add screenshot here -->

_Modern product grid with advanced filtering, search, and sorting capabilities_

### Product Detail Page

<!-- Add screenshot here -->

_Comprehensive product information with reviews, specifications, and purchase options_

### Shopping Cart Drawer

<!-- Add screenshot here -->

_Intuitive cart management with quantity controls and real-time total calculation_

### Favorites Drawer

<!-- Add screenshot here -->

_Save and manage favorite products with quick access and cart integration_

## 🚀 Key Features

### 🛍️ E-Commerce Functionality

- **Shopping Cart System**
  - Add/remove products from cart
  - Quantity management (increment/decrement)
  - Real-time total calculation
  - LocalStorage persistence
  - Cart badge with item count
  - Side drawer interface

- **Favorites System**
  - Save favorite products
  - Quick view in dedicated drawer
  - Direct add-to-cart from favorites
  - LocalStorage persistence
  - Favorites badge counter

### 🎨 Premium UI/UX Design

- **Modern Glassmorphism Design**
  - Frosted glass effects with backdrop blur
  - Gradient accents and smooth transitions
  - Layered shadows for depth
  - Hover animations and micro-interactions
- **Responsive Layout**
  - Mobile-first approach
  - Adaptive grid system
  - Touch-friendly controls
  - Optimized for all screen sizes

- **Interactive Elements**
  - Smooth page transitions
  - Loading skeletons
  - Error boundaries
  - Toast notifications

### ⚡ Performance & Rendering

- **Server-Side Rendering (SSR)**
  - Initial product list fetch for SEO
  - Product detail page pre-rendering
  - Fast First Contentful Paint (FCP)
- **Client-Side Rendering (CSR)**
  - Dynamic pagination
  - Real-time search with debouncing
  - Instant filtering and sorting
  - URL parameter synchronization

### 🔧 Advanced Features

- **Search & Filters**
  - Debounced search (300ms delay)
  - Category filtering with URL params
  - Sort by price or rating
  - Dynamic result updates

- **State Management**
  - Redux Toolkit slices
  - Optimistic UI updates
  - LocalStorage integration
  - Hydration handling

- **API Integration**
  - Axios interceptors
  - Request/Response logging
  - Error normalization
  - Loading state management

## 🛠 Tech Stack

| Category             | Technologies                   |
| -------------------- | ------------------------------ |
| **Framework**        | Next.js 15 (App Router)        |
| **Language**         | TypeScript                     |
| **State Management** | Redux Toolkit                  |
| **UI Library**       | Material UI v6                 |
| **HTTP Client**      | Axios                          |
| **Styling**          | MUI System + Custom Theme      |
| **Persistence**      | LocalStorage API               |
| **Code Quality**     | ESLint, TypeScript Strict Mode |

## 📦 Project Architecture

```
src/
├── app/                      # Next.js App Router
│   ├── products/
│   │   ├── [id]/
│   │   │   └── page.tsx     # Product detail (SSR)
│   │   └── page.tsx          # Product list (SSR)
│   ├── layout.tsx            # Root layout with providers
│   └── page.tsx              # Home page
│
├── components/
│   ├── cart/
│   │   └── CartDrawer.tsx   # Shopping cart side drawer
│   ├── favorites/
│   │   └── FavoritesDrawer.tsx # Favorites side drawer
│   ├── layout/
│   │   └── Navigation.tsx    # App header with badges
│   └── products/
│       ├── ProductsView.tsx  # Product grid with filters
│       └── ProductDetailView.tsx # Product details
│
├── store/
│   ├── slices/
│   │   ├── productSlice.ts   # Product state
│   │   ├── cartSlice.ts      # Cart state
│   │   ├── favoritesSlice.ts # Favorites state
│   │   └── uiSlice.ts        # UI state
│   ├── hooks.ts              # Typed Redux hooks
│   └── store.ts              # Store configuration
│
├── services/
│   └── productService.ts     # API service layer
│
├── lib/
│   ├── axios.ts              # Axios instance + interceptors
│   ├── cart.ts               # Cart localStorage utilities
│   └── localStorage.ts       # General storage utilities
│
├── types/
│   └── index.ts              # TypeScript interfaces
│
└── theme.ts                  # MUI theme customization
```

## � Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd product-dashboard-task
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🏗 Technical Implementation

### Hybrid Rendering Strategy

**Server-Side Rendering (SSR)**

- Initial page load fetches data on the server
- SEO-friendly with pre-rendered content
- Fast First Contentful Paint (FCP)
- Implemented in `/products` and `/products/[id]`

**Client-Side Rendering (CSR)**

- Interactive features after hydration
- Instant UI updates without page refresh
- URL synchronization with query params
- Optimistic updates for better UX

### State Management Architecture

**Redux Slices**

```typescript
// Product state
products: {
  items: Product[],
  loading: boolean,
  error: string | null
}

// Cart state
cart: {
  items: CartItem[],
  isHydrated: boolean
}

// Favorites state
favorites: {
  favoriteIds: number[],
  isHydrated: boolean
}

// UI state
ui: {
  searchQuery: string,
  currentPage: number,
  sortBy: 'price' | 'rating' | 'none',
  selectedCategory: string | null
}
```

### LocalStorage Persistence

- **Cart**: Persists across sessions
- **Favorites**: Saved permanently
- **Hydration**: Loads on app initialization
- **Sync**: Updates on every change

### API Layer & Interceptors

**Request Interceptors**

- Adds `X-Request-Id` for tracing
- Adds `X-Request-Time` timestamp
- Enables request logging

**Response Interceptors**

- Normalizes error responses
- Consistent error handling
- User-friendly error messages

## 🎯 Feature Highlights

### Shopping Cart

- ✅ Add products from list or detail page
- ✅ Real-time quantity adjustment
- ✅ Remove items with confirmation
- ✅ Persistent storage (localStorage)
- ✅ Badge counter on navbar
- ✅ Total price calculation
- ✅ Checkout button (ready for integration)

### Favorites

- ✅ Toggle favorites from any page
- ✅ View all favorites in drawer
- ✅ Quick add-to-cart from favorites
- ✅ Remove from favorites
- ✅ Persistent storage
- ✅ Badge counter on navbar

### Product Discovery

- ✅ Debounced search (300ms)
- ✅ Category filtering
- ✅ Sort by price/rating
- ✅ Pagination with URL sync
- ✅ Responsive grid layout
- ✅ Loading states

## 🎨 Design System

### Color Palette

- **Primary**: Purple-Blue Gradient (`#667eea` → `#764ba2`)
- **Accent**: Red Gradient (`#f43f5e` → `#e11d48`)
- **Success**: Green (`#22c55e`)
- **Warning**: Orange (`#fb923c`)

### Typography

- **Headings**: Inter, 800 weight
- **Body**: Inter, 400-600 weight
- **Special**: Gradient text effects

### Effects

- **Glassmorphism**: `backdrop-filter: blur(20px)`
- **Shadows**: Layered, colored shadows
- **Transitions**: 300ms ease
- **Hover**: Scale, lift, glow effects

## ✅ Requirements Checklist

### Core Requirements

- [x] Server-Side Rendering (SSR)
- [x] Client-Side Rendering (CSR)
- [x] Redux Toolkit state management
- [x] Axios with interceptors
- [x] Material UI responsive design
- [x] TypeScript strict mode

### Bonus Features

- [x] Shopping cart functionality
- [x] Favorites system
- [x] LocalStorage persistence
- [x] URL parameter sync
- [x] Advanced filtering
- [x] Premium glassmorphism UI
- [x] Loading skeletons
- [x] Error boundaries
- [x] Mobile responsive

## 🔍 Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with React rules
- **Component Structure**: Modular and reusable
- **State Management**: Normalized and efficient
- **Error Handling**: Comprehensive error boundaries
- **Performance**: Optimized re-renders

## 🚀 Future Enhancements

- [ ] User authentication
- [ ] Payment integration
- [ ] Order history
- [ ] Product reviews submission
- [ ] Wishlist sharing
- [ ] Dark mode support
- [ ] Advanced analytics
- [ ] Product comparison
- [ ] Stock notifications

## 📝 License

This project is created as a technical assessment and is available for review purposes.

## 👤 Author

**Berat Men**

- GitHub: [@beratmen](https://github.com/beratmen)

## 🙏 Acknowledgments

- [DummyJSON API](https://dummyjson.com/) for providing the product data
- Material UI team for the excellent component library
- Next.js team for the powerful framework

---

**Built with ❤️ using Next.js, TypeScript, and Redux Toolkit**
