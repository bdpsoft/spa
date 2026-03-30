// ==================== MODULE: Notes Manager ====================
import { DataManager } from '../DataManager.js';

const notesTemplates = {
    list: (notes) => `
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span class="mr-2">📓</span> Notes
            </h2>
            <button data-action="add" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center mb-4">
                <span class="mr-2">➕</span> Add Note
            </button>
            <div class="space-y-3">
                ${notes.map(note => `
                    <div data-list-item-id="${note.id}" class="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:shadow-sm transition duration-200 cursor-pointer">
                        <div class="flex-1">
                            <strong class="text-gray-800 block mb-1">${note.title}</strong>
                            <span class="text-gray-600 text-sm">${note.content}</span>
                        </div>
                        <div class="flex space-x-2 ml-4">
                            <button data-action="edit" data-id="${note.id}" class="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm transition duration-200">✏️ Edit</button>
                            <button data-action="delete" data-id="${note.id}" class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm transition duration-200">🗑️ Delete</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `,
    details: () => '',
    pickupList: () => '',
    form: (note) => `
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">${note ? 'Edit Note' : 'Add New Note'}</h2>
            <form class="space-y-4">
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" id="title" name="title" placeholder="Title" value="${note ? note.title : ''}" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div>
                    <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea id="content" name="content" placeholder="Content" rows="4"
                              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">${note ? note.content : ''}</textarea>
                </div>
                ${note ? `<input type="hidden" name="id" value="${note.id}">` : ''}
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
                <span class="mr-2">📓</span> No Notes Yet
            </h2>
            <p class="text-lg text-gray-600 mb-6">Start jotting down your thoughts and ideas.</p>
            <button data-action="add" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center">
                <span class="mr-2">➕</span> Add Your First Note
            </button>
        </div>
    `
};

const notesManager = new DataManager({
    storageKey: 'notes_app',
    initialData: [],
    container: document.getElementById('app'),
    templates: notesTemplates,
    defaultItemAction(id) {
        router.navigate(`/notes/${id}/edit`);
    },
    methods: {
        add() { router.navigate('/notes/add'); },
        edit(id) { router.navigate(`/notes/${id}/edit`); },
        cancel() { router.navigate('/notes'); },
        delete(id) {
            if (confirm('Delete this note?')) {
                this.removeItem(id);
                this.renderList();
            }
        }
    }
});

notesManager.listRoute = () => notesManager.renderList();
notesManager.formRoute = (params) => {
    if (params.id) notesManager.renderForm(params.id);
    else notesManager.renderForm();
};
notesManager.name = 'Notes';

export { notesManager };