## Pixisphere Frontend

## Setup Instructions

1. Clone the Repository
```bash 
git clone https://github.com/DEVESH1709/Pixisphere-Frontend.git
cd Pixisphere-Frontend
```

 *Install Dependencies:*

   * In the project root,`to install all required Node packages.
   
       First, run the development server:
      
      ```bash
      npm run dev
      # or
      yarn dev
      # or
      pnpm dev
      # or
      bun dev
      ```
      ```bash
      npm install zustand lodash json-server
      ```
      
   * This pulls in Next.js, React, Zustand, Lodash, json-server, etc.
2. *Run JSON Server (Mock API):*

   * Ensure json-server is available (e.g. npm install -g json-server or add it to devDependencies).
   * Create a db.json file in the project root containing your mock data. This should define collections like "photographers", "categories", etc. For example, a simple db.json might look like:

     ```json
     {
       "photographers": [
         { "id": 1, "name": "Ravi Studio", "category": "Maternity", "rating": 4.5, "price": 200 },
         { "id": 2, "name": "Moments by Neha", "category": "Newborn", "rating": 4.8, "price": 300 }
       ],
       "categories": ["Maternity", "Newborn", "Birthday", "Event"]
     }
     
     ```

     JSON Server will expose REST endpoints (/photographers, /photographers/1, etc.) based on these arrays.
   * Start the JSON server with a command like:

     ```bash
     npx json-server --watch db.json --port 3001
     ```

     This runs the mock API on http://localhost:3001 (you can choose a different port if needed). The console should show you the available routes (e.g. GET /photographers, POST /photographers, etc.).
3. *Start the Development Server:*

   * In another terminal, run npm run dev (or yarn dev). This launches Next.js’s development server on http://localhost:3000.
   * Open your browser to [http://localhost:3000](http://localhost:3000) to view the app. The terminal should say “ready - started server” and any code changes will hot-reload automatically. The Next.js docs note that npm run dev starts the dev server and watches your files.
4. *Configure Environment Variables:*

   * Create a .env.local (or .env.development) file in the project root.
   * Define a variable like:

     ```bash
     NEXT_PUBLIC_API_URL=http://localhost:3001
     ```

     In Next.js, any environment variable you use on the client *must* be prefixed with NEXT_PUBLIC_. This makes process.env.NEXT_PUBLIC_API_URL available in your code at runtime. Set it to point to your JSON server’s base URL. For example, NEXT_PUBLIC_API_URL=http://localhost:3001. (After build, this value is inlined into the client bundle.)

## Project Overview

* *Category Listing Page:* Shows a grid of photographer “cards” for a given category (e.g. “Maternity Photographers in Bengaluru”). Each card displays the photographer’s name, photo, specialty/style, rating, and price. Key features of this page include: a *search bar* (to filter by name or location), a *filter Sidebar* (e.g. checkboxes or selects for style, rating, price range), and a *sort dropdown* (e.g. sort by rating or price). As the user scrolls, more photographer cards are loaded (infinite scroll) rather than using explicit pagination. Infinite scrolling is a UX pattern *“where more content loads as the user scrolls down.”*. In practice, when the user nears the bottom of the page, the next batch of results is fetched from the API and appended automatically.
* *Photographer Profile Page:* When a user clicks “View Profile” on a photographer card, the app navigates to that photographer’s detail page (e.g. /photographer/123). This page shows full information: a larger photo gallery, biography, detailed service/package info, pricing, client reviews, and contact options. The data comes from the mock API (e.g. GET /photographers/123).
* *Filters & Search:* Users can refine the listing using multiple filters (such as style tags, minimum rating, price range sliders) and a search input. The search input is *debounced* so that it only applies after the user pauses typing (see Logic Notes below).
* *Infinite Scroll:* To keep browsing seamless, the list uses infinite scrolling (instead of traditional numbered pages). As noted, more items load dynamically when scrolling. This means the listing page may show a “Load More” button or simply append new cards as the user reaches the bottom.

## Filtering and Logic Notes

* *Zustand Filter Store:* We use a Zustand store (often in store/filterStore.ts) to hold all filter state globally. This store contains fields like the selected category, price range, rating, and any sort order. It also provides setter methods (e.g. setCategory, setRating, resetFilters) to update this state. In effect, *“the filter store will manage filters, their selection state, and reset logic.”*. Any component (filter panel, search bar, sort dropdown) can read from and write to this store. This avoids having to pass filter state down through many props. For example, when a user toggles a style checkbox, we update the store (e.g. filterStore.getState().setStyle("Documentary")), and the list component subscribes to those changes to re-filter the data.
* *Debounced Search (Lodash):* The text search input uses lodash.debounce to optimize filtering. Lodash’s debounce *“delays invoking a function passed into it”*. We wrap the search handler with debounce (e.g. 300ms delay) so that the filtering logic runs only after the user has stopped typing briefly. This prevents running the filter routine on every single keystroke. In practice, the effect is that the app waits 300ms after the last keystroke before applying the search term. The image below illustrates this concept: each “bounce” of the ball represents the user typing, and only after it settles do we trigger the action.  Using debounce greatly reduces redundant calls and improves performance.
* *Filtering & Pagination Logic:* When filters or search text change, we compute the new list of photographers to display. There are two common approaches:

  * API-side Filtering: We can send query parameters to the JSON Server. For example, JSON Server supports pagination (?_page=2&_limit=10) and sorting (?_sort=rating). We might request GET /photographers?category=Maternity&_sort=price&_page=1&_limit=10 to get the first page of sorted, filtered results. Each additional page is fetched by incrementing _page. The results are appended to our list (for infinite scroll).
  * Client-side Filtering: Alternatively, we could fetch a broader dataset (or all data) and apply JavaScript filters in the browser (e.g. Array.filter for rating >= X and text match). After filtering, we then slice the array to implement pagination (show the first N items, then load more on scroll).
    In either case, JSON Server makes this easy: it supports complex queries (like ?rating_gte=4, ?name_like=John) and pagination flags. We combine the active filters into these query parameters whenever we fetch data.
* *Infinite Scroll / Load More:* We implement infinite scroll by detecting when the user reaches the end of the list (often via the Intersection Observer API). At that point, we increase our page counter and fetch the next chunk. JSON Server’s pagination parameters (as mentioned) handle splitting the results. For example, if our limit is 10 per page, the first request uses _page=1, and once that’s appended, a second request with _page=2 loads the next 10. As noted, infinite scrolling *“will load more content as the user scrolls down”*, creating a smooth browsing flow. A “Load More” button can also be used to manually trigger the next page if auto-scroll is not desired.

## Directory Structure :

A typical Next.js/React project layout for this assignment might look like:

* app/ (or pages/ in older Next.js) – Contains route folders and page components. E.g. app/category/[name]/page.tsx for the listing, app/photographer/[id]/page.tsx for profiles, plus any layout or loading UI.
* components/ – Reusable UI components (e.g. PhotographerCard.tsx, FilterSidebar.tsx, SearchBar.tsx, NavigationBar.tsx, etc.). These are used by the pages in app/.
* store/ or stores/ – Zustand stores (e.g. filterStore.ts). This holds global state logic.
* public/ – Static assets (images, icons). You can put photographer sample images or logo files here; they’ll be served from the root (e.g. /profile.png).
* styles/ (or styles/global.css) – Global CSS or styling resources. You may have global styles or theme files here.
* *Root files:* .env (env vars), package.json (dependencies/scripts), next.config.js (Next.js config), db.json (mock data).
