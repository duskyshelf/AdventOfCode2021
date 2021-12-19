import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { process, process2 } from './Day9.ts'

Deno.test("part 1 example",
  async () => {
    const lowSum = await process('/Day9/mock.txt')
    assertEquals(lowSum, 15);
  },
);

Deno.test("part 2 example",
  async () => {
    const basinMult = await process2('/Day9/mock.txt')
    assertEquals(basinMult, 1134);
  },
);

