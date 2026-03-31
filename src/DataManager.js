// ==================== MODULE: DataManager ====================
export class DataManager {
    constructor(options) {
        this.storageKey = options.storageKey || 'app_data';
        this.data = options.initialData || [];
        this.container = options.container;
        this.templates = options.templates;
        this.onSync = options.onSync || null;

        // Attach custom methods
        if (options.methods) {
            Object.entries(options.methods).forEach(([name, fn]) => {
                if (typeof fn === 'function') {
                    this[name] = fn.bind(this);
                }
            });
        }

        // Set default click action for list items (can be overridden per module)
        if (typeof options.defaultItemAction === 'function') {
            this.defaultItemAction = options.defaultItemAction.bind(this);
        } else {
            this.defaultItemAction = (id) => {
                if (typeof this.view === 'function') {
                    this.view(id);
                } else {
                    console.warn('Default item action is not defined, and view() is unavailable.');
                }
            };
        }

        this.loadFromLocalStorage();
        this.currentView = null;
        this.currentItemId = null;

        this.handleAdd = this.handleAdd.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handlePickup = this.handlePickup.bind(this);

        // Add focus event listener to redraw current view on window focus
        window.addEventListener('focus', () => {
            if (window.currentManager === this) {
                this.renderCurrentView();
            }
        });
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                this.data = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse localStorage data', e);
            }
        }
    }

    reorderItem(fromId, toId) {
        const fromIndex = this.data.findIndex(item => item.id == fromId);
        const toIndex = this.data.findIndex(item => item.id == toId);
        if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;

        const [moved] = this.data.splice(fromIndex, 1);
        this.data.splice(toIndex, 0, moved);
        this.saveToLocalStorage();
    }

    setupDragAndDrop() {
        this.container.querySelectorAll('[data-list-item-id]').forEach(itemEl => {
            itemEl.setAttribute('draggable', 'true');

            itemEl.addEventListener('dragstart', (event) => {
                event.stopPropagation();
                const id = itemEl.getAttribute('data-list-item-id');
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/plain', id);
                itemEl.classList.add('opacity-50');
            });

            itemEl.addEventListener('dragend', () => {
                itemEl.classList.remove('opacity-50');
            });

            itemEl.addEventListener('dragover', (event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'move';
                itemEl.classList.add('bg-blue-100');
            });

            itemEl.addEventListener('dragleave', () => {
                itemEl.classList.remove('bg-blue-100');
            });

            itemEl.addEventListener('drop', (event) => {
                event.preventDefault();
                itemEl.classList.remove('bg-blue-100');
                const draggedId = event.dataTransfer.getData('text/plain');
                const targetId = itemEl.getAttribute('data-list-item-id');
                if (draggedId && targetId && draggedId !== targetId) {
                    this.reorderItem(draggedId, targetId);
                    this.renderList();
                }
            });
        });
    }

    saveToLocalStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    addItem(item) {
        if (!item.id) {
            item.id = Date.now() + '-' + Math.random().toString(36).substr(2, 6);
        }
        this.data.push(item);
        this.saveToLocalStorage();
        return item;
    }

    updateItem(id, updates) {
        const index = this.data.findIndex(item => item.id == id);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], ...updates };
            this.saveToLocalStorage();
            return this.data[index];
        }
        return null;
    }

    removeItem(id) {
        const initialLength = this.data.length;
        this.data = this.data.filter(item => item.id != id);
        if (this.data.length !== initialLength) {
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    async sync() {
        if (this.onSync) {
            await this.onSync(this.data);
            this.saveToLocalStorage();
        }
    }

    renderList() {
        // Always load latest data from localStorage before rendering list
        this.loadFromLocalStorage();
        if (!this.templates.list) return;
        if (this.data.length === 0 && this.templates.default) {
            this.renderDefault();
        } else {
            const content = this.templates.list(this.data);
            this.render(content);
            this.currentView = 'list';
            this.currentItemId = null;
            this.bindActions();

            // Attach list-item click action for default behavior
            this.container.querySelectorAll('[data-list-item-id]').forEach(itemEl => {
                itemEl.onclick = (e) => {
                    if (e.defaultPrevented) return;
                    const id = itemEl.getAttribute('data-list-item-id');
                    if (id && typeof this.defaultItemAction === 'function') {
                        this.defaultItemAction(id);
                    }
                };
            });

            // Setup drag-and-drop reordering if supported
            this.setupDragAndDrop();
        }
    }

    renderDetails(id) {
        const item = this.data.find(i => i.id == id);
        if (!item || !this.templates.details) return;
        const content = this.templates.details(item);
        this.render(content);
        this.currentView = 'details';
        this.currentItemId = id;
        this.bindActions();
    }

    renderPickupList() {
        if (!this.templates.pickupList) return;
        const content = this.templates.pickupList(this.data);
        this.render(content);
        this.currentView = 'pickuplist';
        this.currentItemId = null;
        this.bindActions();
    }

    renderForm(id = null) {
        const item = id ? this.data.find(i => i.id == id) : null;
        if (!this.templates.form) return;
        const content = this.templates.form(item);
        this.render(content);
        this.currentView = 'form';
        this.currentItemId = id;
        this.bindActions();
    }

    renderDefault() {
        if (!this.templates.default) return;
        const content = this.templates.default();
        this.render(content);
        this.currentView = 'default';
        this.currentItemId = null;
        this.bindActions();
    }

    render(content) {
        if (typeof content === 'string') {
            this.container.innerHTML = content;
        } else if (content instanceof Node) {
            this.container.innerHTML = '';
            this.container.appendChild(content);
        } else {
            console.warn('Invalid template output');
        }
    }

    bindActions() {
        // Bind all elements with data-action attribute to the corresponding method
        this.container.querySelectorAll('[data-action]').forEach(el => {
            const action = el.getAttribute('data-action');
            const method = this[action];
            if (typeof method === 'function') {
                el.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const id = el.getAttribute('data-id');
                    if (id !== null) {
                        method.call(this, id);
                    } else {
                        method.call(this);
                    }
                };
            }
        });

        // Handle forms separately
        const form = this.container.querySelector('form');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                // Convert checkboxes: if value is "on", treat as true
                for (let [key, value] of formData.entries()) {
                    if (value === 'on') data[key] = true;
                }
                if (this.currentItemId) {
                    this.handleUpdate(this.currentItemId, data);
                } else {
                    this.handleAdd(data);
                }
            };
        }
    }

    handleAdd(data) {
        this.addItem(data);
        this.renderList();
    }

    handleUpdate(id, data) {
        this.updateItem(id, data);
        this.renderList();
    }

    handleRemove(id) {
        if (confirm('Are you sure?')) {
            this.removeItem(id);
            if (this.currentView === 'details' && this.currentItemId == id) {
                this.renderList();
            } else {
                this.renderList();
            }
        }
    }

    handlePickup() {
        const selected = [];
        this.container.querySelectorAll('input[type="checkbox"][data-id]:checked').forEach(cb => {
            selected.push(cb.getAttribute('data-id'));
        });
        if (selected.length && confirm(`Delete ${selected.length} item(s)?`)) {
            selected.forEach(id => this.removeItem(id));
            this.renderPickupList();
        }
    }

    renderCurrentView() {
        switch (this.currentView) {
            case 'list':
                this.renderList();
                break;
            case 'details':
                this.renderDetails(this.currentItemId);
                break;
            case 'pickuplist':
                this.renderPickupList();
                break;
            case 'form':
                this.renderForm(this.currentItemId);
                break;
            case 'default':
                this.renderDefault();
                break;
            default:
                this.renderList(); // Fallback to list if no view set
        }
    }
}