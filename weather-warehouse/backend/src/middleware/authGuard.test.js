const jwt = require("jsonwebtoken");
const authGuard = require("./authGuard");

describe("authGuard Middleware", () => {
  it("should return 401 if no authorization header is provided", () => {
    const req = { headers: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authGuard(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
  });

  it("should call next if a valid token is provided", () => {
    const token = jwt.sign({ userId: 1 }, "test-secret");
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    const next = jest.fn();

    process.env.JWT_SECRET = "test-secret";
    authGuard(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.payload).toEqual({ userId: 1, iat: expect.any(Number) });
  });
});