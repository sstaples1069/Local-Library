function findAuthorById(authors, id) {
  return authors.find((authorObj)=> authorObj.id === id
  )
}

function findBookById(books, id) {
  return books.find((bookObj)=> bookObj.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  // create arrays to hold objs
  const checkedOut = [];
  const inStock = [];
  for(let bookObj of books) {
    // the dataset though will have the top entry false if any at all
    // does checking ONLY the first obj make sense? bookObj.borrows[0].returned
    // or do i want to use .some to identify if any match !returned 
    // push to checkedOut
    // otherwise push to inStock
    // ternary to push to the appropriate array
    !bookObj.borrows[0].returned ? checkedOut.push(bookObj) : inStock.push(bookObj)
    }
  // console.log(checkedOut, inStock);
  return [checkedOut, inStock]
  // feel like theres an advanced array method that could be used to refactor?
}

function getBorrowersForBook(book={}, accounts=[]) {
  // will need to find the bookObj.borrows.id in accounts
  const {borrows} = book;
  const result = borrows.map((borrower)=>{
    const { id, returned } = borrower;
    const matchingAccount = accounts.find((accountObj)=>{
      return accountObj.id === id
    })
    matchingAccount.returned = returned;
    return matchingAccount
  })
  // console.log(result.slice(0,10));
  return result.slice(0,10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
