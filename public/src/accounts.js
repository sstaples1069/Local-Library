function findAccountById(accounts=[], id="") {
  return accounts.find((accountObj)=> accountObj.id === id)
}

function sortAccountsByLastName(accounts=[]) {
  return accounts.sort((accountObjA, accountObjB)=> accountObjA.name.last < accountObjB.name.last ? -1 : 1
  )
}

function getTotalNumberOfBorrows(account={}, books=[]) {
  // need to identify borrower's id
  const {id} = account;
  // can reduce books to count all times id found?
  // create a counter
  //reduce - put in callback function: (()=>{},0)<-init value
  let total = books.reduce((acc,bookObj)=>{
    const {borrows} = bookObj
    const filtered = borrows.filter(borrow => {
      return borrow.id===id      
    });
    acc += filtered.length;
    return acc
  },0)
  return total
}

function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
  const {findAuthorById} = require("./books.js"); 
  const {id} = account;
  //as it runs through books if  add to result
  // can use reduce by finding id in books.borrows.id === id && !books.borrows.returned
  // need to embed author info
  const inPossession = books.reduce((acc,bookObj)=>{
    const {borrows} = bookObj;
    // what if 1st idex isnt always the key needed??
    // when i use [borrows].id or borrows.id i get back an empty array!!
    if(borrows[0].id === id && !borrows[0].returned) {
      acc.push(bookObj);
    }
    return acc
  },[])
  console.log(inPossession)
  let result = inPossession.map((bookObj)=>{
    const {id,title,genre,authorId} = bookObj
    const matchingAuthor = findAuthorById(authors, bookObj.authorId);
    const obj = {
      id,
      title,
      genre,
      authorId,
      author: matchingAuthor,
      ...bookObj
    }
    return obj
  })
  console.log(result);
  return result
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
