# George Wood Caskets

A premium e-commerce platform for George Wood Caskets, built with React, Tailwind CSS, and Firebase. This application serves as a digital catalog and order management system, reflecting the brand's values of elegance, trust, and tradition.

## Features

### Public Facing (Customer Experience)
-   **Home Page**:
    -   Immersive Hero section with Y-axis logo flip animation.
    -   "Why Choose Us" section highlighting brand values.
    -   Featured products carousel.
    -   Responsive design with a custom Hamburger Menu for mobile.
-   **Product Catalog**:
    -   View all products with infinite scroll/pagination (future optimization).
    -   **Filtering**: Filter by Category (Traditional, Premium, Religious), Material (Wood, Metal, etc.), and Price Range.
    -   **Search**: Real-time product search.
    -   **Product Details**: High-quality images, detailed descriptions, and specifications.
-   **Shopping Cart**:
    -   Add items to cart.
    -   View cart summary.
    -   Checkout flow (integration pending).
-   **Contact & Inquiries**:
    -   Dedicated Contact page with a functional inquiry form.
    -   Submissions are saved directly to Firestore (`inquiries` collection).
-   **User Accounts**:
    -   User Registration and Login via Firebase Auth.
    -   User Profile menu in Header (Login/Logout/Dashboard access).

### Admin Dashboard (Protected)
-   **Secure Access**: Only users with the `admin` role in Firestore can access the dashboard.
-   **Product Management**:
    -   **Create**: Add new products with details and image upload (stored in Firebase Storage).
    -   **Read**: View a tabular list of all products.
    -   **Update**: Edit existing product details.
    -   **Delete**: Remove products from the catalog.
-   **Order Management**:
    -   View customer orders (fetched from Firestore).

## Technology Stack

-   **Frontend**: React (Vite)
-   **Styling**: Tailwind CSS (Custom Design System with Brand Colors)
-   **Backend / Database**: Firebase Firestore
-   **Authentication**: Firebase Auth
-   **Storage**: Firebase Storage (for product images)
-   **Routing**: React Router DOM
-   **Icons**: React Icons
-   **SEO**: React Helmet Async

## Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd George-Wood-Caskets
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory and add your Firebase config:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Build for production**:
    ```bash
    npm run build
    ```

## Project Structure

-   `src/Components`: Reusable UI components (Header, Footer, ProductCard, etc.).
-   `src/Pages`: Main page views (Home, Products, AdminDashboard, etc.).
-   `src/Providers`: Context providers for global state (Auth, Product, Order).
-   `src/utils`: Helper functions and migration scripts.
-   `src/assets`: Static assets (images, icons).

## Contact

For support or inquiries, please contact the development team.
