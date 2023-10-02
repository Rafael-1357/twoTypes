const divMenu = document.getElementById('menu');
const btnMenuIcon = document.getElementById('menuIcon');
const btnMenuOptions = document.getElementById('menuOptions');
const btnNewTask = document.getElementById('btnNewTask');
const btnNewNote = document.getElementById('btnNewNote');
const btnBack = document.getElementById('btnBack');
const divNewTask = document.getElementById('newTask');
const divNewNote = document.getElementById('newNote');

btnMenuIcon.addEventListener('click', () => {
    btnMenuIcon.style.display = 'none';
    // divMenu.classList.add('open');
    gsap.to(divMenu, {width: 200, duration: 0.5})
    btnMenuOptions.style.display = 'flex';
});

btnBack.addEventListener('click', () => {
    btnMenuOptions.style.display = 'none';
    // divMenu.classList.remove('open');
    gsap.to(divMenu, {width: 50, duration: 0.5})
    btnMenuIcon.style.display = 'flex';
});

const nt = gsap.timeline({ duration: 0.5 });

btnNewTask.addEventListener('click', () => {

    if(divNewTask.style.display == 'flex'){
        gsap.to(divNewTask, {width: 0, height: 40, bottom: 36 ,duration: 0.5})
        gsap.to(divNewTask, {display: 'none', duration: 0.4})
    } else{
        divNewTask.style.display = 'flex'
        gsap.to(divNewTask, {width: 700, height: 60, bottom: 100 ,duration: 0.5})

    }
});

btnNewNote.addEventListener('click', () => {

    if(divNewNote.style.display == 'flex'){
        gsap.to(divNewNote, {width: 0, height: 40, bottom: 36 ,duration: 0.5})
        gsap.to(divNewNote, {display: 'none', duration: 0.4})
    } else{
        divNewNote.style.display = 'flex'
        gsap.to(divNewNote, {width: 400, height: 300, bottom: 100 ,duration: 0.5})
    }
});

// Função para criar a animação de entrada para uma única tarefa
function animationEntry(Element) {
    gsap.fromTo(
        Element,
        {
            y: '100%', // Inicialmente, a tarefa está fora da tela (100% abaixo)
            opacity: 0,
            rotationX: -90, // Inclinação para a frente (-45 graus)
        },
        {
            y: '0%', // Anima para a posição original
            rotationX: 0, // Retorna à rotação normal (0 graus)
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
        }
    );
}

  // Função para adicionar uma única tarefa com animação
function addAnimation(type, element) {

    if(type == 'task'){
        const taskContainer = document.createElement('div');
        taskContainer.className = 'task';
        taskContainer.setAttribute('data-taskID', element.id);
    
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.disabled = true;
        inputElement.value = element.text;
        inputElement.setAttribute('data-input', element.id);
    
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actionsTask';
    
        const deleteButton = document.createElement('button');
        deleteButton.id = `delete-${element.id}`;
        deleteButton.innerHTML = '<span class="material-symbols-rounded">delete</span>';
    
        const editButton = document.createElement('button');
        editButton.id = `edit-${element.id}`;
        editButton.innerHTML = '<span class="material-symbols-rounded">edit</span>';
    
        const confirmButton = document.createElement('button');
        confirmButton.id = `confirm-${element.id}`;
        confirmButton.innerHTML = '<span class="material-symbols-rounded">Done</span>';
    
        actionsDiv.appendChild(deleteButton);
        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(confirmButton);
    
        taskContainer.appendChild(inputElement);
        taskContainer.appendChild(actionsDiv);
    
        divTasks.appendChild(taskContainer);
    
        animationEntry(taskContainer);

    } if(type == 'note'){
        data = element.noteDate.split('-')
        const noteContainer = document.createElement('div');
        noteContainer.className = 'note';
        noteContainer.setAttribute('data-noteID', element.id);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions-note';

        const deleteButton = document.createElement('button');
        deleteButton.id = `delete-${element.id}`;
        deleteButton.innerHTML = '<span class="material-symbols-rounded">delete</span>';

        const editButton = document.createElement('button');
        editButton.id = `edit-${element.id}`;
        editButton.innerHTML = '<span class="material-symbols-rounded">edit</span>';

        const confirmButton = document.createElement('button');
        confirmButton.id = `confirm-${element.id}`;
        confirmButton.innerHTML = '<span class="material-symbols-rounded">Done</span>';

        actionsDiv.appendChild(deleteButton);
        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(confirmButton);

        const noteBody = document.createElement('div');
        noteBody.className = 'note-body';

        const titleInput = document.createElement('input');
        titleInput.setAttribute('data-title', element.id);
        titleInput.value = element.title;
        titleInput.disabled = true;

        const textArea = document.createElement('textarea');
        textArea.setAttribute('data-text', element.id);
        textArea.value = element.text;
        textArea.disabled = true;

        noteBody.appendChild(titleInput);
        noteBody.appendChild(textArea);

        const noteFooter = document.createElement('div');
        noteFooter.className = 'note-footer';

        const noteDate = document.createElement('div');
        noteDate.className = 'note-date';
        noteDate.textContent = `${element.noteHour} | ${data[2]}/${data[1]}/${data[0]}`;

        noteFooter.appendChild(noteDate);

        noteContainer.appendChild(actionsDiv);
        noteContainer.appendChild(noteBody);
        noteContainer.appendChild(noteFooter);

        // Adicione o elemento criado à página (assumindo que você tem um elemento com a classe "divTasks" onde deseja anexá-lo)
        divNotes.appendChild(noteContainer);

        let textareas = document.querySelectorAll('textarea[data-text]');

        textareas.forEach((textarea, index) => {
            let alturaDoConteudo = textarea.scrollHeight;
            textarea.style.height = `${alturaDoConteudo}px`
        });

        animationEntry(noteContainer);
    }
}

function addTaskEndNote() {
    tasks.forEach((element, index) => {
    setTimeout(() => {
        addAnimation('task', element);
      }, index * 250); // 2 segundos de atraso para cada tarefa
    });

    notes.forEach((element, index) => {
    setTimeout(() => {
        addAnimation('note', element);
        }, index * 250); // 2 segundos de atraso para cada tarefa
    });
}

window.addEventListener('load', () => {
    addTaskEndNote();
});

window.addEventListener('click', (e) => {
    if(e.target != divNewTask && e.target != divNewTask.children[0] && e.target != btnNewTask.children[0]){
        gsap.to(divNewTask, {width: 0, height: 40, bottom: 36 ,duration: 0.5})
        gsap.to(divNewTask, {display: 'none', duration: 0.4})
    }
})