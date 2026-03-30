// ==================== MODULE: Router Setup ====================
import { Router } from './Router.js';
import { configureRoutes } from './routes/index.js';

const router = new Router();

// Configure all routes
configureRoutes(router);

// ==================== MODULE: Menu Builder ====================
function buildMenu(modules) {
    const navMenu = document.getElementById('nav-menu');
    navMenu.innerHTML = ''; // Clear existing menu

    const ul = document.createElement('ul');
    ul.className = 'flex space-x-2 m-0 p-0 list-none';

    modules.forEach(module => {
        const li = document.createElement('li');
        li.className = 'list-none';
        const a = document.createElement('a');
        a.textContent = module.name;
        a.href = '#';
        a.className = 'text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-gray-50';
        a.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate(`/${module.name.toLowerCase()}`);
        });
        li.appendChild(a);
        ul.appendChild(li);
    });

    navMenu.appendChild(ul);
}

// Import managers for menu building
import { todoManager } from './modules/TodoManager.js';
import { notesManager } from './modules/NotesManager.js';
import { homeManager } from './modules/HomeManager.js';
import { aboutManager } from './modules/AboutManager.js';

// Build menu with all modules
buildMenu([homeManager, todoManager, notesManager, aboutManager]);

// Start the router
router.handleLocation();

// Initialize currentManager to homeManager if not set
if (!window.currentManager) {
    window.currentManager = homeManager;
}

// Make router globally available for the managers
window.router = router;