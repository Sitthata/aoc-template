import readInput from "./input/read-file";

type Colors = "red" | "green" | "blue";
type ColorCount = {
  [K in Colors]?: number;
};
type Game = {
  id: number;
  rounds: ColorCount[];
  isPossible: boolean;
};

const dataArray: string[] = readInput("data.txt");

const partOneSolution = (dataArray: string[]): number => {
  const structObject = (rawString: string): Game => {
    const game = rawString.match(/Game \d+/);
    const gameId = (game ?? "")[0].split(" ");
    const rounds = rawString
      .replace(/Game \d+:/, "")
      .split(";")
      .map((str) => str.trim());

    const roundToObject = (roundString: string) => {
      const round = roundString.split(",").map((round) => round.trim());

      const roundToBall = (instance: string) => {
        const [count, color] = instance.split(" ");
        return { [color]: parseInt(count) };
      };

      return round.reduce((acc, o) => {
        const ball = roundToBall(o);
        const color = Object.keys(ball)[0] as Colors;
        acc[color] = ball[color];
        return acc;
      }, {} as ColorCount);
    };

    const checkIfRoundPossible = (roundObj: ColorCount): boolean => {
      const { red = 0, blue = 0, green = 0 } = roundObj;
      return red <= 12 && green <= 13 && blue <= 14;
    };

    const roundObj = rounds.map((o) => roundToObject(o));
    const isPossible = roundObj.every(checkIfRoundPossible);

    return {
      id: parseInt(gameId[1]),
      rounds: roundObj,
      isPossible: isPossible,
    };
  };

  const gameRound = dataArray.map((o) => structObject(o));
  const gameToString = (game: Game) => {
    const { id, isPossible } = game;
    return `id: ${id}, isPossible: ${isPossible}`;
  };

  gameRound.forEach((game) => {
    console.log(gameToString(game));
  });

  const calculateSum = (arr: Game[]) => {
    return arr
      .filter((game) => game.isPossible)
      .reduce((acc, curr) => acc + curr.id, 0);
  };

  return calculateSum(gameRound);
};

console.log(`Part one answer is ${partOneSolution(dataArray)}`);
