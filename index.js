// const newInput = document.getElementById('new-Input');
// const newButton = document.getElementById('new-Button');
// const divTasks = document.getElementById('tasks');

// const localStorageTasks = JSON.parse(localStorage.getItem('tasks'))
// let tasks = localStorage.getItem('tasks') !== null ? localStorageTasks : []

// newButton.addEventListener('click', () => {

//     let data = new Date();
//     let randomID = data.getHours() + data.getMinutes() + data.getSeconds() + data.getMilliseconds() + data.getDate() + data.getMonth() + data.getFullYear();
//     newInputValue = newInput.value;


//     divTasks.innerHTML += `
//         <div class="task" data-TaskID = "${randomID}">
//             <input class="task-Input" type="text" name="task-Input" value="${newInput.value}" data-Input = "${randomID}" disabled>
//             <div id = "taskButtons${randomID}" class="task-Buttons">
//                 <button id = "Delete-${randomID}" class="task-Button">D</button>
//                 <button id = "Edit-${randomID}" class="task-Button">E</button>
//             </div>
//         </div>
//     `

//     let taskObj = {
//         id: randomID,
//         text: newInputValue
//     }

//     tasks.push(taskObj)
//     updateLocalStorage()
// })

// window.addEventListener("load", (event) => {
//     tasks.forEach(element => {
//         divTasks.innerHTML += `
//         <div class="task" data-TaskID = "${element.id}">
//             <input class="task-Input" type="text" name="task-Input" value="${element.text}" data-Input = "${element.id}" disabled>
//             <div id = "taskButtons${element.id}" class="task-Buttons">
//                 <button id = "Delete-${element.id}" class="task-Button">D</button>
//                 <button id = "Edit-${element.id}" class="task-Button">E</button>
//             </div>
//         </div>
//     `
//     });
// });

// const carrinho = [
//     { nome: 'Caneta', qtde: 10, preco: 7.99 },
//     { nome: 'Impressora', qtde: 0, preco: 649.50 },
//     { nome: 'Caderno', qtde: 4, preco: 27.10 },
//     { nome: 'Lapis', qtde: 3, preco: 5.82 },
//     { nome: 'Tesoura', qtde: 1, preco: 19.20 },
// ];

// // const qtdeMaiorQueZero = item => item.qtde > 0;
// // const qtdeMuitoGrande = item => item.qtde > 1000;
// // console.log(carrinho.filter(qtdeMaiorQueZero));


// function ToolTip(e) {

//     if(e.target != divTasks){

//         let id = e.target.id
//         let action = id.split('-')
//         let inputID = document.querySelector('[data-Input="'+ action[1] +'"]')
//         let buttonsID = document.getElementById('taskButtons'+ action[1] +'')
//         let editButton = document.getElementById('Edit-'+ action[1] +'')
        
//         if(action[0] == 'Edit'){
//             inputID.disabled = false
//             let confirmButton = document.createElement('button')
//             confirmButton.classList.add('task-Button')
//             confirmButton.textContent = 'O'
//             confirmButton.id = `Confirm-${action[1]}`
//             buttonsID.appendChild(confirmButton)
//         } if (action[0] == 'Delete') {
//             let taskID = document.querySelector('[data-TaskID="'+ action[1] +'"]')
//             divTasks.removeChild(taskID)
//             const remove  = item => item.id != action[1]
//             tasks = tasks.filter(remove)
//             updateLocalStorage()
//         } if(action[0] == 'Confirm'){
//             inputID.disabled = true;
//             buttonsID.removeChild(document.getElementById(`Confirm-${action[1]}`))
//             const confirmEdit = item => {
//                 if(item.id == action[1]) {
//                     item.text = 'teste'
//                 }
//             } 
//             tasks.forEach(element => {
//                 if(element.id == action[1]){
//                     element.text = inputID.value;
//                 }
//             });
//             updateLocalStorage()
//         }
//     }
// }

// const updateLocalStorage = () => {
//     localStorage.setItem('tasks', JSON.stringify(tasks))
// }

// divTasks.addEventListener('click', ToolTip)