let images;
let checkboxes;

let dragEl = null;
let items;

//let completed = false;
function genTasks()  {
    let x = confirm('Сгенерировать 6 задач?');

    if (x)  {
        for (let iter = 0; iter < 6; iter++){
            document.getElementById('taskName').value = iter + 1;
            addTask();
        }
    }
}

function dragStart(e)    {
    this.classList.add('drag');

    dragEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);

    //if (this.classList[1] === 'completed')
        //completed = true;
    //console.log(this.classList[1]);
    //console.log(completed);
    //console.log(this.parentNode.innerHTML);
    //console.log(this.innerHTML);
    //console.log('dragStart');
}
function dragOver(e)    {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    //console.log('dragOver');
    //return false;
}
function dragEnter()    {
    this.classList.add('over');
    //console.log('dragEnter');
}
function dragLeave(e)   {
    e.stopPropagation();
    this.classList.remove('over');
    //console.log('dragLeave');
}
function dragDrop(e)    {
    e.stopPropagation();

    if (dragEl !== this)    {
        let firstIsChecked = false;
        let secondIsChecked = false;
        if (this.querySelector('input[type=checkbox]').checked)
            secondIsChecked = true;
        if (dragEl.querySelector('input[type=checkbox]').checked)
            firstIsChecked = true;
        //console.log(this.innerHTML);
        //console.log(dragEl.innerHTML);
        dragEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
        //console.log(this.innerHTML);
        //console.log(dragEl.innerHTML);
        if (firstIsChecked) {
            this.querySelector('input[type=checkbox]').checked = true;
            this.classList.add('completed');
        }
        else
            this.classList.remove('completed');
        if (secondIsChecked) {
            dragEl.querySelector('input[type=checkbox]').checked = true;
            dragEl.classList.add('completed');
        }
        else
            dragEl.classList.remove('completed');

        /*if (this.querySelector('input[type=checkbox]').checked)
        if (completed)  {
            this.querySelector('input[type=checkbox]').checked = true;
            completed = false;
        }*/
        //this.getElementsByClassName('input[type=checkbox]')[0].innerHTML = e1.dataTransfer.getData('text/html');
    }

    //console.log('dragDrop');
    return false;
}
function dragEnd() {
    this.classList.remove('drag');

    items.forEach(function (item)   {
       item.classList.remove('over');
    });

    //console.log('dragEnd');
}

function addTask()  {
    let task = document.createElement('div');
    let checkbox = document.createElement('input');
    let img = document.createElement('img');

    let textValue = document.getElementById('taskName').value;

    task.classList.add('task');
    task.draggable = true;

    checkbox.type = "checkbox";
    checkbox.name = "check-task";
    checkbox.value = "checkbox";

    img.src = "pics/bin.png";
    img.classList.add('images');

    task.appendChild(checkbox);

    if (typeof textValue === 'string' && textValue.trim() !== '')
        task.innerHTML += textValue;
    else
        task.innerHTML += "Название задания";

    task.appendChild(img);
    document.getElementsByClassName('task-list')[0].appendChild(task);
    /*change task status------------------------------------------------------*/
    checkboxes = document.querySelectorAll('input[type=checkbox]');

    function setCompleted() {
        if (this.checked)
            this.parentNode.classList.add('completed');
        else
            this.parentNode.classList.remove('completed');
    }

    for (let iter = 0; iter < checkboxes.length; iter++)    {
        checkboxes[iter].addEventListener('change', setCompleted);
    }
    /*add drag event----------------------------------------------------------*/
    items = document.querySelectorAll('.task-list .task');

    items.forEach(function(item) {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);

        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);

        item.addEventListener('dragover', dragOver);

        item.addEventListener('drop', dragDrop);
    });
    /*delete task-------------------------------------------------------------*/
    images = document.querySelectorAll('.images');

    function removeEl()  {
        this.parentNode.remove();
    }

    for (let iter = 0; iter < images.length; iter++)    {
        images[iter].addEventListener('click', removeEl);
    }
}


