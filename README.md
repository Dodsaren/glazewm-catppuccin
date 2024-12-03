# Glazewm Catppuccin Zebar theme

Inofficial [Cattpuccin](https://github.com/catppuccin/catppuccin) theme for [Zebar](https://github.com/glzr-io/zebar) with [Glazewm](https://github.com/glzr-io/glazewm).

The theme's visuals is heavily inspired by [catppuccin/tmux](https://github.com/catppuccin/tmux).

## Installation

1. Clone the repo.
2. Install dependencies

```sh
pnpm install
```

3. Build your flavour of choice

powershell

```powershell
$env:THEME="mocha"; pnpm run build
```

bash

```sh
THEME=mocha pnpm run build
```

cmd

```cmd
set THEME=mocha && pnpm run build
```

4. Copy the newly built `dist` folder and the `glazewm-catppuccin.zebar.json` into your `.glzr/zebar` directory, for example:

```
Users/<my-user>/.glzr/zebar/glazewm-catppuccin
|--dist/
|--glazewm-catppuccin.zebar.json
```

5. Point you zebar settings startupConfigs to the json to set as default theme.

zebar/settings.json

```
{
  "$schema": "https://github.com/glzr-io/zebar/raw/v2.1.0/resources/settings-schema.json",
  "startupConfigs": ["glazewm-catppuccin/glazewm-catppuccin.zebar.json"]
}
```
