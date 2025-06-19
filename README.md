# 🔥 SaaS Ignition: Your Next Big Idea Starts Here 🔥

Ready to build the next big SaaS platform? This starter kit is your launchpad! 🚀

We've packed it with a powerful, modern tech stack so you can focus on building amazing features, not wrestling with setup.

## 🛠️ What's Under the Hood? (Core Technologies)

We've hand-picked a suite of robust and developer-friendly technologies:

- **⚛️ React:** The king of UI libraries, for building beautiful and responsive interfaces.
- **⚡ Vite:** Blazing-fast build tool and dev server. Say goodbye to long waits!
- **🗺️ TanStack Router:** Effortless file-based routing. See `src/routes/ROUTING.md` for more details.
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

1. **Install Dependencies:**
   Get all the tools you need to build and run your app.

   ```bash
   pnpm install
   ```

2. **Configure Environment Variables:**
   - First, start the Convex dev server (required for setting env variables):
     ```bash
     npx convex dev
     ```
   - In a new terminal, create a `.env.local` file in your project root and add your Clerk publishable key:
     ```bash
     VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     ```
   - Set up Clerk's issuer URL for Convex (copy from the JWT_TEMPLATE in Clerk dashboard):
     ```bash
     npx convex env set CLERK_ISSUER_URL your_clerk_issuer_url
     ```

3. **Start the Development Servers:**
   - In one terminal, start the frontend:
     ```bash
     pnpm dev
     ```
   - In another terminal (if not already running), the Convex backend:
     ```bash
     npx convex dev
     ```

   Once both are running, your app will be live at [http://localhost:3000](http://localhost:3000)!

---

> 💡 _Need more details?_  
> - Check [Convex + Clerk integration docs](https://clerk.com/docs/integrations/databases/convex) for advanced setup.
> - See `src/routes/ROUTING.md` for route and navigation tips.

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
  - `src/routes/`: Your app's pages and layouts. See `src/routes/ROUTING.md` for routing documentation.
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

## 📚 Want to Learn More?

Explore the [TanStack documentation](https://tanstack.com) to become a TanStack ninja!
