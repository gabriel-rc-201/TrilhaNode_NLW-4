import req from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";

import createConnection from "../database";

describe("Surveys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new survey", async () => {
    const res = await req(app).post("/surveys").send({
      title: "Title Exemple",
      description: "Description Exemple",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should be able to get all surveys", async () => {
    await req(app).post("/surveys").send({
      title: "Title Exemple2",
      description: "Description Exemple2",
    });

    const res = await req(app).get("/surveys");

    expect(res.body.length).toBe(2);
  });
});
