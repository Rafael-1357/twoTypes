const newTaskInput = document.getElementById('newTaskInput');
const newTaskBtn = document.getElementById('newTaskBtn');
const divTasks = document.getElementById('tasks');

const localStorageTasks = JSON.parse(localStorage.getItem('tasks'))
let tasks = localStorage.getItem('tasks') !== null ? localStorageTasks : []

newTaskBtn.addEventListener('click', () => {

    let data = new Date();
    let randomID = data.getHours() + data.getMinutes() + data.getSeconds() + data.getMilliseconds() + data.getDate() + data.getMonth() + data.getFullYear();

    const taskContainer = document.createElement('div');
    taskContainer.className = 'task';
    taskContainer.setAttribute('data-taskID', randomID);

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.disabled = true;
    inputElement.value = newTaskInput.value;
    inputElement.setAttribute('data-input', randomID);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actionsTask';

    const deleteButton = document.createElement('button');
    deleteButton.id = `delete-${randomID}`;
    deleteButton.innerHTML = '<span class="material-symbols-rounded">delete</span>';

    const editButton = document.createElement('button');
    editButton.id = `edit-${randomID}`;
    editButton.innerHTML = '<span class="material-symbols-rounded">edit</span>';

    const confirmButton = document.createElement('button');
    confirmButton.id = `confirm-${randomID}`;
    confirmButton.innerHTML = '<span class="material-symbols-rounded">Done</span>';

    actionsDiv.appendChild(deleteButton);
    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(confirmButton);

    taskContainer.appendChild(inputElement);
    taskContainer.appendChild(actionsDiv);

    divTasks.appendChild(taskContainer);

    animationEntry(taskContainer);


    let taskObj = {
        id: randomID,
        text: newTaskInput.value
    };
    
    tasks.push(taskObj);
    updateLocalStorageTasks();

    newTaskInput.value = '';
    gsap.to(divNewTask, {width: 0, height: 40, bottom: 36 ,duration: 0.5})
    gsap.to(divNewTask, {display: 'none', duration: 0.4})
});

function ToolTip(e){
    if(e.target != divTasks){
        if(e.target.tagName == "SPAN"){

            let taskID = e.target.parentElement.id.split('-')
            let input = document.querySelector('[data-input="'+ taskID[1] +'"]');
            
            if(taskID[0] == 'delete'){
                let task = document.querySelector('[data-TaskID="'+ taskID[1] +'"]');
                divTasks.removeChild(task);
                let removeTaskArray = item => item.id != taskID[1];
                tasks = tasks.filter(removeTaskArray);
                updateLocalStorageTasks();
            } if (taskID[0] == 'edit') {
                input.disabled = false;
                input.style.border = '1px solid blueviolet';
                input.style.padding = '0 7px 0 7px';
            } if(taskID[0] == 'confirm'){
                if(input.disabled == false){
                    input.disabled = true;
                    input.style.border = 'none'
                    input.style.padding = '0px';
                    tasks.forEach(element => {
                        if(element.id == taskID[1]){
                            element.text = input.value;
                        }
                    });
                }
                updateLocalStorageTasks()
            }
        }
    }
}


const updateLocalStorageTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

divTasks.addEventListener('click', ToolTip);