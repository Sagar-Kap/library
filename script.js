let myLibrary = [];

const openForm = document.getElementById("newBook");
const formDisplay = document.getElementById("addNewBook");
const submitButton = document.getElementById("submit");
const bookList = document.getElementById("books");
let toggleButton = document.getElementById("icon");
let authorForm = document.getElementById("author");
let parentDiv= document.getElementById("author").parentNode;
const modal = document.querySelector(".modal");

if (localStorage.getItem("theme") === null){
    localStorage.setItem("theme", "light");
}

let localData = localStorage.getItem("theme");

if(localData === "light"){
    toggleButton.src = "media/moon.png";
    document.body.classList.remove("dark-theme");
}
else if (localData === "dark"){
    toggleButton.src = "media/sun.png";
    document.body.classList.add("dark-theme");
}

toggleButton.onclick = () => {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")){
        toggleButton.src = "media/sun.png";
        localStorage.setItem("theme", "dark");
    }
    else {
        toggleButton.src = "media/moon.png";
        localStorage.setItem("theme", "light");
    }
}

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
    this.info = () => `${title} by ${author}, ${pages}, ${read}` 
}

/* const hobbit = new Book("The Hobbit", "Raw Raw", 123, "not read yet");
const bamby = new Book("rsjdfhsdfjhsd", "dfsdfsdf", 34324, "read it already");
const hfjghdf = new Book("sdffhgfg", "sdgdfhhjyjhj", 6565, "read it already");


myLibrary.push(hobbit, bamby, hfjghdf);
*/

const addBookToLibrary =  (e) => {                 // Function to add Book info from the form + new Book instance  

    e.preventDefault();

    let errorElement = document.querySelector(".error-message");  // Checks for duplicate error for already existing book
    if(document.contains(errorElement)){
        errorElement.remove();
    }
    let title = formDisplay.title.value;
    let author = formDisplay.author.value;
    let pages = formDisplay.pages.value;
    let read;
    if (formDisplay.read.checked) {
        read = "Read";
    }
    else{
        read = "Not Read";
    }

    for (let i = 0; i< myLibrary.length;  i++) {                        // Checks for already existing Book's title 
        if (myLibrary[i].title === title){
            let errorMessage = document.createElement("label");
            errorMessage.classList.add("error-message");
            errorMessage.textContent= "Book already added!";

            parentDiv.insertBefore(errorMessage, authorForm);
            console.log("already added");
            return;
        }
    }

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    display(newBook);
    formDisplay.reset();
    modal.style.display = "none";

}

function display(object) {                             // Function to edit individual book 
    let box = document.createElement("div");
    box.classList.add("individualBook");
    let ul = document.createElement("ul");
    box.appendChild(ul);

 
    let titleLi = document.createElement("li");        // Push the object info into the Book DOM
    titleLi.textContent = object.title;

    let authorLi = document.createElement("li");
    authorLi.textContent = object.author;

    let pagesLi = document.createElement("li");
    pagesLi.textContent = object.pages;

    ul.append(titleLi, authorLi, pagesLi);
    bookList.appendChild(box);

    let removeButton = document.createElement("button");    // Remove Button 
    removeButton.classList.add("removeButton");
    removeButton.textContent = "Remove";
     
    removeButton.addEventListener("click", () => {
        box.remove();
        let index = myLibrary.indexOf(object);
        if (index > -1){
            myLibrary.splice(index, 1);
        }
    });
    ul.append(removeButton);

    let readButton = document.createElement("button");      // Read Status change button 
    ul.append(readButton);
    readButton.textContent = object.read;
    readButton.addEventListener("click", ()=> {
        if (readButton.textContent === "Read"){
            readButton.textContent = "Not Read";
        } 
        else {readButton.textContent = "Read"};
    });
   
} 

formDisplay.addEventListener("submit", addBookToLibrary);
openForm.addEventListener("click", () => modal.style.display = "flex");

myLibrary.forEach(display);

