class Task {



    static saveTask(title, body, date){
        const newTask = {
            title: title,
            body: body,
            date: date 
        }

        let taskList = [];

        const buffer = localStorage.getItem('task');

        if(buffer !== null){
            taskList = JSON.parse(buffer);
        }

        taskList.push(newTask);

        localStorage.setItem('task', JSON.stringify(taskList));

        return true;
    }

    static getAll(){
        let task = localStorage.getItem('task');

        console.log(JSON.parse(task));

        return true;
    }

    static getTaskById(idTask){
        const buffer = localStorage.getItem('task');

        if(buffer === null){
            return {
                error: true,
                message: 'Nenhuma task cadastrada!',
                data: null
            }
        } else {
            const taskList = JSON.parse(buffer);

            const task = taskList[idTask];

            if(task !== null){
                return {
                    error: false,
                    message: 'Task encontrada com sucesso!',
                    data: task
                }
            } else{
                return {
                    error: true,
                    message: 'Task não encontrada!',
                    data: null
                }
            }
        }
    }

    static deleteTaskById(idTask){
        const buffer = localStorage.getItem('task');

        if(buffer === null){
            return {
                error: true,
                message: 'Nenhuma task cadastrada!',
                data: null
            }
        } else {
            const taskList = JSON.parse(buffer);

            const task = taskList.splice(idTask, 1);

            if(task !== null){
                localStorage.setItem('task', JSON.stringify(taskList));
                return {
                    error: false,
                    message: 'Task removida com sucesso!',
                    data: task
                }
            } else{
                return {
                    error: true,
                    message: 'Task não encontrada!',
                    data: null
                }
            }
        }
    }

    static clearAllTask(){
        localStorage.clear();

        return true;
    }


}