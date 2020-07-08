process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");

describe("Book Routes Test", function () {
    beforeEach(async function () {
        await db.query("DELETE FROM books");
    });
    done();
});

describe("POST /books", function () {
    test("Creates new book", async function () {
        const res = await request(app)
            .post("/books")
            .send({
                "isbn": "aosdigf",
                "amazon_url": "amazon.com",
                "author": "Seth2",
                "language": "English",
                "pages": 118,
                "publisher": "Cannon",
                "title": "Lafollette2",
                "year": 2020
            });
        done();

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            "book": {
                "isbn": "aosdigf",
                "amazon_url": "amazon.com",
                "author": "Seth2",
                "language": "English",
                "pages": 118,
                "publisher": "Cannon",
                "title": "Lafollette2",
                "year": 2020
            }
        })
    })
})