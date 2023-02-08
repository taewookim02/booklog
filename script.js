let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read already" : "not read yet"
    }`;
  };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

function addBookToLibrary(book) {
  // Add Book object to myLibrary array
  myLibrary.push(book);
}

addBookToLibrary(theHobbit);

////////////////////////
const overlay = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const buttonClose = document.querySelector(".button__close");
const cardFirst = document.querySelector(".card__first");
const form = document.querySelector(".form");
const formTitle = document.querySelector(".form__title");

modalContent.addEventListener("click", (e) => {
  e.stopPropagation();
});

overlay.addEventListener("click", (e) => {
  overlay.classList.toggle("closed");
});

buttonClose.addEventListener("click", (e) => {
  overlay.classList.toggle("closed");
});

cardFirst.addEventListener("click", (e) => {
  overlay.classList.toggle("closed");
});

// forms
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(formTitle.value);
});

// Add book
