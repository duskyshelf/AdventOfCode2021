import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { process, process2 } from './Day2.ts'

Deno.test("part 1",
  async () => {
    const distance = await process('/Day2/mock.txt')
    assertEquals(distance, 150);
  },
);
Deno.test("part 2",
  async () => {
    const distance = await process2('/Day2/mock.txt')
    assertEquals(distance, 900);
  },
);