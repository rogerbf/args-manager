# args-manager

Manage application arguments.

## usage

```javascript
import argsman from 'args-manager'

const args = argsman()
args.add({ SocksPort: 9050 })
args.add({ ControlPort: 9055 })
args.add(`--hush`)
args.build()
// [`SocksPort`, `9050`, `ControlPort`, `9055`, `--hush`]
```

## options

```javascript
const args = argsman({
  args: [`SocksPort`, `9050`],
  valid: [
    fs.execFileSync(`tor`, [`--list-torrc-options`])
      .trim().split(`\n`)
  ],
  builder: (args) => args // [`SocksPort`, `9050`]
})
```
