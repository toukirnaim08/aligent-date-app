const request = require("supertest");
const app = require("../app");

// Test transfer
test("1", () => {
    expect(true);
    const url = "/aligent-date/comparison";
    const body = {
        start_date: "2021-05-23",
        end_date: "2021-06-23",
    };

    return request(app)
        .post(url)
        .send(body)
        .then(response => {
            // Validate if we have valid response
            expect(response.statusCode).toBe(200);
        });
});


// Test transfer
test("2", () => {
    expect(true);
    const url = "/aligent-date/comparison";
    const body = {
        start_date: "2021-05-2322", // Dodogy date
        end_date: "2021-06-23",
    };

    return request(app)
        .post(url)
        .send(body)
        .then(response => {
            // Validate if we have valid response
            expect(response.statusCode).toBe(400);

			expect(response.body.result).toBe(null);
            expect(response.body.error).toBe('instance.start_date does not meet maximum length of 10');
        });
});


// Test transfer
test("3", () => {
    expect(true);
    const url = "/aligent-date/comparison";
    const body = {
        // Start date missing
        end_date: "2021-06-23",
    };

    return request(app)
        .post(url)
        .send(body)
        .then(response => {
            // Validate if we have valid response
            expect(response.statusCode).toBe(400);

			expect(response.body.result).toBe(null);
            expect(response.body.error).toBe('instance requires property "start_date"');
        });
});


// Test transfer
test("4", () => {
    expect(true);
    const url = "/aligent-date/comparison";
    const body = {
        start_date: 11, // Dodogy date
        end_date: "2021-06-23",
    };

    return request(app)
        .post(url)
        .send(body)
        .then(response => {
            // Validate if we have valid response
            expect(response.statusCode).toBe(400);

			expect(response.body.result).toBe(null);
            expect(response.body.error).toBe('instance.start_date is not of a type(s) string');
        });
});
