const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF-APPS';

  function generateId() {
    return +new Date();
  }

    function generateBookObject(id, title, author, year, isComplete) {
      return {
        id,
        title,
        author,
        year,
        isComplete,
      };
    }
    
      function findBook(bookId) {
        for (const bookItem of books) {
          if (bookItem.id === bookId) {
            return bookItem;
          }
        }

        return null;
      }

      function findBookIndex(bookId) {
        for (const index of books) {
          // console.log(books[index].id);
          console.log(books);
          console.log(index);
          if (books[index].id === bookId) {
            return index;
          }
        }

        return -1;
      }

function isStorrageExist() {
  if (typeof Storage === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

  function saveData() {
    if (isStorrageExist()) {
      const parsed = JSON.stringify(books);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
      // console.log(books);
    }
  }

  function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
      for (const book of data) {
        books.push(book);
      }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
  }

    function makeBook(bookObject) {
      const { id, title, author, year, isComplete } = bookObject;
      const textBookTitle = document.createElement('h3');
      textBookTitle.innerText = title;

      const textBookAuthor = document.createElement('p');
      textBookAuthor.innerText = 'Penulis: ' + author;

      const textBookYear = document.createElement('p');
      textBookYear.innerText = 'Tahun: ' + year;

      const textContainer = document.createElement('article');
      textContainer.classList.add('book_item');
      textContainer.setAttribute('id', `todo-${id}`);
      textContainer.append(textBookTitle, textBookAuthor, textBookYear);

      if (isComplete) {
        const undoFinishedButton = document.createElement('button');
        undoFinishedButton.classList.add('green');
        undoFinishedButton.innerText = 'Belum selesai dibaca';

        undoFinishedButton.addEventListener('click', function () {
          undoBookFromCompleted(id);
          // console.log(id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('red');
        trashButton.innerText = 'Hapus buku';

        trashButton.addEventListener('click', function () {
          const userConfirmed = confirm(`Yakin ingin menghapus buku "${title}"?`);
          if (userConfirmed) {
            alert(`Sukses menghapus buku: ${title}`);
            removeBookFromCompleted(id);
          } else {
            alert('Menghapus buku dibatalkan!');
          }
        });

        const actionContainer = document.createElement('div');
        actionContainer.classList.add('action');
        actionContainer.append(undoFinishedButton, trashButton);
        textContainer.append(actionContainer);
      } else {
        const FinishedButton = document.createElement('button');
        FinishedButton.classList.add('green');
        FinishedButton.innerText = 'Selesai dibaca';

        FinishedButton.addEventListener('click', function () {
          FinishedFromCompleted(id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('red');
        trashButton.innerText = 'Hapus buku';

        trashButton.addEventListener('click', function () {
          const userConfirmed = confirm(`Yakin ingin menghapus buku "${title}"?`);
          if (userConfirmed) {
            alert(`Sukses menghapus buku: ${title}`);
            removeBookFromCompleted(id);
          } else {
            alert('Menghapus buku dibatalkan!');
          }
        });

        const actionContainer = document.createElement('div');
        actionContainer.classList.add('action');
        actionContainer.append(FinishedButton, trashButton);
        textContainer.append(actionContainer);
      }

      return textContainer;
    }

      function addBook() {
        const bookTitle = document.getElementById('inputBookTitle').value;
        const bookAuthor = document.getElementById('inputBookAuthor').value;
        const bookYear = document.getElementById('inputBookYear').value;
        const isComplete = document.getElementById('inputBookIsComplete').checked;

        const generatedID = generateId();
        console.log('ID Buku: ' + generatedID + '\nJudul: ' + bookTitle + '\nPenulis: ' + bookAuthor + '\nTahun terbit: ' + bookYear + '\nSelesai dibaca: ' + isComplete);
        const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, bookYear, isComplete);
        books.push(bookObject);
        console.log(typeof JSON.stringify(bookObject));

        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
      }

      
function addBookToCompleted(bookId /* HTMLELement */) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  // saveData();
}

function removeBookFromCompleted(bookId /* HTMLELement */) {
  const bookTarget = findBookIndex(bookId);
  console.log(bookId);
  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}


function undoBookFromCompleted(bookId /* HTMLELement */) {
  const bookTarget = findBook(bookId);
  console.log(bookTarget)
  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
  function removeBook(bookId) {
    // console.log(bookId);
    const bookTarget = findBookIndex(bookId);
    console.log(bookTarget);
    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  function undoBookFromCompleted(bookId /* HTMLELement */) {
    const bookTarget = findBook(bookId);
    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  function FinishedFromCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    // saveData();
  }
  function searchBook() {
    // loadDataFromStorage();
    const searchBookTitle = document.getElementById('searchBookTitle').value.toLowerCase();
    const resultBook = document.getElementById('resultBook');
    const notFound = document.getElementById('notFound');
    const judulBuku = document.getElementById('judulBuku');
    const foundBook = document.getElementById('foundBook');
    const content_book = document.getElementById('content_book');
    content_book.innerText = '';
    foundBook.innerText = '';
    console.log(searchBookTitle);

    const searchResult = books.filter((book) => book.title.toLowerCase().includes(searchBookTitle));
    foundBook.innerText = searchResult.length;
    // console.log(searchResult);

    if (typeof searchBookTitle === 'string' && searchBookTitle.length === 0) {
      resultBook.setAttribute('hidden', true);
      notFound.removeAttribute('hidden');
      notFound.innerHTML = '<h3 style="color: red;">Nama buku tidak boleh kosong!</h3>';
    } else if (searchResult.length > 0) {
      resultBook.removeAttribute('hidden');
      notFound.setAttribute('hidden', true);

      for (const book_result of searchResult) {
        const textBookTitle = document.createElement('h3');
        textBookTitle.innerText = book_result.title;

        const textBookAuthor = document.createElement('p');
        textBookAuthor.innerText = 'Penulis: ' + book_result.author;

        const textBookYear = document.createElement('p');
        textBookYear.innerText = 'Tahun: ' + book_result.year;

        const articleElement = document.createElement('article');
        articleElement.classList.add('book_item');
        articleElement.append(textBookTitle, textBookAuthor, textBookYear);

        const textContainer = document.createElement('div');
        textContainer.classList.add('book_list');
        textContainer.appendChild(articleElement);
        content_book.append(textContainer);
      }
    } else {
      resultBook.setAttribute('hidden', true);
      notFound.removeAttribute('hidden');
      judulBuku.innerText = searchBookTitle;
    }
    console.log(searchResult);
  }

document.addEventListener('DOMContentLoaded', function () {
  const addBookForm = document.getElementById('inputBook');
  addBookForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });

  const searchBookForm = document.getElementById('searchBook');
  searchBookForm.addEventListener('submit', function (event) {
    event.preventDefault();
    searchBook();
  });

  if (isStorrageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(SAVED_EVENT, () => {
  console.log('Data berhasil di simpan.');
});

  document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    const completeBookshelfList = document.getElementById('completeBookshelfList');

    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';

    for (const bookItem of books) {
      const bookElement = makeBook(bookItem);

      if (bookItem.isComplete) {
        completeBookshelfList.append(bookElement);
      } else {
        incompleteBookshelfList.append(bookElement);
      }
    }
  });
