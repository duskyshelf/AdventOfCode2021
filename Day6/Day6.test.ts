import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { process } from './Day6.ts'

Deno.test("part 1 example",
  async () => {
    const fish = await process('/Day6/mock.txt')
    assertEquals(fish, 5934);
  },
);

Deno.test("part 2 example",
  async () => {
    const fish = await process('/Day6/mock.txt', 256)
    assertEquals(fish, 26984457539);
  },
);

