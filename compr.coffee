findFirstNames = (data, lastNameLength) ->
  obj.firstName for obj in data when obj.lastName.length is lastNameLength

data = [
  {firstName: 'Bill', lastName: 'Gates'},
  {firstName: 'Steve', lastName: 'Jobs'},
  {firstName: 'Brendan', lastName: 'Eich'},
  {firstName: 'Yukihiro', lastName: 'Matsumoto'},
  {firstName: 'Jeremy', lastName: 'Ashkenas'}
]
console.log(findFirstNames(data, 4))
