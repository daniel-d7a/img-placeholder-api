import supertest from "supertest";

import { app } from "../index";

const server = supertest(app);

describe("testing api end point function", () => {
	it("tests for getting status code 200 for a correct url", async () => {
		server.get("/images?name=fjord&width=400&height=300").expect(200);
	});
});
