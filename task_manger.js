// Load tasks from localStorage t
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const taskDesc = prompt('Enter a new task description:');
    if (taskDesc) {
        const task = {
            id: tasks.length + 1,
            desc: taskDesc,
            completed: false
        };
        tasks.push(task);
        saveTasks();
        console.log('Task added successfully.');
    }
}

// View all tasks
function viewTasks() {
    if (tasks.length === 0) {
        console.log('No tasks available.');
    } else {
        console.log('Tasks:');
        tasks.forEach(task => {
            console.log(`${task.id}. ${task.desc} [${task.completed ? 'Completed' : 'Pending'}]`);
        });
    }
}

// Toggle task completion
function toggleTask() {
    const id = parseInt(prompt('Enter the task ID to toggle completion:'));
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        console.log(`Task ${id} marked as ${task.completed ? 'Completed' : 'Pending'}.`);
    } else {
        console.log('Task not found.');
    }
}

// Delete a task
function deleteTask() {
    const id = parseInt(prompt('Enter the task ID to delete:'));
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        // Reassign task IDs after deletion
        tasks.forEach((task, index) => task.id = index + 1);
        saveTasks();
        console.log(`Task ${id} deleted.`);
    } else {
        console.log('Task not found.');
    }
}

// Update task description
function updateTask() {
    const id = parseInt(prompt('Enter the task ID to update:'));
    const task = tasks.find(t => t.id === id);
    if (task) {
        const newDesc = prompt('Enter the new task description:');
        task.desc = newDesc;
        saveTasks();
        console.log(`Task ${id} updated.`);
    } else {
        console.log('Task not found.');
    }
}

// Search tasks by description
function searchTasks() {
    const query = prompt('Enter a search term:').toLowerCase();
    const filteredTasks = tasks.filter(t => t.desc.toLowerCase().includes(query));
    if (filteredTasks.length > 0) {
        console.log('Search Results:');
        filteredTasks.forEach(task => {
            console.log(`${task.id}. ${task.desc} [${task.completed ? 'Completed' : 'Pending'}]`);
        });
    } else {
        console.log('No tasks match the search query.');
    }
}

// Display the menu and handle user input
function showMenu() {
    let choice;
    do {
        console.log(`
Task Manager
1. Add Task
2. View Tasks
3. Toggle Task Completion
4. Delete Task
5. Update Task
6. Search Tasks
7. Exit
`);

        choice = prompt('Please enter a number (1-7):');
        if (choice !== null) {
            choice = parseInt(choice); // Convert the input to an integer
            switch (choice) {
                case 1:
                    addTask();
                    break;
                case 2:
                    viewTasks();
                    break;
                case 3:
                    toggleTask();
                    break;
                case 4:
                    deleteTask();
                    break;
                case 5:
                    updateTask();
                    break;
                case 6:
                    searchTasks();
                    break;
                case 7:
                    console.log('Exiting Task Manager. Goodbye!');
                    break;
                default:
                    console.log('Invalid choice. Please enter a number between 1 and 7.');
            }
        }
    } while (choice !== 7);
}

// Start the task manager
showMenu();
