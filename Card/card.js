const Card = {

    class: {
        title: 'task-title',
        date: 'task-date',
        body: 'task-body'
    },

    id: {
        btnExcluir: 'excluir'
    },

    global: {
        taskId: '',
        taskList: ''
    },

    renderCard: (data) => {
        for (const part of Object.keys(Card.class)){
            const elementPart = document.getElementsByClassName(Card.class[part])[0]
            elementPart.innerHTML = data[part];
        }
    },

    getCardData: () => {
        const queryParams = {};
        const queryString = window.location.search.substring(1);
        const params = queryString.split('&');
        for (let i = 0; i < params.length; i++) {
            const pair = params[i].split('=');
            const key = decodeURIComponent(pair[0]);
            const value = decodeURIComponent(pair[1]);
            queryParams[key] = value;
        }

        Card.global.taskId = queryParams.task;
        Card.global.taskList = queryParams.list;
        const task = Task.getTaskById(queryParams.task, queryParams.list)

        return task;
    },

    loadcard: () => {
        const task = Card.getCardData();
        console.log(task)
        if(!task.error){
            Card.renderCard(task.data);
        } else {
            alert('Falha ao buscar card');
            window.location = '../Board/board.html';
        }
    },

    deleteTask: () => {
        Task.deleteTaskById(Card.global.taskId, Card.global.taskList);
        window.location = '../Board/board.html';
    },

    start: () => {
        Card.loadcard();
    }
}