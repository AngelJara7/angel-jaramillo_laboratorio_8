(() => {
    var App = {
        htmlElements: {
            studentForm: document.getElementById('student_form'),
            studentsList: document.getElementById('students_list')
        },
        init: () => {
            // Bind events
            App.htmlElements.studentForm.addEventListener('submit', App.events.studentFormOnSubmit);
        },
        events: {
            studentFormOnSubmit: (event) => {
                event.preventDefault();
                const { 
                    student_name: studentNameInput,
                    student_age: studentAgeInput,
                    student_hobbies: studentHobbiesInput
                } = event.target.elements;
                const studentName = studentNameInput.value;
                const studentAge = studentAgeInput.value;
                const studentHobbies = studentHobbiesInput.value;
                App.utils.addStudentToList({ 
                    tableBody: App.htmlElements.studentsList,
                    studentName,
                    studentAge,
                    studentHobbies,
                });
            }
        },
        utils: {
            addStudentToList: ({ tableBody, studentName, studentAge, studentHobbies }) => {
                const newRow = `<tr><td>${studentName}</td><td>${studentAge}</td><td>${studentHobbies}</td><td><button>Eliminar</button><td/></tr>`;
                tableBody.innerHTML += newRow;
            },
        }
    }
    App.init();
})();