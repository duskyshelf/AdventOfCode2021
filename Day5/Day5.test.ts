import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { process, mapToCoords } from './Day5.ts'

Deno.test("mapToCoords horizontal",
  async () => {
    const coords = await mapToCoords('1,2 -> 1,4')
    assertEquals(coords, ['1,2', '1,3', '1,4']);
  },
);
Deno.test("mapToCoords verticle",
  async () => {
    const coords = await mapToCoords('3,2 -> 5,2')
    assertEquals(coords, ['3,2', '4,2', '5,2']);
  },
);
Deno.test("mapToCoords other",
  async () => {
    const coords = await mapToCoords('3,3 -> 5,2')
    assertEquals(coords, []);
  },
);
Deno.test("mapToCoords upSlope",
  async () => {
    const coords = await mapToCoords('7,7 -> 5,5', true)
    assertEquals(coords, ['5,5','6,6','7,7']);
  },
);
Deno.test("mapToCoords downSlope",
  async () => {
    const coords = await mapToCoords('3,5 -> 1,3', true)
    assertEquals(coords, ['3,5','2,4','1,3']);
  },
);

Deno.test("part 1",
  async () => {
    const points = await process('/Day5/mock.txt')
    assertEquals(points, 5);
  },
);

Deno.test("part 2",
  async () => {
    const points = await process('/Day5/mock.txt', true)
    assertEquals(points, 12);
  },
);
