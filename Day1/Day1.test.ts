import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { process, process2 } from './Day1.ts'

Deno.test("part 1 example",
  async () => {
    const increases = await process('/Day1/mock.txt')
    assertEquals(increases, 7);
  },
);
Deno.test("part 2 example",
  async () => {
    const increases = await process2('/Day1/mock.txt')
    assertEquals(increases, 5);
  },
);