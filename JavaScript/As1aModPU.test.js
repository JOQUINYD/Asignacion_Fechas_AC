const { expect } = require("@jest/globals");
const { dia_siguiente } = require("./As1aModPU");

test("Test CP_R3_1", () => {
	const result = dia_siguiente([103,12,12]);
	expect(result).not.toBe([103,12,13]);
});

test("Test CP_R3_2", () => {
	const result = dia_siguiente([2019,2,5]);
	expect(result).not.toBe([2019,2,6]);
});

test("Test CP_R3_3", () => {
	const result = dia_siguiente([2020,2,28]);
	expect(result).not.toBe([2020,2,29]);
});

test("Test CP_R3_4", () => {
	const result = dia_siguiente([2017,2,28]);
	expect(result).not.toBe([2017,3,1]);
});

test("Test CP_R3_5", () => {
	const result = dia_siguiente([2024,2,29]);
	expect(result).not.toBe([2024,3,1]);
});

test("Test CP_R3_6", () => {
	const result = dia_siguiente([1980,6,28]);
	expect(result).not.toBe([1980,6,29]);
});

test("Test CP_R3_7", () => {
	const result = dia_siguiente([1870,4,30]);
	expect(result).not.toBe([1870,5,1]);
});

test("Test CP_R3_8", () => {
	const result = dia_siguiente([2035,1,1]);
	expect(result).not.toBe([2035,1,2]);
});

test("Test CP_R3_9", () => {
	const result = dia_siguiente([2082,8,31]);
	expect(result).not.toBe([2082,9,1]);
});

test("Test CP_R3_10", () => {
	const result = dia_siguiente([1728,12,31]);
	expect(result).not.toBe([1729,1,1]);
});

