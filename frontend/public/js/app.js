(() => {
    const App = {
        htmlElements: {
            taskForm: document.getElementById('task-form'),
            mainTaskList: document.querySelector('.main-task-list'),
            mainTittleMassage: document.getElementById('main-tittle-massage'),
        },
        init: () => {
            App.bindEvents();
            App.initializeData.users();
        },
        bindEvents: () => {
            App.htmlElements.taskForm.addEventListener('submit', App.events.onTaskFormSubmit);
            App.htmlElements.mainTaskList.addEventListener('click', App.events.onTasksListClick);
        },
        initializeData: {
            users: async () => {
                const { count, data } = await App.utils.getData('http://localhost:4000/api/v1/tasks/');
                let id = 0;
                data.forEach(task => {
                    App.utils.addTask(task, id);
                    id ++;
                });
            },
        },
        events: {
            onTaskFormSubmit: async (event) => {
                event.preventDefault();
                const { task: { value: taskValue } } = event.target.elements;
                //App.htmlElements.mainTaskList.innerHTML += `<div class="form-task"><input type="checkbox" class="rendered-task"><label for="">${taskValue}</label></div><br>`;

                // Guardar en el servidor
                const response = await App.utils.postData('http://localhost:4000/api/v1/tasks/', {
                    name: taskValue,
                    completed: false,
                })
                console.log(`${response.msg}`);
                App.htmlElements.mainTittleMassage.innerText = `${response.msg}`;
                event.target.elements[0].value = '';
                App.utils.reloadTasks();
                App.events.onMassageForm();
            },
            onTasksListClick: async (event) => {
                const id = event.target.parentNode.getAttribute('id');
                if (event.target.classList.contains('delete')) {
                    const response = await App.utils.deletaData('http://localhost:4000/api/v1/tasks/delete/'+id, {});
                    console.log(`${response.msg}`);
                    App.htmlElements.mainTittleMassage.innerText = `${response.msg}`;

                } else if (event.target.classList.contains('rendered-task')) {
                    const taskValue = event.target.nextSibling.innerText;
                    const value = (event.target.getAttribute('value') == 'true' ) ? 'false' : 'true';
                    const response = await App.utils.postData('http://localhost:4000/api/v1/tasks/update/'+id, {
                        name: taskValue,
                        completed: value,
                    });
                    console.log(`${response.msg}`);
                    App.htmlElements.mainTittleMassage.innerText = `${response.msg}`;
                }
                App.utils.reloadTasks();
                App.events.onMassageForm();
            },
            onMassageForm: () => {
                setTimeout(() => {
                    App.htmlElements.mainTittleMassage.innerText = "";
                }, 2000);
            },
        },
        utils: {
            // Ejemplo implementando el metodo POST:
            postData: async (url = '', data = {}) => {
                // Opciones por defecto estan marcadas con un *
                const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
                });
                return response.json(); // parses JSON response into native JavaScript objects
            },
            getData: async (url = '', data = {}) => {
                // Opciones por defecto estan marcadas con un *
                const response = await fetch(url);
                return response.json(); // parses JSON response into native JavaScript objects
            },
            deletaData: async (url = '', data = {}) => {
                // Opciones por defecto estan marcadas con un *
                const response = await fetch(url, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
                });
                return response.json(); // parses JSON response into native JavaScript objects
            },
            addTask: ({name, completed}, id) => {
                if (`${completed}` == 'true') {
                    App.htmlElements.mainTaskList.innerHTML += `<div class="form-task" id=`+id+`><input type="checkbox" class="rendered-task" value="${completed}" checked><label for="">${name}</label><button class="delete"></button></div>`;
                } else if (`${completed}` == 'false') {
                    App.htmlElements.mainTaskList.innerHTML += `<div class="form-task" id=`+id+`><input type="checkbox" class="rendered-task" value="${completed}"><label for="">${name}</label><button class="delete"></button></div>`;
                }
            },
            reloadTasks: () => {
                App.htmlElements.mainTaskList.innerHTML = '';
                App.initializeData.users();
            }
        }
    };
    App.init();
})();