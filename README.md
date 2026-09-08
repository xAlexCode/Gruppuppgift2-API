# Gruppuppgift2 (kom på namn)

Detta är en uppgift att skapa .... 

## Innehåll

- ER-diagram
- OSV

## Tekniker

- Express — Backend‑ramverk för routing och API‑logik
- TypeScript — Själva koden
- Node.js — Runtime‑miljö för att köra Express‑servern
- MongoDB - Dataserver med cluster
- Insomnia — API‑klient för att testa endpoints (GET, POST, PATCH, DELETE)

## Er diagram

Skapat med [app.diagram](https://app.diagrams.net)
![ER-diagram](erdiagram.jpg) Lägg in senare

## Databas

Databasen innehåller tabellerna:

### `users`
- username: String
- password: String
- is_admin: Boolean
- created_at: Date


### `books`
- title: String
- description: String
- author: String
- genres: Array
- image: String
- published_year: Number


### `reviews`
- name: String
- content: String
- rating: Number (1-5)
- created_at: Date
- review_id: ObjectId

### Relation

- En produkt kan tillhöra **flera kategorier**
- En kategori kan ha **flera produkter**
- Detta hanteras via en many-to-many-tabell: `product_category`


## Installation och körning

1. Installera dependencies:

```bash
   npm install
```


3. Skapa en .env fil med följande:

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

5. Eventuellt ändra till annan port i `index`om det behövs:

```typescript
const PORT = 3050;
```

6. Starta dev-server:

```bash
 npm run dev
```

## Endpoints

Nedan följer alla endpoints för Users och Böcker.

### Users

| Metod  | Endpoint        | Beskrivning           |
| ------ | --------------- | --------------------- |
| GET    | /categories     | Hämta alla kategorier |


### Books

| Metod  | Endpoint      | Beskrivning          |
| ------ | ------------- | -------------------- |
| GET    | /products     | Hämta alla produkter |

### Reviews

| Metod  | Endpoint      | Beskrivning          |
| ------ | ------------- | -------------------- |
| GET    | /products     | Hämta alla produkter |
