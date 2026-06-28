# User Management Dashboard

A single-page User Management Dashboard built with React 19 and Vite. It lists
users in a responsive table and supports full create, read, update, and delete
operations, along with search, sorting, filtering, and pagination.

The app talks to the JSONPlaceholder mock API. Since JSONPlaceholder does not
persist changes, every successful create, update, and delete also updates the
local React state so the interface behaves like a real application.

## Features

- **User table** with ID, First Name, Last Name, Email, Department, and Actions
- **Add / Edit / Delete** users through modals, with a confirmation step before deleting
- **Form validation** for required fields, minimum name length, valid email, and department
- **Search** across first name, last name, and email, debounced by 300ms
- **Sorting** by first name, last name, email, or department (ascending / descending) via a dropdown or by clicking column headers
- **Filtering** through a popup with Apply and Reset actions
- **Client-side pagination** with selectable page sizes (10, 25, 50, 100) and Previous / Next controls
- **Loading, empty, and error states** with friendly messages and a retry action
- **Responsive design** — a full table on desktop, a scrollable table on tablet, and stacked cards on mobile

Departments are not provided by the API, so each user is split into first and
last name and assigned a consistent department from a fixed list (Engineering,
HR, Finance, Marketing, Sales, Support, Operations).

## Tech Stack

- React 19
- Vite
- JavaScript (no TypeScript)
- Plain CSS (no Tailwind)
- Axios
- React Icons

## Installation

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (default `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## API Used

[JSONPlaceholder](https://jsonplaceholder.typicode.com/users)

| Method | Endpoint     | Purpose          |
| ------ | ------------ | ---------------- |
| GET    | `/users`     | Load all users   |
| POST   | `/users`     | Create a user    |
| PUT    | `/users/:id` | Update a user    |
| DELETE | `/users/:id` | Delete a user    |

JSONPlaceholder accepts these requests but does not save the changes, so the UI
reflects them by updating local state after each successful response.

## Folder Structure

```
src/
  components/
    UserTable.jsx
    UserRow.jsx
    UserForm.jsx
    FilterModal.jsx
    Pagination.jsx
    SearchBar.jsx
    SortDropdown.jsx
    Navbar.jsx
    Loader.jsx
  services/
    api.js
  utils/
    validation.js
    helpers.js
  hooks/
    useUsers.js
  App.jsx
  main.jsx
  App.css
  index.css
```

State is handled entirely with React hooks (`useState`, `useEffect`, `useMemo`,
`useCallback`). Data fetching and the CRUD operations live in the `useUsers`
hook; the rest of the UI state (search, sort, filters, pagination, modals) is
managed in `App.jsx`. No Redux, Zustand, or Context API is used.

## Challenges

- **No real persistence.** JSONPlaceholder discards writes, so the app keeps its
  own copy of the data in state and merges every successful response into it.
- **Generated fields.** First name, last name, and department do not exist on the
  API. Names are split from the single `name` field and departments are derived
  deterministically from the user ID so they stay consistent across reloads.
- **Unique IDs for new users.** POST always returns ID 11, which would collide on
  repeated adds, so new users get a locally generated incremental ID instead.
- **Coordinating search, filter, sort, and pagination** so they compose correctly
  and the current page resets when the result set changes.

## Future Improvements

- Persist data to a real backend or browser storage
- Inline editing directly in the table
- Bulk selection and bulk delete
- Column visibility toggles and saved filter presets
- Toast notifications for create, update, and delete actions
- Unit and integration tests
