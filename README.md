# User Management Dashboard

A responsive User Management Dashboard built with **React 19** and **Vite**. The application allows users to view, add, edit, delete, search, sort, filter, and paginate user records using the JSONPlaceholder mock REST API.

## Live Demo

* **Live Application:** https://user-managementboard.netlify.app
* **GitHub Repository:** https://github.com/Thiru7869/User-Management-Dashboard

---

## Features

* View all users in a responsive table
* Add new users
* Edit existing users
* Delete users with confirmation
* Search users by first name, last name, or email
* Sort users by:

  * First Name
  * Last Name
  * Email
  * Department
* Filter users using a popup
* Client-side pagination with:

  * 10 users/page
  * 25 users/page
  * 50 users/page
  * 100 users/page
* Responsive layout for desktop, tablet, and mobile
* Loading state
* Empty state
* Error handling with Retry option
* Client-side form validation

---

## Tech Stack

* React 19
* Vite
* JavaScript (ES6+)
* Axios
* React Icons
* Plain CSS

---

## Installation

### Prerequisites

* Node.js 18 or later
* npm

### Clone the Repository

```bash
git clone https://github.com/Thiru7869/User-Management-Dashboard.git

cd User-Management-Dashboard
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview
```

---

## API Used

The project uses the free mock REST API:

https://jsonplaceholder.typicode.com/users

| Method | Endpoint   | Purpose         |
| ------ | ---------- | --------------- |
| GET    | /users     | Fetch all users |
| POST   | /users     | Create a user   |
| PUT    | /users/:id | Update a user   |
| DELETE | /users/:id | Delete a user   |

Since JSONPlaceholder is a mock API, POST, PUT, and DELETE requests return successful responses but do not permanently save data. The application updates the local React state to simulate persistent CRUD functionality.

---

## Folder Structure

```
src/
│
├── components/
│   ├── FilterModal.jsx
│   ├── Loader.jsx
│   ├── Navbar.jsx
│   ├── Pagination.jsx
│   ├── SearchBar.jsx
│   ├── SortDropdown.jsx
│   ├── UserForm.jsx
│   ├── UserRow.jsx
│   └── UserTable.jsx
│
├── hooks/
│   └── useUsers.js
│
├── services/
│   └── api.js
│
├── utils/
│   ├── helpers.js
│   └── validation.js
│
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

---

## State Management

The application uses React Hooks only:

* useState
* useEffect
* useMemo
* useCallback

The custom `useUsers` hook handles:

* Fetching users
* Creating users
* Updating users
* Deleting users
* API loading state
* Error handling

UI state such as search, filters, sorting, pagination, and modal visibility is managed inside `App.jsx`.

---

## Assumptions

* JSONPlaceholder provides only a single `name` field, so it is split into first and last names.
* Departments are not available in the API and are generated deterministically from user IDs.
* Since JSONPlaceholder does not persist changes, CRUD operations are reflected by updating the local React state.
* Pagination, filtering, and sorting are implemented on the client side.

---

## Challenges Faced

* JSONPlaceholder does not permanently store created, updated, or deleted users.
* Generated first name, last name, and department fields had to remain consistent across reloads.
* Creating unique IDs for newly added users because the mock API always returns the same ID.
* Combining search, filtering, sorting, and pagination while keeping the UI synchronized.

---

## Future Improvements

* Connect to a real backend database
* Authentication and authorization
* Persistent storage
* Bulk user operations
* Export data to CSV or Excel
* Column customization
* Toast notifications
* Dark mode
* Unit testing
* Integration testing
* End-to-end testing using Cypress

---

## Author

**Thirumala Narasimha Poluru**

GitHub: https://github.com/Thiru7869

---

## License

This project was developed as part of a JavaScript technical assignment for evaluation purposes.
