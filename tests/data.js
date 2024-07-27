import { readFile } from "node:fs/promises"

export const code = await readFile('tests/sample.ui', { encoding: 'utf-8' })

export const code2 = await readFile('tests/sample2.ui', { encoding: 'utf-8' })
