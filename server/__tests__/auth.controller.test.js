import { jest } from "@jest/globals";

// mocks
jest.unstable_mockModule("bcryptjs", () => ({
    default: {
        hash: jest.fn(),
        compare: jest.fn()
    }
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
    default: {
        sign: jest.fn()
    }
}));

jest.unstable_mockModule()