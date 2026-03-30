// ==================== MODULE: Home Manager ====================
import { DataManager } from '../DataManager.js';

const homeTemplates = {
    list: () => '',
    details: () => '',
    pickupList: () => '',
    form: () => '',
    default: () => `
        <div class="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to DataManager SPA</h1>
            <p class="text-lg text-gray-600 mb-6">A simple Single Page Application built with JavaScript, DataManager, and Tailwind CSS.</p>
            <div class="space-y-4">
                <p class="text-gray-700">Manage your todos and notes efficiently with our intuitive interface.</p>
                <div class="flex justify-center space-x-4 mt-8">
                    <button data-action="goToTodos" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center">
                        <span class="mr-2">📝</span> View Todos
                    </button>
                    <button data-action="goToNotes" class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center">
                        <span class="mr-2">📓</span> View Notes
                    </button>
                </div>
            </div>
        </div>
    `
};

const homeManager = new DataManager({
    storageKey: 'home_app',
    initialData: [],
    container: document.getElementById('app'),
    templates: homeTemplates,
    methods: {
        goToTodos() { router.navigate('/todo'); },
        goToNotes() { router.navigate('/notes'); }
    }
});

// Add route handlers for Home
homeManager.listRoute = () => homeManager.renderList();
homeManager.detailsRoute = () => {};
homeManager.formRoute = () => {};
homeManager.pickupRoute = () => {};
homeManager.name = 'Home';

export { homeManager };