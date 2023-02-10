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
const container = document.querySelector(".container");
const editButton = document.querySelector("button__edit");
let currentEditingIndex;
let dataIndex;

document.addEventListener("DOMContentLoaded", (e) => {
  myLibrary.forEach((book, i) => {
    initialBookLoad(book, i);
  });
});

container.addEventListener("click", (e) => {
  // e.target.closest("[data-index]")
  let target = e.target.closest(".card__edit");

  if (target) {
    editButtonHandler(target.closest("[data-index]"));
    // dataIndex = target.closest(".card").dataset.index;
    // console.log(dataIndex);
  }

  target = e.target.closest(".card__delete");
  if (target) {
    deleteButtonHandler(target.closest("[data-index]"));
    // dataIndex = target.closest(".card").dataset.index;
    // console.log(dataIndex);
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

// edit modal
document.addEventListener("click", (e) => {
  const target = e.target.closest(".button__edit");

  if (target) {
    const modal = e.target.closest(".modal");
    const title = modal.querySelector(".form__title").value;
    const author = modal.querySelector(".form__author").value;
    const pages = modal.querySelector(".form__pages").value;
    const read = modal.querySelector(".form__read").checked;

    // update myLibrary
    myLibrary[currentEditingIndex].title = title;
    myLibrary[currentEditingIndex].author = author;
    myLibrary[currentEditingIndex].pages = +pages;
    myLibrary[currentEditingIndex].read = read;

    // update view
    updateBookToView(title, author, pages, read, currentEditingIndex);

    // reset index
    currentEditingIndex = null;

    // close modal
    e.target.closest(".modal").classList.toggle("closed");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".modal__content")) {
    return e.stopPropagation();
  }
  if (e.target.closest(".modal") || e.target.closest(".button__close")) {
    e.target.closest(".modal").classList.toggle("closed");
  }
});

function editButtonHandler(cardDiv) {
  // get index
  const index = cardDiv.dataset.index;
  const listItem = myLibrary[index];
  currentEditingIndex = index;
  // listItem.pages = 222;
  console.log(listItem);

  // bring out a form for the item
  const formString = `
  <div class="modal">
  <div class="modal__content">
    <form action="" method="post" class="form">
      <div class="form__heading">
        <h2>Book Data</h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="#333333" viewBox="0 0 256 256"
          class="button__close">
          <rect width="256" height="256" fill="none"></rect>
          <line x1="200" y1="56" x2="56" y2="200" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="21"></line>
          <line x1="200" y1="200" x2="56" y2="56" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="21"></line>
        </svg>
      </div>
      <ul class="form__ul">
        <label for="title">Title:</label>
        <li>
          <input type="text" id="title" name="book_title" required class="form__title" value="${
            listItem.title
          }" autofocus>
        </li>
        <label for="author">Author:</label>
        <li>
          <input type="text" id="author" name="book_author" required class="form__author" value="${
            listItem.author
          }">
        </li>
        <label for="pages">Pages:</label>
        <li>
          <input type="number" id="pages" name="book_pages" max="15000" min="1" required class="form__pages" value="${
            listItem.pages
          }">
        </li>
        <li class="checkbox-li">
          <label for="read">Finished the book?</label>
          <input type="checkbox" name="book_read" id="read" class="form__read" ${
            listItem.read ? "checked" : ""
          }>
        </li>
        <li>
          <button type="button" class="button__edit">Edit</button>
        </li>
      </ul>
    </form>
  </div>
</div>
  `;

  // display modal
  container.insertAdjacentHTML("afterend", formString);

  // edit myLibrary
}

function deleteButtonHandler(cardDiv) {
  const index = cardDiv.dataset.index;
  myLibrary.splice(index, 1);
  cardDiv.remove();
}

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

function updateBookToView(title, author, pages, read, index) {
  const editCard = document.querySelector(`[data-index="${index}"]`);
  const bookTitle = editCard.querySelector(".book__title");
  const bookAuthor = editCard.querySelector(".book__author");
  const bookPages = editCard.querySelector(".book__pages");
  const bookRead = editCard.querySelector(".book__read");

  bookTitle.textContent = title;
  bookAuthor.textContent = author;
  bookPages.textContent = pages;
  bookRead.textContent = read ? "✅Finished reading" : "🟡Currently reading";
}

function addBookToView(bookList) {
  const index = bookList.length - 1;
  const book = bookList[bookList.length - 1];

  // Add book by using Card HTML
  const newElementHTML = `
  <div class="card" data-index="${index}">
          <div class="card__heading">
            <h2 class="book__title">${book.title}</h2>
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
          <p class="book__author">Author: ${book.author}</p>
          <p class="book__pages">${book.pages} ${
    book.pages > 1 ? "pages" : "page"
  }</p>
          <p class="book__read">${
            book.read ? "✅Finished reading" : "🟡Currently reading"
          }</p>
        </div>
  `;
  // insert card HTML
  cardFirst.insertAdjacentHTML("afterend", newElementHTML);
}

function initialBookLoad(book, i) {
  const newElementHTML = `
  <div class="card" data-index="${i}">
          <div class="card__heading">
            <h2 class="book__title">${book.title}</h2>
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
          <p class="book__author">Author: ${book.author}</p>
          <p class="book__pages">${book.pages} ${
    book.pages > 1 ? "pages" : "page"
  }</p>
          <p class="book__read">${
            book.read ? "✅Finished reading" : "🟡Currently reading"
          }</p>
        </div>
  `;
  // insert card HTML
  cardFirst.insertAdjacentHTML("afterend", newElementHTML);
}

// let myLibrary = [];

// Remove book
