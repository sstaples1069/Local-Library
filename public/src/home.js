function getTotalBooksCount(books=[]) {
  return books.length
}

function getTotalAccountsCount(accounts=[]) {
  return accounts.length
}

function getBooksBorrowedCount(books=[]) {
  // import and require helper fxn from books.js
  // syntax is const {fxnName} = require("path to file")
  const {partitionBooksByBorrowedStatus} = require("./books.js");
  const [checkedOut] = partitionBooksByBorrowedStatus(books);
  // destructuring the array to return just the array inside the returned array that represents the checkedOut books
  return checkedOut.length
}

function getMostCommonGenres(books=[]) {
  // will need to create a "lookup" variable to store genres
  const lookup = {};
  // will need to look at each book at books.genre and do:
  books.forEach((bookObj)=>{
    // look at each bookObj for its genre
    const {genre} = bookObj
    // check lookup if already has genre
    // if !lookup[genre] -> same as saying if lookup at that genre(which is key name) does not exist
    // then create a key and set value to 1 -> lookup[genre] = 1
    // if it's already there, increment the value of the key -> lookup[genre]++
    // turned the above steps into ternary ->
    !lookup[genre] ? lookup[genre] = 1 : lookup[genre]++;
  })
  //then will need to create an array of objects
  let result = [];
  // create each object in key:value pair of lookup (for each in lookup(is an object) -> ForIn loop)
  for(let genre in lookup){
    const obj = {name: genre, count: lookup[genre]};
    // then push each object to result array
    result.push(obj)
  }
  // sort result array in desceding order (most popular would have highest value) -> .sort descending=B-A  dont forget the .count!!!!!
  // result.sort((genreA,genreB)=>{
  //   return genreB.count - genreA.count
  // })
  // // return the result array with just top(first) 5 answers 
  // return result.slice(0,5)
  //refactored: 
  return result.sort((genreA,genreB)=> genreB.count - genreA.count).slice(0,5)
}

// function getMostPopularBooks(books=[]) {
//   let result = [];
//   books.forEach(({title, borrows})=>{
//       const obj = {name:title, count:borrows.length};
//       result.push(obj)
//     })
//   return result.sort((bookA,bookB)=> bookB.count - bookA.count ).slice(0,5)
// }

//same amount of lines but below is more effiecient
function getMostPopularBooks(books=[]) {
  books.sort((bookA,bookB)=> bookB.borrows.length - bookA.borrows.length)
  const result = books.slice(0,5).map(({title, borrows})=>{
      let popularBooks = {name:title, count:borrows.length};
      return popularBooks
    })
  return result
}


function getMostPopularAuthors(books=[], authors=[]) {
  let result = [];
  authors.forEach(({id, name})=>{
    const total = books.reduce((acc,{authorId,borrows})=>{
      if(id === authorId) acc+=borrows.length;
      return acc
    },0)
    const fullName = `${name.first} ${name.last}`;
    const obj = {name:fullName, count:total};
    result.push(obj)
  })
  return result.sort((authorA,authorB)=> authorB.count - authorA.count).slice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
