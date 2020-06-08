# Typescript, NodeJS, Babel Starter

```bash
typescript@next
@babel/cli
@babel/core
@babel/node
@babel/preset-env
@babel/preset-typescript
```

Only when create js files, use babel-node to transpile

`pnpx babel src/index.js -d dist`

`pnpx node dist/index.js`

Here are the current options for compiling ts to js.

```json
{
    "compileOptions": {
        "incremental": true,
        "target": "ESNext",
        "module": "ESNext",
        "allowJs": true,
        "checkJs": true,
        "declaration": true,
        "outDir": "lib",
        "composite": true,
        "removeComments": true,
        "strict": true,
        "moduleResolution": "node",
        "types": ["node"],
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
    },
    "include": [
        "src/**/*.ts"
    ],
    "exlude": [
        "node_modules",
        "src/**/*.js"
    ]
}
```
