import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { process, scoreLine, process2 } from './Day10.ts'

Deno.test("scoreLine",
  async () => {
    const score = await scoreLine('{([(<{}[<>[]}>{[]{[(<()>')
    assertEquals(score, 1197);
  },
);

Deno.test("part 1 example",
  async () => {
    const score = await process('/Day10/mock.txt')
    assertEquals(score, 26397);
  },
);

Deno.test("part 2 example",
  async () => {
    const score = await process2('/Day10/mock.txt')
    assertEquals(score, 288957);
  },
);