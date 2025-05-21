<!-- filepath: /Users/manik/Development/starter-kit/src/routes/README.md -->

# 🚀 Navigating Your App: A Guide to Routing 🗺️

Welcome to the routing hub of your project! This project uses the awesome [TanStack Router](https://tanstack.com/router) with a slick file-based routing system. What does that mean? The way you organize your files and folders in `src/routes` magically defines your app's navigation paths! ✨

## 📄 Creating New Pages (Routes) - It's Easy

Got a new feature or section for your app? Adding a new page (route) is as simple as creating a `.tsx` file in the `src/routes` directory or its subdirectories.

- **Basic Route:** Want an `/about` page? Just create `about.tsx` in `src/routes`. Boom! 💥
- **Nested Route:** Need `/dashboard/settings`? No problem! Create `settings.tsx` inside a `src/routes/dashboard` folder. 📁

TanStack Router is smart and will automatically detect these files and set up the routes for you.

**Example: Let's Create an `/about` Page** 🛠️

1. **Create the file:** `src/routes/about.tsx`
2. **Add your component magic:**

   ```tsx
   import { createFileRoute } from "@tanstack/react-router";

   export const Route = createFileRoute("/about")({
     component: AboutComponent,
   });

   function AboutComponent() {
     return (
       <div>
         <h3>👋 About Us!</h3>
         <p>This is where your amazing "about" content will live.</p>
       </div>
     );
   }
   ```

## 🖼️ Crafting Layouts - Consistent Experiences

Layouts are your best friends for creating consistent UI around different parts of your app. They are special components that wrap around a set of routes, defined by files named `_layout.tsx` or by a component in a route file that has child routes.

- **The Big Boss (Root Layout):** Your app's main shell is `src/routes/__root.tsx`. Everything else lives inside this.
- **Section-Specific Layouts (Nested Layouts):** Need a special look for your dashboard? Create a `_layout.tsx` in a subdirectory like `src/routes/_app/_authenticated/dashboard/_layout.tsx`. This layout will apply to all routes under `/dashboard`.

Remember, layout components need an `<Outlet />` from `@tanstack/react-router`. This is the placeholder where child route content gets rendered.

**Example: Building a Dashboard Layout** 📊

1. **Create the file:** `src/routes/_app/_authenticated/dashboard/_layout.tsx`
2. **Define your layout structure:**

   ```tsx
   import { Outlet, createFileRoute } from "@tanstack/react-router";

   export const Route = createFileRoute(
     "/_app/_authenticated/dashboard/_layout"
   )({
     component: DashboardLayoutComponent,
   });

   function DashboardLayoutComponent() {
     return (
       <div>
         <nav>Awesome Dashboard Navigation 🚀</nav>
         <hr />
         <Outlet /> {/* Child routes pop in here! */}
       </div>
     );
   }
   ```

## 🗺️ Your Current Route Map: An Overview

Here's a bird's-eye view of the existing routes and how they're structured:

- **`__root.tsx`**: 👑 The absolute root layout. Global elements like headers, footers, or universal context providers live here.

- **`index.tsx`**: 🏠 The welcome mat of your application, accessible at the root path (`/`). Your app's homepage!

- **`_app.tsx`**: 🧩 A general layout or grouping for main application routes. Think global app state or common UI for most of the app.

- **`_app/`**: This directory is where the core application flow routes reside.
  - **`_app/_authenticated.tsx`**: 🛡️ The gatekeeper! This route acts as a layout or guard for routes that need you to be logged in. It might send unauthenticated users to a login page.
  - **`_app/_authenticated/dashboard/`**: 📈 Your user dashboard lives here!
    - **`_layout.tsx`**: The main command center layout for the dashboard (navigation, sidebars, etc.).
    - **`_layout.index.tsx`**: The first thing users see when they hit `/dashboard`.
    - **`_layout.settings.tsx`**: A dedicated layout for the dashboard's settings area. Perfect for nested layouts if settings pages have their own common UI.
    - **`_layout.settings.index.tsx`**: The main page for dashboard settings, found at `/dashboard/settings`.
    - **`-ui.navigation.tsx`**: 🎨 (Note the hyphen!) This isn't a route. It's likely a helper for dashboard navigation UI components, conveniently located.
  - **`_app/_authenticated/onboarding/`**: 👋 Guiding new users! This directory holds routes for the onboarding experience.
    - **`_layout.tsx`**: The layout for the onboarding flow (maybe a stepper or progress bar).
    - **`_layout.username.tsx`**: A specific step in onboarding, like setting a username (e.g., `/onboarding/username`).

## 📜 Route Naming Conventions - The Secret Code

Understanding these conventions will make you a routing wizard:

- **`__root.tsx`**: The main entry point and root layout.
- **`_layout.tsx`**: Defines a layout for a segment of routes.
- **`index.tsx`**: The default route for a directory (e.g., `routes/index.tsx` is `/`).
- **Files starting with a hyphen (e.g., `-ui.navigation.tsx`)**: These are typically _not_ routes. They are utility or UI components co-located with routes for organizational bliss.
- **Folders starting with an underscore (e.g., `_app`, `_authenticated`)**: These are part of the route path. They can also group related routes and layouts, sometimes without creating a visible URL segment if they are configured as layout routes.

For the nitty-gritty details, the [TanStack Router documentation](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing) is your ultimate guide! Happy routing! 🚀
