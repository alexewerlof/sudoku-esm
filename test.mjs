async function runTests(...fileNames) {
  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i]
    const mod = await import(fileName)
    mod.default.forEach(fn => {
      console.log(`Running ${fileName}:${fn.name}`)
      fn()
      console.log(`${fileName}:${fn.name} finished!`)
    })
  }
}

runTests(
  './lib/board.spec.mjs',
  './lib/checker.spec.mjs',
  './lib/solver.spec.mjs',
  './lib/utils.spec.mjs',
).then(console.log, console.error)
