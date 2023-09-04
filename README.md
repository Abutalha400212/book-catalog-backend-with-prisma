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
https_url/api/v1/users/2c5a3d9e-c009-47cf-99cb-e47a92932337(Single GET)
https_url/api/v1/users/2c5a3d9e-c009-47cf-99cb-e47a92932337(PATCH)
https_url/api/v1/users/2c5a3d9e-c009-47cf-99cb-e47a92932337(DELETE)
```

#### Category

```bash
https_url/api/v1/categories/create-category(POST)
https_url/api/v1/categories (GET)
https_url/api/v1/categories/ef7f3b0b-0913-4327-888a-dd2945b79278 (PATCH)
https_url/api/v1/categories/ef7f3b0b-0913-4327-888a-dd2945b79278 (DELETE)

```

#### Book

```bash
https_url/api/v1/books/create-book(POST)
https_url/api/v1/books (GET)
https_url/api/v1/books/b373bab9-f347-4276-8210-dbe2c3dc49ec/category (Single GET)
https_url/api/v1/books/20eb9564-8eaa-474c-99ca-c11c73470c3b (PATCH)
https_url/api/v1/books/20eb9564-8eaa-474c-99ca-c11c73470c3b (DELETE)

```

#### Pagination and Filtering routes of books

```bash
https_url/api/v1/books?page=1&size=10
https_url/api/v1/books?sortBy=price&sortOrder=asc
https_url/api/v1/books?minPrice=3000&maxPrice=5000
https_url/api/v1/books?category=b373bab9-f347-4276-8210-dbe2c3dc49ec
https_url/api/v1/books?search=programming
```

#### Order

```bash
https_url/api/v1/orders/create-order (POST)
https_url/api/v1/orders (GET)
https_url/api/v1/orders/912a22a6-1f59-46c6-a64c-92ca275d932b (GET)
```
