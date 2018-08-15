function getTestFunctionsFromModule(mod) {
  const testFunctions = []
  for (const propName in mod) {
    const prop = mod[propName]
    if (typeof prop === 'function' && !propName.endsWith('x')) {
      testFunctions.push(prop)
    } 
  }
  return testFunctions
}

async function runTestFiles(...fileNames) {
  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i]
    console.log(`Suit: ${fileName}`)
    const mod = await import(fileName)
    const testFunctions = getTestFunctionsFromModule(mod)
    for (let i = 0; i < testFunctions.length; i++) {
      const testFunction = testFunctions[i]
      console.log(`  ${testFunction.name}()`)
      await testFunction()
    }
  }
  return `all tests ran successfully!`
}

runTestFiles(
  './lib/utils.spec.mjs',
  './lib/checker.spec.mjs',
  './lib/board.spec.mjs',
  './lib/solver.spec.mjs',
).then(console.log, console.error)
