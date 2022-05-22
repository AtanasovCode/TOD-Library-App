const display = document.querySelector(".output-container");
const form = document.querySelector(".form-container");
const inputs = document.querySelectorAll(".input");
const submit = document.querySelector(".btn");
const add = document.querySelector(".add");
const removeContainer = document.querySelector(".remove-container");

const removeBook = document.querySelector(".book-remove");
const keepBook = document.querySelector(".keep-book");

add.addEventListener("click", () => {
  form.classList.remove("disabled");
  form.classList.add("active");
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
});

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

submit.addEventListener("click", function () {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;



  if(title !== "" && author !== "" && pages !== "") {
    document.querySelector("#title").classList.remove("required");
    document.querySelector("#author").classList.remove("required");
    document.querySelector("#pages").classList.remove("required");

    const book = new Book(title, author, pages, checked(status));

    form.classList.remove("active");
    form.classList.add("disabled");
  
    let bookInfo = document.createElement("div");
    bookInfo.innerHTML = `<div class="title">${book.title}</div> <div class="author">${book.author}</div> <div class="pages">Pages: ${book.pages} </div>`;
    addReadingButton(bookInfo);
    addRemoveButton(bookInfo);
  
    let container = document.createElement("div");
    container.classList.add("books");
  
    container.appendChild(bookInfo);
    display.appendChild(container);
  }else if(title === "" || author === "" || pages === "") {
      if(title === "") {
        document.querySelector("#title").classList.add("required");
      }
      if(author === "") {
        document.querySelector("#author").classList.add("required");
      }
      if(pages === "") {
        document.querySelector("#pages").classList.add("required");
      }
      return;
  }
});

function checked(x) {
  if (x.checked) {
    return "Read";
  } else {
    return "Not Read";
  }
}

function addReadingButton(addHere) {

  const status = document.querySelector("#status");

  let buttonContainer = document.createElement("div");
  let button = document.createElement("input");
  button.type = "button";
  button.classList.add("buttons");

  if(checked(status) === "Read") {
    button.value = "Read";
    button.classList.add("read");
    button.classList.remove("not-read");
  }else {
    button.value = "Not Read";
    button.classList.add("not-read");
    button.classList.remove("read");
  }

  button.addEventListener("click", (e) => {
    if(e.target.value === "Read") {
      e.target.value = "Not Read";
      e.target.classList.add("not-read");
      e.target.classList.remove("read");
    }else if(e.target.value === "Not Read") {
      e.target.classList.remove("not-read");
      e.target.classList.add("read");
      e.target.value = "Read";
    }
  })

  buttonContainer.appendChild(button);
  addHere.appendChild(buttonContainer);
}

function addRemoveButton(addHere) {
  let buttonContainer = document.createElement("div");
  let button = document.createElement("input");
  button.type = "button";
  button.value = "Remove";
  button.classList.add("buttons");
  button.classList.add("remove");

  keepBook.addEventListener("click", () => {
    removeContainer.classList.remove("active");
    return;
  })
  

  button.addEventListener("click", (e) => {
    removeContainer.classList.add("active");

    removeBook.addEventListener("click", () => {
      removeContainer.classList.remove("active");
      e.target.parentNode.parentNode.parentNode.remove();
    })
  })

  buttonContainer.appendChild(button);
  addHere.appendChild(buttonContainer);
}


const close = document.querySelector(".ex-container");

close.addEventListener("click", () => {
  form.classList.remove("active");
  form.classList.add("disabled");
})

