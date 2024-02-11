let userInput = document.querySelector(".task-input input")
let taskbox = document.querySelector(".task-box")
let filters = document.querySelectorAll(".filters span")
let clearall = document.querySelector(".clear-all")
let saveEditButton = document.getElementById("saveEditButton")

// getting the data from localstorage
let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

 let editId ;


filters.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector("span.active").classList.remove("active")
        btn.classList.add("active")
        displayToddo(btn.id)

    })
})

 displayToddo = (filter) => {
    let list = ""
    todos.forEach((todo,id) => {
      let isCompleted = todo.status == "completed" ? "checked" : ""
      if (filter == todo.status || filter == "all"){
          list += `  <li class="task" >
          <label for="${id}">
            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
            <p class = "${isCompleted} text">${todo.name}</p>
            </label>
            <div> 
            <button class = "edit" onclick="openEditModal(${id})"><i class="fas fa-edit"></i></button>
            <button class = "delete" onclick="deleteTodo(${id})"><i class="fas fa-trash"></i></button>
            </div>
            </li>`
        }  
    });
      taskbox.innerHTML = list || `<span style = "color : white"> There's no task ! </span>`
 }
displayToddo("all")


document.querySelector(".close").addEventListener('click',closeEditModal)
document.getElementById("saveEditButton").addEventListener('click',saveModal)

// function openEditModal(id){
//     editId = id
//     const openModal = document.getElementById("editModal")
//     openModal.style.display = "block";
//       let editInput = document.getElementById("editTaskInput")
//       editInput.value = todos[id].name
// }


function saveModal(){
    let editInput = document.getElementById("editTaskInput").value.trim()
    if(editInput == "")
    {
       alert("Please enter a task")
       return; 
    }
    todos[editId].name = editInput;
    localStorage.setItem("todo-list",JSON.stringify(todos))
    displayToddo('all')
    closeEditModal()

}

// function closeEditModal(){
//     const closeModal = document.getElementById("editModal")
//     closeModal.style.display = "none";
// }

function openEditModal(id) {
    editId = id;
    const openModal = document.getElementById("editModal");
    openModal.style.display = "block";
    let editInput = document.getElementById("editTaskInput");
    editInput.value = todos[id].name;
}

function closeEditModal() {
    const closeModal = document.getElementById("editModal");
    closeModal.classList.add("fade-out"); // Add the fade-out class to trigger the fade-out animation
    setTimeout(() => {
        closeModal.style.display = "none";
        closeModal.classList.remove("fade-out"); // Remove the class after the animation
    }, 300); // Wait for the animation to complete (300ms in this example)
}


deleteTodo = (deleteId) => {
     todos.splice(deleteId,1)
     localStorage.setItem("todo-list",JSON.stringify(todos))
     displayToddo("all")
    }
    
    clearall.addEventListener("click" , () => {
        todos.splice(0 , todos.length)
        localStorage.setItem("todo-list",JSON.stringify(todos))
    displayToddo("all")
})


function updateStatus(selectedTask){
    //getting paragraph that contains task name
    taskname = selectedTask.parentElement.lastElementChild

    if(selectedTask.checked)
    {
        // if clicked on pragraph or on checkbox then will add the class of checked
        taskname.classList.add("checked")
        // Updating the status
        todos[selectedTask.id].status = "completed"    
        
    }else{
        taskname.classList.remove("checked")
        todos[selectedTask.id].status = "pending"    
    }
    localStorage.setItem("todo-list",JSON.stringify(todos))
}

// storing the data in local storage
userInput.addEventListener("keyup", (e) => {
    let taskInput = userInput.value.trim()
    if(e.key == "Enter" && taskInput)
{
        let taskobj = 
        { 
            name : taskInput, 
            status : "pending"  
        }
        todos.push(taskobj)
        userInput.value = ""
        localStorage.setItem("todo-list",JSON.stringify(todos))
        displayToddo("all")
}
});