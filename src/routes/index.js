// ==================== MODULE: Routes Configuration ====================
import { todoManager } from '../modules/TodoManager.js';
import { notesManager } from '../modules/NotesManager.js';
import { homeManager } from '../modules/HomeManager.js';
import { aboutManager } from '../modules/AboutManager.js';

export function configureRoutes(router) {
    // Home routes
    router.addRoute('/home', () => {
        window.currentManager = homeManager;
        homeManager.listRoute();
    });

    // Todo routes
    router.addRoute('/todo', () => {
        window.currentManager = todoManager;
        todoManager.listRoute();
    });
    router.addRoute('/todo/add', () => {
        window.currentManager = todoManager;
        todoManager.formRoute({});
    });
    router.addRoute('/todo/:id', (params) => {
        window.currentManager = todoManager;
        todoManager.detailsRoute(params);
    });
    router.addRoute('/todo/:id/edit', (params) => {
        window.currentManager = todoManager;
        todoManager.formRoute(params);
    });
    router.addRoute('/todo/pickup', () => {
        window.currentManager = todoManager;
        todoManager.pickupRoute();
    });

    // Notes routes
    router.addRoute('/notes', () => {
        window.currentManager = notesManager;
        notesManager.listRoute();
    });
    router.addRoute('/notes/add', () => {
        window.currentManager = notesManager;
        notesManager.formRoute({});
    });
    router.addRoute('/notes/:id/edit', (params) => {
        window.currentManager = notesManager;
        notesManager.formRoute(params);
    });

    // About routes
    router.addRoute('/about', () => {
        window.currentManager = aboutManager;
        aboutManager.listRoute();
    });

    // Default route
    router.addRoute('/', () => router.navigate('/home', true));
}