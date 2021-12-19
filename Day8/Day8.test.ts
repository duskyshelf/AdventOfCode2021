import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { process, process2, calculateLine } from './Day8.ts'

Deno.test("part 1 example",
  async () => {
    const numbers = await process('/Day8/mock.txt')
    assertEquals(numbers, 26);
  },
);

Deno.test("line calculator",
  async () => {
    const value = await calculateLine('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf')
    assertEquals(value, 5353);
  },
);

Deno.test("part 2 example",
  async () => {
    const sum = await process2('/Day8/mock.txt')
    assertEquals(sum, 61229);
  },
);
