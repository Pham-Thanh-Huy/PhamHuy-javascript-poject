let data = [
    {
        task: 'Run 2km',
        complete: false
    }
];

//Viết Hàm lưu dữ liệu 
const SaveData = (data) => {
    return localStorage.setItem('ToDoList', JSON.stringify(data));
}
// SaveData(data);


//Viết Hàm lấy dữ liệu
const LoadData = () => {
    return JSON.parse(localStorage.getItem('ToDoList'));
}

window.addEventListener('load', function () {
    if (!LoadData()) {
        return;
    } else {
        return renderTask();
    }
})

const form = document.querySelector('#task-header');

// tạo ra hàm addTask 

const addTask = (task) => {
    let data = LoadData();
    if (!data) {
        data = []; // Nếu chưa có dữ liệu trong localStorage thì tạo một mảng trống
    }
    data.push(task);
    SaveData(data);
};


// tạo ra hàm render task

const renderTask = () => {
    let data = LoadData();
    const task = document.querySelector('.task');
    const taskHtml = data.map(function (element, index) {
        return ` <li class="task--content__li" complete = "${element.complete}">
        <span onclick ="TaskCheck(${index})" >${element.task}</span>
        <div class="task--content--change--delete">
            <button class="task_button--change" onclick = "changeTask(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                    stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
            <button class="task_button--delete" onclick = "deleteTask(this, ${index})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
        </div>
    </li>`;
    });
    const countCompleteTask = () => {
        let data = LoadData();
        let count = 0;
        if (data) {
            count = data.filter((element) => element.complete).length;
        }
        return count;
    };

    const taskCompleteCount = document.querySelector('#task--footer');
    taskCompleteCount.innerText = `Completed (${countCompleteTask()})`;
    task.innerHTML = taskHtml.join(" ");
}
const editTask = (UpdateTask, index) => {
    const btn = document.querySelector('.task__button');
    let data = LoadData();
    data[index].task = UpdateTask;
    SaveData(data);
    btn.innerText = 'ADD TASK'

}

// lắng nghe sự kiện khi ấn add task sẽ lưu dữ liệu từ dữ liệu nhập vào
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskAdd = document.querySelector('.task__input');
    const index = taskAdd.getAttribute('index');
    if (index) {
        editTask(taskAdd.value, index);
        taskAdd.removeAttribute('index')
    }
    else {
        if (!taskAdd.value.trim()) {
            return;
        }
        let AddnewTask =
        {
            task: taskAdd.value,
            complete: false
        };
        addTask(AddnewTask);
    }
    renderTask();
    document.querySelector('.task__input').value = "";

});




const deleteTask = (element, index) => {
    const questTionDeleteTask = confirm('Bạn có chắc chắn muốn xóa task này đi không ?');
    if (questTionDeleteTask) {
        let data = LoadData();
        data.splice(index, 1); // Xóa phần tử tại vị trí index
        SaveData(data); // Lưu lại mảng mới vào localStorage
        renderTask();
    } else {
        return;
    }

} // Render lại danh sách task sau khi xóa



const changeTask = (index) => {
    const Taskchange = document.querySelector('.task__input');
    const taskchangebtn = document.querySelector('.task__button');
    taskchangebtn.innerHTML = 'EDIT TASK';
    Taskchange.setAttribute('index', index);
    let data = LoadData();

    Taskchange.value = data[index].task;

}


// viết ra hàm checkTask
const TaskCheck = (index) => {
    let data = LoadData();
    data[index].complete = !data[index].complete;
    SaveData(data);
    renderTask();

}

// khi ấn esc thì sẽ out ra edit task và trở về addtask

document.addEventListener('keyup', function(e){
    const btn = document.querySelector('.task__button');
    const task = document.querySelector('.task__input');
    if(e.which == 27){
        task.removeAttribute('index');
        btn.innerText = "ADD TASK";
        document.querySelector('.task__input').value = " ";
    }
})
