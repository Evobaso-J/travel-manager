# Travel and Bookings Management System

## Required Tech Stack

- Vue 3 with Composition API
- Nuxt3
- TypeScript
- Tailwind

## Project Description

The goal is to build a travel and bookings management system with 2 pages: one for managing travels and another for managing bookings.

### Travels

Travels should include the following basic information:

- Name of the travel
- Dates of departure and return
- A picture
- A description of the tour
- Price for a single person
- Average user rating

**Features:**

- Travels should be listed on a dedicated page, featuring a table and basic filters.
- Users should be able to:
    - Add a new travel using a form
    - Edit an existing travel
    - Delete a travel

### Bookings

Bookings should contain the following information:

- Related travel
- Customer information (name, email, phone number, age, gender)
- Payment type
- Optional internal notes

**Features:**

- Bookings should be listed on a dedicated page with a table.
- A booking can be created using a dedicated multi-step form (wizard):
    1. Search and select the related travel.
    2. Fill in the customer information.
    3. Select the payment type (Credit transfer, PayPal, Revolut) and optionally add some notes.

## Notes

- The backend/API part can be mocked (no database, optional validation, just mocked data) and implemented as preferred, for example, with Nuxt server routes or a dedicated simple server.
- For any details not explicitly mentioned in this document, feel free to design and build as they prefer.