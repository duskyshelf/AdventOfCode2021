import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { process, process2, markBoard } from './Day4.ts'

Deno.test("part 1",
  async () => {
    const score = await process('/Day4/mock.txt')
    assertEquals(score, 4512);
  },
);

const horizontalWinner = [[1, 3], [2, 3], [3, 3], [4, 3], [0, 3]]
const horizontalLoser = [[1, 3], [2, 3], [3, 3], [4, 3], [4, 4]]
Deno.test("test board horizontal winner",
  async () => {
    assertEquals(markBoard(horizontalWinner), true);
  },
);
Deno.test("test board horizontal loser",
  async () => {
    assertEquals(markBoard(horizontalLoser), false);
  }
);

const verticalWinner = [[3, 1], [3, 3], [3, 2], [3, 4], [3, 0]]
const verticalLoser = [[1, 3], [2, 3], [3, 3]]
Deno.test("test board vertical winner",
  async () => {
    assertEquals(markBoard(verticalWinner), true);
  },
);
Deno.test("test board vertical loser",
  async () => {
    assertEquals(markBoard(verticalLoser), false);
  },
);

Deno.test("part 2",
  async () => {
    const score = await process2('/Day4/mock.txt')
    assertEquals(score, 1924);
  },
);