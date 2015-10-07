fs = require 'fs'

mkdirp = (directories...)->
  path = ""
  for dir in directories
    path += "#{dir}/"
    console.log path
    fs.mkdirSync(path) if not fs.existsSync(path)
