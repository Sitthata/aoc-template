import * as fs from "fs";
import * as path from "path";

const readInput = (filePath: string): string[] => {
  return fs
    .readFileSync(path.join(__dirname, filePath), "utf-8")
    .toString()
    .split("\n")
    .map((str: string) => str.replace("\r", ""));
};

export default readInput;
