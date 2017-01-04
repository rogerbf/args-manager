# args-manager

Manage arguments used in `.spawn()`, `.execFile()` and their siblings.

## usage

```javascript
import createManager from 'args-manager'

const args = createManager()

args.add({ SocksPort: 9050 })
args.add({ Name: `Two Forks` })
args.add(`--start`)

args()
// [`SocksPort`, 9050, `Name`, `Two Forks`, `--start`]

args.clear()
args()
// []
```

## options

```javascript
const args = createManager({
  args: [`SocksPort`, 9050, { Lookout: `Thorofare` }],
  validArgs: (
    fs.execFileSync(`tor`, [`--list-torrc-options`])
    .trim()
    .split(`\n`)
  ),
  build: (args) => args,
  validate: (validArgs, arg) => {
    if (typeof (arg) === `string`) {
      return arg
    } else {
      throw new Error(`expected arg to be a string`)
    }
  }
})
```
