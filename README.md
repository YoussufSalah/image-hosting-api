# Supabase Image Hosting API

A simple backend API for uploading, retrieving, and deleting images using **Supabase**. Supports optional resizing and compression.

---

## Features

-   **POST /upload/**: Upload an image
    -   Optional JSON body:
        ```json
        {
            "compress": true,
            "resize": { "width": 300, "height": 300 }
        }
        ```
-   **GET /images/**: Get all uploaded images (excludes soft-deleted ones)
-   **DELETE /images/soft/:id**: Soft delete an image (sets `delete_date`)
-   **DELETE /images/hard/:id**: Hard delete an image (removes file + DB record)

---

## Supported Image Types

-   JPG / JPEG
-   PNG
-   WebP
-   AVIF
-   GIF (compression skipped)

---

## Setup

1. Clone the repo
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set environment variables in `.env`:
    ```ini
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_anon_or_service_role_key
    ```
4. Run the server:
    ```bash
    npm run dev
    ```

---

## Example cURL Requests

**Upload Image**

```bash
curl -X POST http://localhost:3000/upload/ \
  -F "file=@/path/to/image.jpg" \
  -F 'compress=true' \
  -F 'resize={"width":300,"height":300}'
```

**Get All Images**

```bash
curl -X GET http://localhost:3000/images/
```

**Soft Delete**

```bash
curl -X DELETE http://localhost:3000/images/soft/<IMAGE_ID>
```

**Hard Delete**

```bash
curl -X DELETE http://localhost:3000/images/hard/<IMAGE_ID>
```

---

## Notes

-   This project is for **personal use**. If someone clones it, they need their **own Supabase project** and credentials.
-   Public bucket + table policies assumed, so no authentication required.
-   Resizing & compression handled server-side using `sharp`.
