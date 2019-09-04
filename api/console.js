import repl from 'repl'
import db from './server/src/models'

Object.keys(db).forEach(modelName => {
  global[modelName] = db[modelName]
})

let replServer = repl.start({
  terminal: true,
  prompt: 'app > '
})

replServer.context.db = db