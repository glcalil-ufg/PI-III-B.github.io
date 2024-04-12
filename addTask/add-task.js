const AddTask = {

    id: {
        taksForm: "task-form",
        taksInput: 'new-task',
        descriptionInput: 'description-task',
        listInput: 'list-select',
    },

    getFormData: (form) => {
        form = new FormData(form);

        return {
            task: form.getAll(AddTask.id.taksInput)[0], //lê campo name do formulário
            description:  form.getAll(AddTask.id.descriptionInput)[0], //lê campo email do formulário
            list:  form.getAll(AddTask.id.listInput)[0], //lê campo date do formulário
        }
    },

    getCurrentDate: () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    },

    clearForm: () => {
        const taskInput = document.getElementById(AddTask.id.taksInput);
        const descriptionInput = document.getElementById(AddTask.id.descriptionInput);
        const listInput = document.getElementById(AddTask.id.listInput);
        
        // Clear the values of the input elements
        taskInput.value = '';
        descriptionInput.value = '';
        listInput.selectedIndex = 0;
    },
    
   listener: () => {
        form =  document.getElementById(AddTask.id.taksForm)
        form.addEventListener('submit', (e) => {
            e.preventDefault();
           
            const data = AddTask.getFormData(form);
            if(data.description.length > 255) {
                alert('Campos descrição não pode ter mais de 255 caracteres');
            }else {
                console.log(data);
                Task.saveTask(data.task, data.description, AddTask.getCurrentDate(), data.list);

                let result = confirm('Task salva com sucesso. Deseja voltar a lista de tarefas?');

                if (result === true) {
                   // caso não queira cadastrar nova task retorna para a página de bords
                   window.location = './../Board/board.html';
                } else {
                    AddTask.clearForm();
                }
            }
        });
    },

    start: () => {
        AddTask.listener();
    }

}