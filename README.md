# Product Dashboard

A modern, responsive product dashboard built with Next.js, Material UI, Redux Toolkit, and Axios. This application demonstrates Server-Side Rendering (SSR), Client-Side Rendering (CSR), and advanced state management.

## 🚀 Features

- **Server-Side Rendering (SSR)**
  - Initial product list fetch for SEO and performance
  - Product detail page pre-rendering
- **Client-Side Rendering (CSR)**
  - Dynamic pagination
  - Debounced search functionality
  - Sorting (Price, Rating)
  - Category filtering
  - Review refresh on product details
- **State Management**
  - Redux Toolkit for centralized state
  - Persistent behaviors (Favorites) via localStorage
- **Network Layer**
  - Centralized Axios instance
  - Request interceptors (Request ID, Timestamp)
  - Normalized error handling
- **UI/UX**
  - Material UI v6 with custom theme
  - Responsive Grid Layout
  - Glassmorphism effects
  - Loading skeletons & Error boundaries

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Material UI (MUI)](https://mui.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Linting**: ESLint + Prettier

## 📦 Project Structure

```
src/
├── app/                  # App Router pages
│   ├── products/         # Product routes
│   │   ├── [id]/         # Product details (SSR)
│   │   └── page.tsx      # Product list (SSR)
│   ├── layout.tsx        # Root layout with Providers
│   └── page.tsx          # Home redirect
├── components/           # Reusable UI components
│   ├── layout/           # App shell (AppBar, etc.)
│   └── products/         # Product-specific components
│       ├── ProductCard.tsx
│       ├── ProductsView.tsx
│       └── ...
├── lib/                  # Utilities & configurations
│   ├── axios.ts          # Axios instance + interceptors
│   └── localStorage.ts   # Browser storage helpers
├── services/             # API service layer
│   └── productService.ts # Data fetching logic
├── store/                # Redux store setup
│   ├── slices/           # Redux slices (products, ui, favorites)
│   ├── hooks.ts          # Typed Redux hooks
│   └── store.ts          # Store configuration
├── theme.ts              # MUI Theme customization
└── types/                # TypeScript interfaces
```

## 🚀 Getting Started

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd product-dashboard-task
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Architecture

### Hybrid Rendering Strategy

- **SSR (Server-Side Rendering)**:
  - The main `/products` page fetches the initial list of 20 products on the server.
  - Individual product pages `/products/[id]` fetch product details on the server.
  - This ensures fast First Contentful Paint (FCP) and SEO friendliness.

- **CSR (Client-Side Rendering)**:
  - After hydration, Redux takes over for interactive features.
  - Pagination, filtering, and sorting trigger client-side API calls.
  - The UI updates instantly while keeping the URL in sync (e.g., `?category=smartphones`).

### State Management (Redux)

The store is split into efficiently managed slices:

- **`products`**: Stores the list of products, current product detail, loading states, and API errors.
- **`ui`**: Manages volatile UI state like search queries, sort order, and pagination.
- **`favorites`**: Handles user favorites, persisted to `localStorage`.

### Network Layer (Axios)

A singleton Axios instance (`@/lib/axios`) handles all requests with robust interceptors:

- **Request**: Injects `X-Request-Id` and `X-Request-Time` headers for tracing.
- **Response**: Normalizes errors (404, 500, 503) into a standard format for consistent UI feedback.

## 📸 Screenshots

### Product List (SSR + CSR)

<!-- Place screenshot here -->

_Displays product grid with search, sort, and categories._

### Product Detail

<!-- Place screenshot here -->

_Full product information with reviews and easy navigation._

### Loading State

<!-- Place screenshot here -->

_Skeleton loaders provide visual feedback during data fetching._

### Error State

<!-- Place screenshot here -->

_Graceful error handling with user-friendly messages._

## ✅ Acceptance Criteria Status

- [x] SSR works on initial load
- [x] CSR interactions work without refresh
- [x] Axios interceptors implemented
- [x] Redux slices implemented
- [x] Responsive MUI UI
- [x] Bonus: Favorites with localStorage
- [x] Bonus: Category filter with URL params
