import request from "supertest";
import app from "../../app";
import { HTTPStatusCode } from "../../common/HTTPStatusCode";
import { CurrencyAttr } from "./currencies.model";

describe("CURRENCIES", () => {
	describe("GET /api/currencies", () => {
		it("should return an array of currencies", async () =>
			request(app)
				.get("/api/currencies")
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.expect(HTTPStatusCode.OK)
				.then((res) => {
					expect(res.body).toHaveProperty("length");
				}));
	});

	describe("POST /api/currencies", () => {
		const currency: CurrencyAttr = {
			country: "country",
			code: "NGN",
			symbol: "NGN",
		};
		it("should saves currency to db", async () =>
			request(app)
				.post("/api/currencies")
				.set("Accept", "application/json")
				.send(currency)
				.expect("Content-Type", /json/)
				.expect(HTTPStatusCode.OK)
				.then((res) => {
					expect(res.body).toHaveProperty("id");
					expect(res.body.code).toBe("NGN");
				}));
	});
});

// Attributes: Notification ID, User ID (recipient), Message, Timestamp, Status (Read/Unread), Type (Transaction, Account Update, etc.), etc.
// Relationships: Many-to-one with Users.

// Security Logs:
// Attributes: Log ID, User ID, Timestamp, Action (Login, Logout, Failed Attempt), IP Address, Device Info, etc.
// Relationships: Many-to-one with Users.

// Settings:
// Attributes: Setting ID, User ID, Preferences (Language, Notifications), etc.
// Relationships: One-to-one with Users.