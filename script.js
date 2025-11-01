
const myLibrary=[];
//book object constructor
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
     if(isRead=='1')
         isRead=true;
    else if(isRead=='0')
         isRead=false;
    const book=new Book(title,author,numberOfPages,isRead);
    myLibrary.push(book);
}
//display book from library array
const bookContainer=document.querySelector('.book-container');
function displayBox(){
    let n = myLibrary.length - 1;
    let box_id=myLibrary[n].id;

  const book=document.createElement('div');
  book.setAttribute('data-id',box_id);
  book.classList.add('book');

 const para_title=document.createElement('p');
 para_title.innerText=`Title: ${myLibrary[n].title}`;

  const para_author=document.createElement('p');
 para_author.innerText=`Author: ${myLibrary[n].author}`;
 const para_pages=document.createElement('p');
 para_pages.innerText=`Pages: ${myLibrary[n].numberOfPages}`;

const bottomContainer=document.createElement('div');
bottomContainer.classList.add('bottom-container');

const para_status=document.createElement('p');
para_status.classList.add('status-icon',box_id);
if(myLibrary[n].isRead)
  para_status.innerText = `✅`;
else
  para_status.innerText = `❌`;

const button_status=document.createElement('button');
button_status.setAttribute('data-status',box_id);
button_status.classList.add('status-btn')
button_status.innerText=`Change Read Status`;

const remove_button=document.createElement('button');
remove_button.classList.add('remove-btn');
remove_button.innerText=`X`;
remove_button.classList.add('remove-btn');
remove_button.id=box_id;

bottomContainer.append(para_status,button_status,remove_button);
book.append(para_title,para_author,para_pages,bottomContainer);
bookContainer.appendChild(book);
}

//Even listeners
const openButton=document.querySelector('#form-open');
const formContainer=document.querySelector('.form-container');
//open form
openButton.addEventListener('click',(e)=>{
  formContainer.showModal();
})
//cancel form
const cancelButton=document.querySelector('#cancel');
cancelButton.addEventListener('click',(e)=>{
  formContainer.close()
})
//add new book
const addButton=document.querySelector('#add');
const authorInput=document.querySelector('#author');
const titleInput=document.querySelector('#title');
const numberOfPagesInput=document.querySelector('#no-of-pages');
  function clearInputBox(){
    authorInput.value='';
    titleInput.value='';
    numberOfPagesInput.value='';
  }
addButton.addEventListener('click',(e)=>{
  e.preventDefault();
   if(
    authorInput.value.trim()==''||
    titleInput.value.trim()==''||
    +(numberOfPagesInput.value)<=0
  )
     return 1;
 const isReadInput = document.querySelector('input[type="radio"]:checked');
 addBookTtoLibrary(titleInput.value,authorInput.value,+(numberOfPagesInput.value),isReadInput.value);
 displayBox();
  formContainer.close();
  clearInputBox();
})
//change read status and remove book from library
function changeReadStatus(bookId){
 let targetBook=myLibrary.find(book=>book.id==bookId);
 let status_icons=document.querySelectorAll('.status-icon');
 let targetIcon;
status_icons.forEach(icon=>{
  if(icon.classList.contains(bookId))
    targetIcon=icon;
})
if(targetBook.isRead){
  targetIcon.innerText = `❌`;
  targetBook.isRead=false;
}
else{
  targetIcon.innerText = `✅`;
  targetBook.isRead=true;
}
}

function removeBook(bookId){
    const book=document.querySelector(`[data-id="${bookId}"]`);
   bookContainer.removeChild(book);
}
bookContainer.addEventListener('click',(e)=>{
  //read status listener
  if(e.target.classList.contains('status-btn'))
   changeReadStatus(e.target.dataset.status);
  //remove book listener
  if(e.target.classList.contains('remove-btn'))
    removeBook(e.target.id);
  
})
//return to page listener

formContainer.addEventListener('click',(e)=>{
  let dialogDimension=formContainer.getBoundingClientRect();
   if(
    e.clientX<dialogDimension.left||
    e.clientX>dialogDimension.right||
    e.clientY<dialogDimension.top||
    e.clientY>dialogDimension.bottom
  )
   formContainer.close();
})