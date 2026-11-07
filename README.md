# Stride Outfitters

A fictional trail footwear shop. Compare shoes by terrain, select an EU size, and add or remove pairs from a local trail pack. The pack shows the quantity and subtotal and resets on reload.

Open `index.html` in a browser. The app needs no build step, account, or network connection. It does not accept orders or payments.

The footwear, copy, layout, SVG illustration, and implementation were created independently for this demo. The broad idea of a footwear storefront comes from [YildizDikme/Nike-Clone-React-Project](https://github.com/YildizDikme/Nike-Clone-React-Project).

## Local server and agent connection

Install Node 22 or newer and Git. From this repository run:

```sh
npm ci
npm start
```

Open the loopback URL printed by the command. The runtime is pinned to a specific revision of [Project Agent Bridge](https://github.com/Mert-Oezdemir/project-agent-bridge).

To connect an MCP-compatible agent, run `npm run mcp:config --silent` and add its `mcpServers` entry to your host. Run `npm run doctor` to see local project and account configuration.

Chrome or Edge is needed for agent browser controls. You can set `CHROME` in `.env`, or run `npx playwright install chromium` to install a browser.

Copy `.env.example` to `.env` before adding account settings. Keep `.env` local. Restart the runtime after changing it.
