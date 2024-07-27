import { strict as assert }  from "node:assert"
import { writeFile } from "node:fs/promises"
import { parse } from "../dist/index.js"
import { code } from "./data.js";

const result = parse(code)

const recieved = JSON.stringify(result)

await writeFile('tests/sample.json', recieved)

const expected = '["","",["div","block",["h1","block",["@span","block"]],["h2","block",["$span","block"]],["h3","block",["span","block"]]],["p","block",["%span","block"]]]'

assert.strictEqual(recieved, expected)

console.log('PASS: it works')

