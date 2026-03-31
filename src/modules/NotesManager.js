// ==================== MODULE: Notes Manager ====================
import { DataManager } from '../DataManager.js';

const notesTemplates = {
    listHeader: () => `
        <div class="bg-white rounded-2xl p-6 shadow-sm mb-5 border border-gray-200">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 class="text-3xl font-bold text-gray-900 flex items-center gap-2"><span>📓</span> Notes</h2>
                    <p class="text-sm text-gray-500">Quickly find notes with search and keep your ideas organised.</p>
                </div>
                <button data-action="add" class="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">➕ Add Note</button>
            </div>
            <div class="mt-4">
                <input type="text" data-action="search" placeholder="Search notes..." value="${notesManager.searchQuery || ''}" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            </div>
        </div>
    `,
    listItem: (note) => `
        <div data-list-item-id="${note.id}" class="bg-white border border-gray-200 rounded-2xl p-5 flex justify-between items-start hover:shadow-xl transition cursor-pointer">
            <div class="flex-1">
                <div class="flex items-center gap-2">
                    <span>📝</span>
                    <h3 class="text-lg font-bold text-gray-900">${note.title}</h3>
                </div>
                <p class="text-sm text-gray-600 mt-2">${note.content}</p>
            </div>
            <div class="flex flex-col gap-2 ml-4">
                <button data-action="edit" data-id="${note.id}" class="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">✏️ Edit</button>
                <button data-action="delete" data-id="${note.id}" class="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">🗑️ Delete</button>
            </div>
        </div>
    `,
    listFooter: () => `
        <div class="mt-4 text-right">
            <span class="text-sm text-gray-500">Total notes: </span><span class="font-semibold text-gray-900">${notesManager.data.length}</span>
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
        },
        search(event) {
            const query = event.target.value.toLowerCase();
            this.searchQuery = query; // retain current search text across re-renders

            if (query.trim() === '') {
                this.clearFilter();
            } else {
                this.setFilter(note => 
                    note.title.toLowerCase().includes(query) || 
                    note.content.toLowerCase().includes(query)
                );
            }
        },
        clearFilter() {
            this.searchQuery = '';
            DataManager.prototype.clearFilter.call(this);
        }
    }
});

notesManager.listRoute = () => {
    notesManager.clearFilter();
    notesManager.renderList();
};
notesManager.formRoute = (params) => {
    if (params.id) notesManager.renderForm(params.id);
    else notesManager.renderForm();
};
notesManager.searchQuery = '';
notesManager.name = 'Notes';

export { notesManager };