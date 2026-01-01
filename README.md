# Capture

Capture is a minimal full-stack web application that allows users to securely record and manage short, unstructured text entries in a single place.

Users can sign up, authenticate using JWT, and perform full CRUD operations on their own entries. Per-user access control is enforced at the backend, ensuring users can only access their own data.

The application is built with a React frontend and a Django REST Framework backend, connected via RESTful APIs to provide a complete end-to-end data flow.

**Tech stack:** React, Django REST Framework, JWT Authentication

## Upcoming Direction (Product Intent)

The MVP proves the full-stack foundation (auth + CRUD + secure APIs). The next iteration shifts the product from “a notes CRUD app” into a **low-resistance class workspace**:

## Upcoming Direction (Planned)

Capture is intended to evolve from a simple entry manager into a **low-resistance academic workspace**.

Instead of creating and managing multiple documents for each class or module, users define their subjects once at the start of a semester (e.g., Data Structures, Calculus, Physics). All thoughts, notes, and ideas can then be written freely in a single place.

As entries are created, the system will automatically categorize them under the appropriate subject based on the content written, with the ability for users to review or override the assigned subject when needed.

The goal is to reduce friction during lectures by eliminating document switching, while still keeping notes organized by module in the background.

