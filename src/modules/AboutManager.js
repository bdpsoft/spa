// ==================== MODULE: About Manager ====================
import { DataManager } from '../DataManager.js';

const aboutTemplates = {
    list: () => '',
    details: () => '',
    pickupList: () => '',
    form: () => '',
    default: () => `
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span class="mr-2">ℹ️</span> About This Application
            </h2>
            <div class="space-y-4 text-gray-700">
                <p>This is a Single Page Application (SPA) built using modern web technologies:</p>
                <ul class="list-disc list-inside space-y-2 ml-4">
                    <li><strong>JavaScript (ES6+):</strong> Core programming language</li>
                    <li><strong>DataManager:</strong> Custom class for managing data, views, and CRUD operations</li>
                    <li><strong>Router:</strong> Handles client-side routing with parameters</li>
                    <li><strong>Tailwind CSS:</strong> Utility-first CSS framework for styling</li>
                    <li><strong>localStorage:</strong> For persistent data storage</li>
                </ul>
                <p class="mt-4">Features include:</p>
                <ul class="list-disc list-inside space-y-2 ml-4">
                    <li>Todo management with completion tracking</li>
                    <li>Notes taking and editing</li>
                    <li>Responsive design</li>
                    <li>Client-side routing</li>
                </ul>
                <p class="mt-4">Built with a modular architecture for easy extension and maintenance.</p>
            </div>
        </div>
    `
};

const aboutManager = new DataManager({
    storageKey: 'about_app',
    initialData: [],
    container: document.getElementById('app'),
    templates: aboutTemplates,
    methods: {}
});

// Add route handlers for About
aboutManager.listRoute = () => aboutManager.renderList();
aboutManager.detailsRoute = () => {};
aboutManager.formRoute = () => {};
aboutManager.pickupRoute = () => {};
aboutManager.name = 'About';

export { aboutManager };