//tanımlamalar
const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;

// kayıtlı itemları getir
items = getItemsFromLocalStorage();
items.forEach(function (item) {
  createItem(item);
});

// local storage dan itemsları al
function getItemsFromLocalStorage() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

// ekle, sil, hepsini sil
form.addEventListener("submit", addNewItem);
taskList.addEventListener("click", deleteItem);
btnDeleteAll.addEventListener("click", deleteAllItems);

// item ekle
function addNewItem() {
  if (input.value === "") {
    alert("Lütfen bir görev giriniz.");
  } else {
    createItem(input.value);
    setItemToLocalStorage(input.value);
    input.value = "";
  }
}

// item sil
function deleteItem(e) {
  if (e.target.className === "bi bi-trash") {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      e.target.parentElement.parentElement.remove();
      deleteItemFromLocalStorage(
        e.target.parentElement.parentElement.textContent
      );
    }
  }
  e.preventDefault();
}

// bütün itemları sil
function deleteAllItems() {
  if (confirm("Hepsini silmek istediğinize emin misiniz?")) {
    taskList.innerHTML = "";
    localStorage.clear();
  }
}

// local storage item ekle
function setItemToLocalStorage(text) {
  items = getItemsFromLocalStorage();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

// local storage item sil
function deleteItemFromLocalStorage(text) {
  items = getItemsFromLocalStorage();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}

// item oluştur
function createItem(text) {
  // li etiketi oluştur
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));

  // a silme etiketi oluştur
  const a = document.createElement("a");
  a.classList = "delete-item float-end";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="bi bi-trash"></i>';

  // li etiketine a etiketlerini ekle
  li.appendChild(a);

  // ul'ye li'yi ekle
  taskList.appendChild(li);
}
