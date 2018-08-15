# Install

1. Clone it `git@github.com:userpixel/sudoku.git`
2. Install NPM dependencies `npm i`
3. Run `npm start` to see 3 solutions to a sample board

# Debug in VS Code

Batteries included. Just press <kbd>F5</kbd>

# Inspect in the browser

1. Run: `$ npm run inspect`
2. Open `about:inspect` in Chrome
3. Click on the Node that's waiting to be inspected

# Check performance

1. Run: `$ npm run perf`
2. It'll find 100K answers to a partial board 3 times (without printing the solutions)
3. You'll see the times for these 3 computations

# Find bottlenecks

1. Run: `$ npm run inspect`
2. On chrome open [about://inspect](about://inspect)
3. Click `inspect` on the instance that is waiting to open Chrome DevTools
4. In the **Profiler** tab press **Start**
5. Click **Stop** after a few seconds
6. Investigate stats in the **Profiler** tab