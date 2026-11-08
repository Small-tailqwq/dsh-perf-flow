#!/usr/bin/env node
/**
 * flow.css is the source; client.js ships it as an inline string because the
 * client entry is loaded without a build step. Rewrites that string, or with
 * `--check` exits non-zero when the two have drifted.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const root = new URL('..', import.meta.url)
const css = readFileSync(new URL('flow.css', root), 'utf8').replace(/\r\n/g, '\n')
const clientUrl = new URL('client.js', root)
const client = readFileSync(clientUrl, 'utf8')

const pattern = /^(\s*const CSS = )(".*")$/m
const match = client.match(pattern)
if (match === null) {
  console.error('client.js: `const CSS = "..."` line not found')
  process.exit(2)
}

const expected = JSON.stringify(css)
if (match[2] === expected) {
  console.log('client.js CSS is in sync with flow.css')
  process.exit(0)
}
if (process.argv.includes('--check')) {
  console.error('client.js CSS differs from flow.css; run `npm run sync-css`')
  process.exit(1)
}
writeFileSync(clientUrl, client.replace(pattern, (_, head) => head + expected))
console.log('client.js CSS updated from flow.css')
