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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookToLibrary(theHobbit);

////////////////////////
const overlay = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const buttonClose = document.querySelector(".button__close");
const cardFirst = document.querySelector(".card__first");
const form = document.querySelector(".form");
let formTitle = document.querySelector(".form__title");
let formAuthor = document.querySelector(".form__author");
let formPages = document.querySelector(".form__pages");
let formRead = document.querySelector(".form__read").checked;
// const editButtons = document.querySelectorAll(".card__edit");
// const deleteButtons = document.querySelectorAll(".card__delete");
const container = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", (e) => {
  myLibrary.forEach((book) => {
    initialBookLoad(book);
  });
});

// container.addEventListener("click", (e) => {
//   console.log(e.target);
//   if (e.target.matches(".card__edit")) {
//     console.log("Hio!");
//   } else if (e.target.matches(".card__delete")) {
//     console.log("Del!");
//   }
// });

container.addEventListener("click", (e) => {
  let target = e.target.closest(".card__edit");
  if (target) {
    console.log("Hio!");
  } else {
    target = e.target.closest(".card__delete");
    if (target) {
      console.log("Del!");
    }
  }
});

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
  formTitle.focus();
});

// forms
form.addEventListener("submit", (e) => {
  e.preventDefault();
  updateFormValues();

  myLibrary.push(
    new Book(formTitle.value, formAuthor.value, formPages.value, formRead)
  );

  addBookToView(myLibrary);
  clearFormValues();
  overlay.classList.toggle("closed");
});

function clearFormValues() {
  formTitle.value = "";
  formAuthor.value = "";
  formPages.value = "";
  document.querySelector(".form__read").checked = false;
}

function updateFormValues() {
  formTitle = document.querySelector(".form__title");
  formAuthor = document.querySelector(".form__author");
  formPages = document.querySelector(".form__pages");
  formRead = document.querySelector(".form__read").checked;
}

function addBookToView(bookList) {
  const book = bookList[bookList.length - 1];

  // Add book by using Card HTML
  const newElementHTML = `
  <div class="card">
          <div class="card__heading">
            <h2>${book.title}</h2>
            <div class="card__heading--icons">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#333333" viewBox="0 0 256 256" class="card__edit">
                <rect width="256" height="256" fill="none"></rect>
                <path
                  d="M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z"
                  fill="none" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
                <line x1="136" y1="64" x2="192" y2="120" fill="none" stroke="#333333" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="16"></line>
                <polyline points="216 216 96 216 40.5 160.5" fill="none" stroke="#333333" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="16"></polyline>
                <line x1="164" y1="92" x2="68" y2="188" fill="none" stroke="#333333" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="16"></line>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#333333" viewBox="0 0 256 256" class="card__delete">
                <rect width="256" height="256" fill="none"></rect>
                <line x1="216" y1="56" x2="40" y2="56" fill="none" stroke="#333333" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="16"></line>
                <line x1="104" y1="104" x2="104" y2="168" fill="none" stroke="#333333" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="16"></line>
                <line x1="152" y1="104" x2="152" y2="168" fill="none" stroke="#333333" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="16"></line>
                <path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="#333333"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
                <path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="#333333"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
              </svg>
            </div>
          </div>
          <p>Author: ${book.author}</p>
          <p>${book.pages} ${book.pages > 1 ? "pages" : "page"}</p>
          <p>${book.read ? "✅Finished reading" : "🟡Currently reading"}</p>
        </div>
  `;
  // insert card HTML
  cardFirst.insertAdjacentHTML("afterend", newElementHTML);
}

function initialBookLoad(book) {
  const newElementHTML = `
  <div class="card">
          <div class="card__heading">
            <h2>${book.title}</h2>
            <div class="card__heading--icons">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#333333" viewBox="0 0 256 256" class="card__edit">
                <rect width="256" height="256" fill="none"></rect>
                <path
                  d="M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z"
                  fill="none" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
                <line x1="136" y1="64" x2="192" y2="120" fill="none" stroke="#333333" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="16"></line>
                <polyline points="216 216 96 216 40.5 160.5" fill="none" stroke="#333333" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="16"></polyline>
                <line x1="164" y1="92" x2="68" y2="188" fill="none" stroke="#333333" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="16"></line>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#333333" viewBox="0 0 256 256" class="card__delete">
                <rect width="256" height="256" fill="none"></rect>
                <line x1="216" y1="56" x2="40" y2="56" fill="none" stroke="#333333" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="16"></line>
                <line x1="104" y1="104" x2="104" y2="168" fill="none" stroke="#333333" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="16"></line>
                <line x1="152" y1="104" x2="152" y2="168" fill="none" stroke="#333333" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="16"></line>
                <path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="#333333"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
                <path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="#333333"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
              </svg>
            </div>
          </div>
          <p>Author: ${book.author}</p>
          <p>${book.pages} ${book.pages > 1 ? "pages" : "page"}</p>
          <p>${book.read ? "✅Finished reading" : "🟡Currently reading"}</p>
        </div>
  `;
  // insert card HTML
  cardFirst.insertAdjacentHTML("afterend", newElementHTML);
}

// let myLibrary = [];

// Remove book
