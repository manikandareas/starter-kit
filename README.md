# 🔥 SaaS Ignition: Your Next Big Idea Starts Here 🔥

Ready to build the next big SaaS platform? This starter kit is your launchpad! 🚀

We've packed it with a powerful, modern tech stack so you can focus on building amazing features, not wrestling with setup.

## 🛠️ What's Under the Hood? (Core Technologies)

We've hand-picked a suite of robust and developer-friendly technologies:

- **⚛️ React:** The king of UI libraries, for building beautiful and responsive interfaces.
- **⚡ Vite:** Blazing-fast build tool and dev server. Say goodbye to long waits!
- **🗺️ TanStack Router:** Effortless file-based routing. Managing your app's pages has never been easier.
- **🔄 TanStack Query:** Master your data fetching and caching like a pro.
- **🌬️ Tailwind CSS:** A utility-first CSS framework for designing stunning UIs with speed.
- **🎨 Shadcn/ui:** Gorgeous, accessible UI components ready to drop into your app.
- **☁️ Convex:** Your all-in-one backend solution: real-time database, serverless functions, and file storage.
- **🔑 Clerk:** Secure and seamless authentication and user management.
- **🧹 Biome:** Keep your code sparkling clean and consistent with top-notch linting and formatting.
- **🧪 Vitest:** Write and run unit tests with confidence.
- **🔒 T3Env:** Type-safe environment variables, because safety first!

## ✨ Sparking Features (Key Highlights)

This starter kit isn't just a collection of tools, it's a productivity powerhouse:

- **🚀 File-Based Routing:** Add new pages by simply creating files. It's that easy!
- **🎣 Flexible Data Fetching:** Choose between TanStack Query or TanStack Router's loaders.
- **💅 Stunning UI Out-of-the-Box:** Tailwind CSS + Shadcn/ui = a match made in heaven.
- **🧼 Code Quality Assurance:** Biome keeps your codebase pristine.
- **✅ Robust Testing Framework:** Vitest ensures your app is bug-free.
- **🛡️ Secure Environment Variables:** T3Env protects your sensitive data.
- **👤 Effortless Authentication:** Clerk handles user sign-ups, logins, and more.
- **💪 Powerful Backend:** Convex gives you a real-time database and serverless functions without the headache.

## 🚀 Let's Get This Rocket Off the Ground! (Getting Started)

1. **Install the thrusters (dependencies):**

   ```bash
   pnpm install
   ```

2. **Ignite the engines (start the dev server):**

   ```bash
   pnpm start
   ```

   And in a separate terminal, launch the Convex backend:

   ```bash
   npx convex dev
   ```

   Your app will be live at `http://localhost:3000`!

## 📦 Preparing for Launch (Building for Production)

```bash
pnpm build
```

This command bundles your app into an optimized package ready for deployment in the `dist` folder.

## 🗺️ Navigating the Mothership (Project Structure)

Here's a map of your new project:

- `convex/`: Your Convex backend lives here (database schema, serverless functions, etc.).
- `public/`: Static assets that are served directly (images, fonts, etc.).
- `src/`: The heart of your application.
  - `components/`: Reusable UI building blocks.
  - `lib/`: Handy utility functions.
  - `routes/`: Your app's pages and layouts.
  - `main.tsx`: The main entry point of your React application.
- `package.json`: Your project's manifest, listing dependencies and scripts.
- `README.md`: You're looking at it! 😉

This starter kit is your canvas. Feel free to customize, extend, and build upon it. Dive into the documentation for each technology to unlock its full potential!

## 🧪 Testing Your Creation

This project uses [Vitest](https://vitest.dev/) for testing. Run your tests with:

```bash
pnpm test
```

## 💅 Styling with Finesse

[Tailwind CSS](https://tailwindcss.com/) is at your service for all your styling needs.

## 🧹 Keeping it Clean: Linting & Formatting

Maintain a beautiful and consistent codebase with [Biome](https://biomejs.dev/):

```bash
pnpm lint
pnpm format
pnpm check
```

## 🔒 Environment Variable Safety with T3Env

- Add your secrets to `src/env.mjs`.
- Access them type-safely in your code.

### Example Usage

```ts
import { env } from "@/env";

console.log(env.VITE_APP_TITLE); // Your app title, safe and sound!
```

## ✨ Adding UI Magic with Shadcn

Easily add [Shadcn](https://ui.shadcn.com/) components:

```bash
pnpx shadcn@latest add button
```

## 🧭 Advanced Navigation with TanStack Router

[TanStack Router](https://tanstack.com/router) powers our file-based routing, making navigation a breeze.

### Adding A Route

To add a new route to your application just add another a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you use the `<Outlet />` component.

Here is an example layout that includes a header:

```tsx
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
```

The `<TanStackRouterDevtools />` component is not required so you can remove it if you don't want it in your layout.

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## 🎣 Data Fetching: Reel in Your Data

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
const peopleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/people",
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json() as Promise<{
      results: {
        name: string;
      }[];
    }>;
  },
  component: () => {
    const data = peopleRoute.useLoaderData();
    return (
      <ul>
        {data.results.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    );
  },
});
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

### React-Query

React-Query is an excellent addition or alternative to route loading and integrating it into you application is a breeze.

First add your dependencies:

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

Next we'll need to create a query client and provider. We recommend putting those in `main.tsx`.

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ...

const queryClient = new QueryClient();

// ...

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

You can also add TanStack Query Devtools to the root route (optional).

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools />
    </>
  ),
});
```

Now you can use `useQuery` to fetch your data.

```tsx
import { useQuery } from "@tanstack/react-query";

import "./App.css";

function App() {
  const { data } = useQuery({
    queryKey: ["people"],
    queryFn: () =>
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => data.results as { name: string }[]),
    initialData: [],
  });

  return (
    <div>
      <ul>
        {data.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

You can find out everything you need to know on how to use React-Query in the [React-Query documentation](https://tanstack.com/query/latest/docs/framework/react/overview).

## 🗃️ State Management: Keep Calm and Manage State

Another common requirement for React applications is state management. There are many options for state management in React. TanStack Store provides a great starting point for your project.

First you need to add TanStack Store as a dependency:

```bash
pnpm add @tanstack/store
```

Now let's create a simple counter in the `src/App.tsx` file as a demonstration.

```tsx
import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

function App() {
  const count = useStore(countStore);
  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
    </div>
  );
}

export default App;
```

One of the many nice features of TanStack Store is the ability to derive state from other state. That derived state will update when the base state updates.

Let's check this out by doubling the count using derived state.

```tsx
import { useStore } from "@tanstack/react-store";
import { Store, Derived } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

const doubledStore = new Derived({
  fn: () => countStore.state * 2,
  deps: [countStore],
});
doubledStore.mount();

function App() {
  const count = useStore(countStore);
  const doubledCount = useStore(doubledStore);

  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
      <div>Doubled - {doubledCount}</div>
    </div>
  );
}

export default App;
```

We use the `Derived` class to create a new store that is derived from another store. The `Derived` class has a `mount` method that will start the derived store updating.

Once we've created the derived store we can use it in the `App` component just like we would any other store using the `useStore` hook.

You can find out everything you need to know on how to use TanStack Store in the [TanStack Store documentation](https://tanstack.com/store/latest).

## 🗑️ Demo Files: Feel Free to Declutter

Files prefixed with `demo` are just examples. You can safely remove them once you're comfortable.

## 📚 Want to Learn More?

Explore the [TanStack documentation](https://tanstack.com) to become a TanStack ninja!
