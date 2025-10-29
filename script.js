
const myLibrary=[];
//book object contructor
function Book(title,author,numberOfPages,isRead){
   if(!new.target){
    throw Error("You must use 'new' operator when you call object constructor");
   }
   this.title=title;
   this.author=author;
   this.numberOfPages=numberOfPages;
   this.isRead=isRead;
   this.id=crypto.randomUUID();
}

Book.prototype.info =function () {
  return `${this.title} by ${this.author}, ${this.numberOfPages},${
    this.isRead ? "already read" : "not read yet"
  } `;
};

//adds book to library
function addBookTtoLibrary(title,author,numberOfPages,isRead){
    const book=new Book(title,author,numberOfPages,isRead);
    myLibrary.push(book);
}
//display book from library array
function displayBook(){
    for(let book of myLibrary){
        book
    }
}

