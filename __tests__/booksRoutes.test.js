process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");

describe("POST /books", function () {

    beforeEach(async function () {
        await db.query("DELETE FROM books");
    });

    test("Creates new book", async function () {
        const res = await request(app)
            .post("/books")
            .send({
                "isbn": "Testing",
                "amazon_url": "amazon.com",
                "author": "Test",
                "language": "English",
                "pages": 118,
                "publisher": "Cannon",
                "title": "Title_Test",
                "year": 2020
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            "book": {
                "isbn": "Testing",
                "amazon_url": "amazon.com",
                "author": "Test",
                "language": "English",
                "pages": 118,
                "publisher": "Cannon",
                "title": "Title_Test",
                "year": 2020
            }
        })
    })
})

describe("GET /books", function () {

    beforeEach(async function () {
        await request(app)
            .post("/books")
            .send({
                "isbn": "Testing",
                "amazon_url": "amazon.com",
                "author": "Test",
                "language": "English",
                "pages": 118,
                "publisher": "Cannon",
                "title": "Title_Test",
                "year": 2020
            });
    });

    test("Gets all books", async function () {
        const res = await request(app)
            .get("/books")

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            "books": [{
                "isbn": "Testing",
                "amazon_url": "amazon.com",
                "author": "Test",
                "language": "English",
                "pages": 118,
                "publisher": "Cannon",
                "title": "Title_Test",
                "year": 2020
            }]
        })
    })
})

describe("GET /books/:isbn", function () {

    beforeEach(async function () {
        await request(app)
            .post("/books")
            .send({
                "isbn": "Testing",
                "amazon_url": "amazon.com",
                "author": "Test",
                "language": "English",
                "pages": 118,
                "publisher": "Cannon",
                "title": "Title_Test",
                "year": 2020
            });
    });

    test("Get a single book", async function () {
        const res = await request(app)
            .get("/books/Testing")

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            "book": {
                "isbn": "Testing",
                "amazon_url": "amazon.com",
                "author": "Test",
                "language": "English",
                "pages": 118,
                "publisher": "Cannon",
                "title": "Title_Test",
                "year": 2020
            }
        })
    })
})

describe("PUT /books/:isbn", function () {

    beforeEach(async function () {
        await request(app)
            .post("/books")
            .send({
                "isbn": "Testing",
                "amazon_url": "amazon.com",
                "author": "Test",
                "language": "English",
                "pages": 118,
                "publisher": "Cannon",
                "title": "Title_Test",
                "year": 2020
            });
    });

    test("Update a book", async function () {
        const res = await request(app)
            .put("/books/Testing")
            .send({
                "isbn": "Testing",
                "amazon_url": "amazon.com",
                "author": "Testing PUT",
                "language": "English",
                "pages": 118,
                "publisher": "Cannon",
                "title": "Title_Test_PUT",
                "year": 2020
            })

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            "book": {
                "isbn": "Testing",
                "amazon_url": "amazon.com",
                "author": "Testing PUT",
                "language": "English",
                "pages": 118,
                "publisher": "Cannon",
                "title": "Title_Test_PUT",
                "year": 2020
            }
        })
    })
})

describe("DELETE /books/:isbn", function () {

    beforeEach(async function () {
        await request(app)
            .post("/books")
            .send({
                "isbn": "Testing",
                "amazon_url": "amazon.com",
                "author": "Test",
                "language": "English",
                "pages": 118,
                "publisher": "Cannon",
                "title": "Title_Test",
                "year": 2020
            });
    });

    test("Delete a book", async function () {
        const res = await request(app)
            .delete("/books/Testing")

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ "message": "Book deleted" })
    })
})