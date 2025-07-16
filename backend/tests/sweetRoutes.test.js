// tests/sweet.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const Sweet = require("../models/Sweet");

beforeAll(async() => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterEach(async() => {
    await Sweet.deleteMany({});
});

afterAll(async() => {
    await mongoose.connection.close();
});

describe("Sweet Shop Management API", () => {
    it("should add a new sweet", async() => {
        const sweetData = { name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 20 };
        const res = await request(app).post("/api/sweets").send(sweetData);
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("Kaju Katli");
    });
    it("should get all sweets", async() => {
        await Sweet.create({ name: "Gulab Jamun", category: "Milk", price: 10, quantity: 30 });
        const res = await request(app).get("/api/sweets");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});