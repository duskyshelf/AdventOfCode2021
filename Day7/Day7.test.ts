import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { process, process2 } from './Day7.ts'

Deno.test("part 1 example",
  async () => {
    const fuelCost = await process('/Day7/mock.txt')
    assertEquals(fuelCost, 37);
  },
);
Deno.test("part 2 example",
  async () => {
    const fuelCost = await process2('/Day7/mock.txt')
    assertEquals(fuelCost, 168);
  },
);
