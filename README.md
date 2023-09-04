# Book Catallog Backend

#### Live Link

```bash
https_url
```

## Application Routes

### Main Part

#### User

```bash
https_url/api/v1/auth/signup (POST)
https_url/api/v1/auth/login (POST)
https_url/api/v1/users (GET)
https_url/api/v1/users/d7da339b-a711-497a-9d7a-0cd95801f3aa(Single GET)
https_url/api/v1/users/d7da339b-a711-497a-9d7a-0cd95801f3aa(PATCH)
https_url/api/v1/users/d7da339b-a711-497a-9d7a-0cd95801f3aa(DELETE)
```

#### Category

```bash
https_url/api/v1/categories/create-category(POST)
https_url/api/v1/categories (GET)
https_url/api/v1/categories/d8477450-6cf9-452b-a237-1c08893925ad (PATCH)
https_url/api/v1/categories/d8477450-6cf9-452b-a237-1c08893925ad (DELETE)

```

#### Book

```bash
https_url/api/v1/books/create-book(POST)
https_url/api/v1/books (GET)
https_url/api/v1/books/3cb850fd-1693-4ee5-93b4-307a42e1d843/category (Single GET)
https_url/api/v1/books/6678cc96-1132-415e-885e-808d525c8807 (PATCH)
https_url/api/v1/books/6678cc96-1132-415e-885e-808d525c8807 (DELETE)

```

#### Pagination and Filtering routes of books

```bash
https_url/api/v1/books?page=1&size=10
https_url/api/v1/books?sortBy=price&sortOrder=asc
https_url/api/v1/books?minPrice=3000&maxPrice=5000
https_url/api/v1/books?category=3cb850fd-1693-4ee5-93b4-307a42e1d843
https_url/api/v1/books?search=programming
```

#### Order

```bash
https_url/api/v1/orders/create-order (POST)
https_url/api/v1/orders (GET)
https_url/api/v1/orders/ad08a658-7c62-43c2-883e-e766bf5794cf (GET)
```
