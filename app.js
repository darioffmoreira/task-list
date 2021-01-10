// * Definição das variáveis de interface do usuário
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// * Irá carregar todos os ouvintes de eventos
loadEventListeners();

// * Função que possui todos os eventos
function loadEventListeners() {
    // * DOM - Carregar evento
    document.addEventListener('DOMContentLoaded', getTasks);
    // * Adicionar evento de tarefa
    form.addEventListener('submit', addTask)
    // * Remover evento de tarefa
    taskList.addEventListener('click', removeTask);
    // * Limpar evento de tarefa
    clearBtn.addEventListener('click', clearTasks);
    // * Filtrar eventos de tarefas
    filter.addEventListener('keyup', filterTasks);
};

// * Obter tarefas do Local Storage
function getTasks() {
    let tasks;
    // * Verificar local storage se existe alguma tarefa
    // * Neste caso se estiver a variavel tasks estiver vazia, retornará um array vazio.
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else { // * Então variavel tasks é igual ao que estiver no local storage. Contudo local storage pode apenas ter strings.
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // * Criar elemento li
        const li = document.createElement('li');

        // * Adicionar uma class
        li.className = 'collection-item';

        // * Criar nó de texto e anexar à li
        li.appendChild(document.createTextNode(task));

        // * Criar um novo elemento de link
        const link = document.createElement('a');

        // * Adicionar a class
        link.className = 'delete-item secondary-content';

        // * Adicionar o icone em html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // * Anexar o link para a li
        li.appendChild(link);

        // * Anexar a li para a ul
        taskList.appendChild(li);
        });
}

// * Adicionar tarefa
function addTask(event) {

    if (taskInput.value === '') {
        alert('Add a task!!!');
    }

    // * Criar elemento li
    const li = document.createElement('li');

    // * Adicionar uma class
    li.className = 'collection-item';

    // * Criar nó de texto e anexar à li
    li.appendChild(document.createTextNode(taskInput.value));

    // * Criar um novo elemento de link
    const link = document.createElement('a');

    // * Adicionar a class
    link.className = 'delete-item secondary-content';

    // * Adicionar o icone em html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // * Anexar o link para a li
    li.appendChild(link);

    // * Anexar a li para a ul
    taskList.appendChild(li);

    // * Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // * Limpar o input
    taskInput.value = '';

    event.preventDefault();
};

// * Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    // * Verificar local storage se existe alguma tarefa
    // * Neste caso se estiver a variavel tasks estiver vazia, retornará um array vazio.
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else { // * Então variavel tasks é igual ao que estiver no local storage. Contudo local storage pode apenas ter strings.
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // * Então o que queremos é puxar a informação para a variavel
    tasks.push(task);

    // * Ultima coisa que queremos fazer é enviá-lo de volta para o local storage
    // ! Deve ser guardado como uma string
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// * Remover Tarefa
function removeTask(event) {
    if (event.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            // * Remover através do DOM
            event.target.parentElement.parentElement.remove();
            // * Remover através LOCAL STORAGE
            removeTaskFromLocalStorage(event.target.parentElement.parentElement);
        }
    }
};

// * Remover através do LOCAL STORAGE
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    // * Verificar local storage se existe alguma tarefa
    // * Neste caso se estiver a variavel tasks estiver vazia, retornará um array vazio.
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else { // * Então variavel tasks é igual ao que estiver no local storage. Contudo local storage pode apenas ter strings.
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(tasks, index){
        // * textContent será o mesmo qua o atual text da task inserida.
        // * Então será feito match se é igual à atual task na interação, se for será essa para eliminar
        if(taskItem.textContent) {
            tasks.slice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// * Limpar tarefas
function clearTasks() {
    // ? Uma maneira de limpar, mas tem menos performance do que while loop
    // if (confirm('Are You Sure?')) {
    //     taskList.innerHTML = '';
    // };

    // * Desta forma, com while loop, temos melhor performance
    if (confirm('Are You Sure?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    };

    // * Limpar através LOCAL STORAGE
    clearTaskFromLocalStorage();
};

// * Limpar através LOCAL STORAGE
function clearTaskFromLocalStorage(){
    localStorage.clear();
}

// * Filtrar tarefas
function filterTasks(event) {
    const text = event.target.value.toLowerCase();
    console.log(text);

    // * Podemos usar o forEach porque vamos retornar todos os node lists
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        // ! Se aparecer resultado -1 significa que não existe. Assim sendo, como queremos garantir que não é igual a -1, daí colocar != -1
        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        };
    });
};
