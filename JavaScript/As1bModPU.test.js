const { expect } = require("@jest/globals");
const { dias_entre } = require("./As1bModPU");

test("Test CP_R9_1", () => {
	const result = dias_entre([2021, 15, 12], [2021, 11, 15]);
	expect(result).toBeNaN();
});

test("Test CP_R9_2", () => {
	const result = dias_entre([2021, 11, 12], [1420, 12, 10]);
	expect(result).not.toBe(219474);
});

test("Test CP_R9_3", () => {
	const result = dias_entre([2001, 12, 15], [2001, 12, 15]);
	expect(result).toBe(0);
});

test("Test CP_R9_4", () => {
	const result = dias_entre([2021, 11, 14], [2001, 12, 15]);
	expect(result).toBe(7274);
});

test("Test CP_R9_5", () => {
	const result = dias_entre([2021, 1, 15], [2021, 2, 20]);
	expect(result).toBe(36);
});
