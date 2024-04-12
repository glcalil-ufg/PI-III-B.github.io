class Task {

    static resetLocalStorage(){
        localStorage.clear('backlog');
        localStorage.clear('em-andamento');
        localStorage.clear('review');
        localStorage.clear('pronto');
    }

    static saveTask(title, body, date, list){
        const newTask = {
            title: title,
            body: body,
            date: date 
        }

        let taskList = [];

        const buffer = localStorage.getItem(list);

        if(buffer !== null){
            taskList = JSON.parse(buffer);
        }

        taskList.push(newTask);

        localStorage.setItem(list, JSON.stringify(taskList));

        return {
            error: false,
            message: 'Task cadastrada com sucesso!',
            data: null
        }
    }

    static getAll(list){
        const buffer = localStorage.getItem(list);

        if(buffer === null){
            return {
                error: true,
                message: 'Nenhuma task cadastrada!',
                data: null
            }
        } else {
            const taskList = JSON.parse(buffer);

            if(taskList !== null){
                return {
                    error: false,
                    message: 'Tasks encontrada com sucesso!',
                    data: taskList
                }
            } else{
                return {
                    error: true,
                    message: 'Tasks não encontrada!',
                    data: null
                }
            }
        }
    }

    static getTaskById(idTask, list){
        const buffer = localStorage.getItem(list);

        if(buffer === null){
            return {
                error: true,
                message: 'Nenhuma task cadastrada!',
                data: null
            }
        } else {
            const taskList = JSON.parse(buffer);

            const task = taskList[idTask];

            if(task !== null && task !== undefined){
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

    static deleteTaskById(idTask, list){
        const buffer = localStorage.getItem(list);

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
                localStorage.setItem(list, JSON.stringify(taskList));
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

    static clearAllTask(list){
        localStorage.clear(list);

        return true;
    }


}