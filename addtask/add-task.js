const AddTask = {

    id: {
        taksForm: "task-form",
        taksInput: 'new-task',
        dateInput: 'date-task',
        descriptionInput: 'description-task',
        listInput: 'list-select',
    },

    getFormData: (form) => {
        form = new FormData(form);

        return {
            task: form.getAll(AddTask.id.taksInput)[0], //lê campo name do formulário
            description:  form.getAll(AddTask.id.descriptionInput)[0], //lê campo email do formulário
            list:  form.getAll(AddTask.id.listInput)[0], //lê campo list do formulário
            date:  AddTask.getFormatDate(form.getAll(AddTask.id.dateInput)[0]), //lê campo date do formulário
        }
    },

    getFormatDate: (date) => {
        const part = date.split('-');
        return `${part[2]}/${part[1]}/${part[0]}`;
    },

    clearForm: () => {
        const taskInput = document.getElementById(AddTask.id.taksInput);
        const descriptionInput = document.getElementById(AddTask.id.descriptionInput);
        const listInput = document.getElementById(AddTask.id.listInput);
        const dateInput = document.getElementById(AddTask.id.dateInput);
        
        // Clear the values of the input elements
        taskInput.value = '';
        descriptionInput.value = '';
        dateInput.value = '';
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
                Task.saveTask(data.task, data.description, data.date, data.list);

                let result = confirm('Task salva com sucesso. Deseja voltar a lista de tarefas?');

                if (result === true) {
                   // caso não queira cadastrar nova task retorna para a página de bords
                   window.location = './../board/board.html';
                } else {
                    AddTask.clearForm();
                }
            }
        });
    },

    dataInputBehavior: () => {
        let flagfocus = false;
        const date = document.getElementById(AddTask.id.dateInput);

        date.addEventListener('focus', () => {
            if(!date.value){
                date.type = 'date';
            } 
            flagfocus = true;
        });

        date.addEventListener('mouseover', () => {
            if(!date.value){
                date.type = 'date';
            } 
            date.addEventListener('mouseout', () => {
                if(!date.value && !flagfocus){
                    date.type = 'text';
                } 
            });
        });

        date.addEventListener('blur', () => {
            if(!date.value){
                date.type = 'text';
            } 
            flagfocus = false;
        });
    },

    start: () => {
        AddTask.listener();
        AddTask.dataInputBehavior();
    }

}