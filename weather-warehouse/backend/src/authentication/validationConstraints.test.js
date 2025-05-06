import validate from "validate.js";
import { userRegisterConstraints } from "./validationConstraints";

describe("userRegisterConstraints", () => {
  it("should pass validation for valid input", () => {
    const validInput = {
      username: "validUser",
      password: "Valid123",
      securityQuestion: "What is your pet's name?",
      securityAnswer: "Fluffy"
    };
    const result = validate(validInput, userRegisterConstraints);
    expect(result).toBeUndefined(); // No errors
  });

  it("should fail validation if username is too short", () => {
    const invalidInput = {
      username: "ab",
      password: "Valid123",
      securityQuestion: "What is your pet's name?",
      securityAnswer: "Fluffy"
    };
    const result = validate(invalidInput, userRegisterConstraints);
    expect(result).toHaveProperty("username");
  });

  it("should fail validation if password does not meet format requirements", () => {
    const invalidInput = {
      username: "validUser",
      password: "password",
      securityQuestion: "What is your pet's name?",
      securityAnswer: "Fluffy"
    };
    const result = validate(invalidInput, userRegisterConstraints);
    expect(result).toHaveProperty("password");
  });

  it("should fail validation if securityQuestion is missing", () => {
    const invalidInput = {
      username: "validUser",
      password: "Valid123",
      securityAnswer: "Fluffy"
    };
    const result = validate(invalidInput, userRegisterConstraints);
    expect(result).toHaveProperty("securityQuestion");
  });

  it("should fail validation if securityAnswer is missing", () => {
    const invalidInput = {
      username: "validUser",
      password: "Valid123",
      securityQuestion: "What is your pet's name?"
    };
    const result = validate(invalidInput, userRegisterConstraints);
    expect(result).toHaveProperty("securityAnswer");
  });
});