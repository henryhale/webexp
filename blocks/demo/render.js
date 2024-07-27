import { writeFile } from "node:fs/promises"
import { parse, render, initTemplates } from "../dist/index.js";
import { code2 as data } from "./data.js";

const tree = parse(data)

initTemplates()

const html = render(tree)

console.log(html)

await writeFile('tests/sample2.html', html)

console.log('\nSaved: tests/sample2.html')