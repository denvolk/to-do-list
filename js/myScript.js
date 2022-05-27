let images;
let checkboxes;

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
    /*delete task-------------------------------------------------------------*/
    images = document.querySelectorAll('.images');

    function removeEl()  {
        this.parentNode.remove();
    }

    for (let iter = 0; iter < images.length; iter++)    {
        images[iter].addEventListener('click', removeEl);
    }
}


