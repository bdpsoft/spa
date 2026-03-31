// ==================== MODULE: Todo Manager ====================
import { DataManager } from '../DataManager.js';

const todoTemplates = {
    list: (todos) => `
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                    <span class="mr-2">📋</span> Todo List
                </h2>
                <button data-action="add" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center">
                    <span class="mr-2">➕</span> Add Todo
                </button>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
                <button data-action="filterAll" class="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded text-sm transition duration-200">All</button>
                <button data-action="filterActive" class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm transition duration-200">Active</button>
                <button data-action="filterCompleted" class="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm transition duration-200">Completed</button>
            </div>
            <div class="space-y-3">
                ${todos.map(todo => `
                    <div data-list-item-id="${todo.id}" class="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:shadow-sm transition duration-200 cursor-pointer">
                        <div class="flex-1 flex items-center">
                            <span class="text-lg mr-2">📝</span>
                            <div>
                                <span class="flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}">
                                    ${todo.title}
                                </span>
                            </div>
                        </div>  
                        <div class="flex space-x-2 ml-4">
                        <!--
                            <button data-action="view" data-id="${todo.id}" class="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded text-sm transition duration-200">📄 View</button>
                            <button data-action="edit" data-id="${todo.id}" class="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm transition duration-200">✏️ Edit</button>
                            <button data-action="delete" data-id="${todo.id}" class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm transition duration-200">🗑️ Delete</button>
                        -->
                            <button data-action="toggleComplete" data-id="${todo.id}" class="py-1 px-3 rounded text-sm transition duration-200 ${todo.completed ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-400 hover:bg-gray-500 text-white'}">
                                ${todo.completed ? '🔄 Undo' : '✅ Complete'}
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button data-action="showPickup" class="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center mt-4">
                <span class="mr-2">📦</span> Pickup List
            </button>
        </div>
    `,
    details: (todo) => `
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Todo Details</h2>
            <div class="space-y-3">
                <div class="border-b border-gray-200 pb-2">
                    <strong class="text-gray-600">Title:</strong>
                    <span class="ml-2 text-gray-800">${todo.title}</span>
                </div>
                <div class="border-b border-gray-200 pb-2">
                    <strong class="text-gray-600">Description:</strong>
                    <span class="ml-2 text-gray-800">${todo.description || 'No description'}</span>
                </div>
                <div class="border-b border-gray-200 pb-2">
                    <strong class="text-gray-600">Status:</strong>
                    <span class="ml-2 ${todo.completed ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'}">
                        ${todo.completed ? '✅ Completed' : '⏳ Pending'}
                    </span>
                </div>
            </div>
            <div class="flex space-x-3 mt-6">
                <button data-action="back" class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center">
                    <span class="mr-2">←</span> Back
                </button>
                <button data-action="edit" class="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center">
                    <span class="mr-2">✏️</span> Edit
                </button>
                <button data-action="delete" class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center">
                    <span class="mr-2">🗑️</span> Delete
                </button>
                <button data-action="toggleComplete" data-id="${todo.id}" class="py-2 px-4 rounded-lg font-medium transition duration-200 flex items-center ${todo.completed ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-400 hover:bg-gray-500 text-white'}">
                    <span class="mr-2">${todo.completed ? '🔄' : '✅'}</span>
                    ${todo.completed ? 'Undo' : 'Complete'}
                </button>
            </div>
        </div>
    `,
    pickupList: (todos) => `
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span class="mr-2">📦</span> Pickup List – Select Todos to Delete
            </h2>
            <button data-action="back" class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center mb-4">
                <span class="mr-2">←</span> Back
            </button>
            <div class="space-y-3 mb-4">
                ${todos.map(todo => `
                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center hover:shadow-sm transition duration-200">
                        <input type="checkbox" data-id="${todo.id}" id="pick-${todo.id}" class="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                        <label for="pick-${todo.id}" class="flex-1 text-gray-800 cursor-pointer">${todo.title}</label>
                    </div>
                `).join('')}
            </div>
            <button data-action="pickup" class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center">
                <span class="mr-2">🗑️</span> Delete Selected
            </button>
        </div>
    `,
    form: (todo) => `
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">${todo ? 'Edit Todo' : 'Add New Todo'}</h2>
            <form class="space-y-4">
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" id="title" name="title" placeholder="Title" value="${todo ? todo.title : ''}" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" name="description" placeholder="Description" rows="3"
                              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">${todo ? todo.description : ''}</textarea>
                </div>
                <div class="flex items-center">
                    <input type="checkbox" id="completed" name="completed" ${todo && todo.completed ? 'checked' : ''}
                           class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                    <label for="completed" class="ml-2 block text-sm text-gray-700">Completed</label>
                </div>
                ${todo ? `<input type="hidden" name="id" value="${todo.id}">` : ''}
                <div class="flex space-x-3 pt-4">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center">
                        <span class="mr-2">💾</span> Save
                    </button>
                    <button type="button" data-action="cancel" class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center">
                        <span class="mr-2">❌</span> Cancel
                    </button>
                </div>
            </form>
        </div>
    `,
    default: () => `
        <div class="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                <span class="mr-2">📝</span> No Todos Yet
            </h2>
            <p class="text-lg text-gray-600 mb-6">Get started by adding your first todo item.</p>
            <button data-action="add" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center">
                <span class="mr-2">➕</span> Add Your First Todo
            </button>
        </div>
    `
};

const todoManager = new DataManager({
    storageKey: 'todo_app',
    initialData: [],
    container: document.getElementById('app'),
    templates: todoTemplates,
    defaultItemAction(id) {
        router.navigate(`/todo/${id}`);
    },
    methods: {
        add() { router.navigate('/todo/add'); },
        view(id) { router.navigate(`/todo/${id}`); },
        edit(id) { router.navigate(`/todo/${id}/edit`); },
        showPickup() { router.navigate('/todo/pickup'); },
        back() { router.navigate('/todo'); },
        cancel() { router.navigate('/todo'); },
        delete(id) {
            if (confirm('Delete this todo?')) {
                this.removeItem(id);
                if (this.currentView === 'details') {
                    router.navigate('/todo');
                } else {
                    this.renderList();
                }
            }
        },
        toggleComplete(id) {
            const todo = this.data.find(item => item.id == id);
            if (todo) {
                todo.completed = !todo.completed;
                this.saveToLocalStorage();
                if (this.currentView === 'list') this.renderList();
                else if (this.currentView === 'details') this.renderDetails(id);
            }
        },
        filterAll() { this.clearFilter(); },
        filterActive() { this.setFilter(todo => !todo.completed); },
        filterCompleted() { this.setFilter(todo => todo.completed); }
    }
});

// Add route handlers for Todo
todoManager.listRoute = () => {
    todoManager.clearFilter();
    todoManager.renderList();
};
todoManager.detailsRoute = (params) => todoManager.renderDetails(params.id);
todoManager.formRoute = (params) => {
    if (params.id) todoManager.renderForm(params.id);
    else todoManager.renderForm();
};
todoManager.pickupRoute = () => todoManager.renderPickupList();
todoManager.name = 'Todo';

export { todoManager };