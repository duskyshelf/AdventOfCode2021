import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { process, process2 } from './Day3.ts'

Deno.test("part 1",
  async () => {
    const consumption = await process('/Day3/mock.txt')
    assertEquals(consumption, 198);
  },
);
Deno.test("part 2",
  async () => {
    const consumption = await process2('/Day3/mock.txt')
    assertEquals(consumption, 230);
  },
);