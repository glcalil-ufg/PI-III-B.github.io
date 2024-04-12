const Board = {

    lists: {
        backlogList: "backlog",
        andamentoList: 'em-andamento',
        reviewList: 'review',
        prontoList: 'pronto',
    },

    createCard: (key, list, data) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.id = key;
        taskDiv.setAttribute('data-list', list);
        taskDiv.setAttribute('onclick', 'Board.viewCard(this)');

        // Create a new div element for the task header
        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');

        // Create a new span element for the task title
        const taskTitle = document.createElement('span');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = data.title;

        // Create a new span element for the task date
        const taskDate = document.createElement('span');
        taskDate.classList.add('task-date');
        taskDate.textContent = data.date;

        // Append the task title and task date to the task header
        taskHeader.appendChild(taskTitle);
        taskHeader.appendChild(taskDate);

        // Append the task header to the task
        taskDiv.appendChild(taskHeader);

        return taskDiv;

    },


    fillLists: () => {
        for (const list of Object.keys(Board.lists)) {
            const taskList = Task.getAll(Board.lists[list]);
            if(!taskList.error){
                for (const task of Object.keys(taskList.data)){
                    const cardList = document.getElementById(Board.lists[list]);
                    cardList.appendChild(Board.createCard(task, Board.lists[list], taskList.data[task]));
                }
            }
        }
    },

    viewCard: (element) => {
        const cardId = element.id;
        const cardList = element.dataset.list;
        window.location = `../Card/card.html?list=${cardList}&task=${cardId}`
    },

    start: () => {
        Board.fillLists();
    }
}