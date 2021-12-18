import fsAsync from "fs/promises";
import path from "path";
import { range, zip } from "ramda";
import { generateJavaScript } from "./generator";
import { parseSmall } from "./parser";

export async function run() {
  try {
    const input = process.argv[2];
    const { dir, name } = path.parse(input);

    // Parse 'small' source code
    const smallInput = await fsAsync.readFile(input, { encoding: "utf-8" });
    const results = await parseSmall(smallInput);

    for (const [i, ast] of zip(range(1, 5), results)) {
      await fsAsync.writeFile(`${dir}/ast/ast${i}.json`, jsonParse(ast));
    }

    console.assert(
      results.length === 1,
      `AST Results: ${results.length}\nThe grammar is ambiguous`
    );

    const ast = results[0];

    try {
      // Transpile Small to JavaScript
      const jsOutput = await generateJavaScript(ast);
      await fsAsync.writeFile(`${dir}/${name}.js`, jsOutput);
    } catch (e) {
      throw e;
    }
  } catch (e) {
    throw e;
  }
}
run();

function jsonParse(obj: unknown) {
  return JSON.stringify(obj, null, 2);
}
