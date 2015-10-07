isSolved = (board) ->
  return 1 if hasWon(1, board)
  return 2 if hasWon(2, board)
  return 0 if boardIsFull(board)
  return -1

iterBoard = (board, type, f) ->
  switch type
    when 'row'
      for row in board
        return true if f(row)
      return false
    when 'col'
      for i in [0...board.length]
        col = (row[i] for row in board)
        return true if f(col)
      return false
    when 'dia'
      dia = (board[i][i] for i in [0...board.length])
      return true if f(dia)
      dia = (board[i][board.length-1-i] for i in [0...board.length])
      return true if f(dia)
      return false
    else false

countOcurrences = (arr, val) ->
  count = 0
  for i in arr
    count++ if i == val
  count

boardIsFull = (board)->
  for row in board
    if 0 in row
      return false
  return true

hasWon = (val, board) ->
  for type in ['row', 'col', 'dia']
    res = iterBoard board, type, ((arr)->
      return true if countOcurrences(arr, val) == 3
    )
    return res if res
  return false

console.log isSolved([[1,2,1],
                      [1,1,2],
                      [2,1,2]])
