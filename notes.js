const newNoteTitle = document.getElementById('newNoteTitle');
const newNoteText = document.getElementById('newNoteText');
const newNoteHour = document.getElementById('newNotehour');
const newNoteDate = document.getElementById('newNoteDate');
const newNoteBtn = document.getElementById('newNoteBtn');
const divNotes = document.getElementById('notes');

const localStorageNotes = JSON.parse(localStorage.getItem('notes'));
let notes = localStorage.getItem('notes') !== null ? localStorageNotes : [];

newNoteBtn.addEventListener('click', () => {
    
    let data = new Date();
    let randomID = data.getHours() + data.getMinutes() + data.getSeconds() + data.getMilliseconds() + data.getDate() + data.getMonth() + data.getFullYear();
    let noteDate = newNoteDate.value.split('-');

    const noteContainer = document.createElement('div');
    noteContainer.className = 'note';
    noteContainer.setAttribute('data-noteID', randomID);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions-note';

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

    const noteBody = document.createElement('div');
    noteBody.className = 'note-body';

    const titleInput = document.createElement('input');
    titleInput.setAttribute('data-title', randomID);
    titleInput.value = newNoteTitle.value;
    titleInput.disabled = true;

    const textArea = document.createElement('textarea');
    textArea.setAttribute('data-text', randomID);
    textArea.value = newNoteText.value;
    textArea.disabled = true;

    noteBody.appendChild(titleInput);
    noteBody.appendChild(textArea);

    const noteFooter = document.createElement('div');
    noteFooter.className = 'note-footer';

    const noteHourDate = document.createElement('div');
    noteHourDate.className = 'note-date';
    noteHourDate.textContent = `${newNoteHour.value} | ${noteDate[2]}/${noteDate[1]}/${noteDate[0]}`;

    noteFooter.appendChild(noteHourDate);

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

    let textarea = document.querySelector('[data-text="'+ randomID +'"]');
    let contentHeigth = textarea.scrollHeight;
    textarea.style.height = `${contentHeigth}px`;

    let noteObj = {
        id: randomID,
        title: newNoteTitle.value,
        text: newNoteText.value,
        noteHour: newNoteHour.value,
        noteDate: newNoteDate.value
    };

    notes.push(noteObj);
    updateLocalStorageNotes()

    newNoteTitle.value = '';
    newNoteText.value = '';
    newNoteHour.value = '';
    newNoteDate.value = '';

    gsap.to(divNewNote, {width: 0, height: 40, bottom: 36 ,duration: 0.5})
    gsap.to(divNewNote, {display: 'none', duration: 0.4})
});

function ToolTip(e){
    if(e.target != divNotes){
        if(e.target.tagName == "SPAN"){

            let noteID = e.target.parentElement.id.split('-')
            let title = document.querySelector('[data-title="'+ noteID[1] +'"]');
            let text = document.querySelector('[data-text="'+ noteID[1] +'"]');
            
            if(noteID[0] == 'delete'){
                let note = document.querySelector('[data-noteID="'+ noteID[1] +'"]');
                divNotes.removeChild(note);
                let removeNodeArray = item => item.id != noteID[1];
                notes = notes.filter(removeNodeArray)
                updateLocalStorageNotes();
            } if (noteID[0] == 'edit') {
                title.disabled = false;
                text.disabled = false;
                title.style.border = '1px solid blueviolet';
                text.style.border = '1px solid blueviolet';
                title.style.padding = '0 7px 0 7px';
                text.style.padding = '7px 7px 7px 7px';
                let textarea = document.querySelector('[data-text="'+ noteID[1] +'"]');
                textarea.style.minHeight = '200px';
            } if(noteID[0] == 'confirm'){
                if(title.disabled == false){
                    title.disabled = true;
                    text.disabled = true;
                    title.style.border = 'none'
                    text.style.border = 'none'
                    notes.forEach(element => {
                        if(element.id == noteID[1]){
                            element.title = title.value;
                            element.text = text.value
                        }
                    });
                }
                let textarea = document.querySelector('[data-text="'+ noteID[1] +'"]');
                textarea.style.minHeight = '0px';
                let alturaDoConteudo = textarea.scrollHeight;
                textarea.style.height = `${alturaDoConteudo}px`;
                updateLocalStorageNotes()
            }
        }
    }
}

const updateLocalStorageNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

divNotes.addEventListener('click', ToolTip);