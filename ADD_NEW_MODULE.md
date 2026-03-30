# How to Add a New Module

This project uses a modular SPA architecture with `DataManager`, `Router`, and per-module manager files.

## Steps

1. Create module file:
   - Path: `src/modules/<YourModuleName>Manager.js`
   - Content: import `DataManager`, define templates, create `DataManager` instance, export manager.

2. Define `templates` object in your module:
   - `list(data)`
   - `details(item)`
   - `pickupList(data)` (optional)
   - `form(item)`
   - `default()`

3. Set module methods:
   - `add`, `edit`, `delete`, `view`, etc.
   - W/ `router.navigate('/yourroute')` as needed.

4. Optional: set default row click behavior using `defaultItemAction(id)` in DataManager options.

5. Add route handlers in `src/routes/index.js`:
   - `router.addRoute('/yourmodule', () => yourManager.listRoute());`
   - `router.addRoute('/yourmodule/add', () => yourManager.formRoute({}));`
   - `router.addRoute('/yourmodule/:id', (params) => yourManager.detailsRoute(params));`
   - `router.addRoute('/yourmodule/:id/edit', (params) => yourManager.formRoute(params));`

6. Register module in `src/app.js` for nav:
   - import manager: `import { yourManager } from './modules/YourModuleManager.js';`
   - add to `buildMenu([...your freshly created manager...])`.

7. Update `DataManager` methods if needed to handle specific actions.

8. Test:
   - `npm run dev`
   - Navigate to route and verify add/edit/delete and default display works.

## Good Practices

- Keep module-specific logic inside module only.
- Use semantic HTML + Tailwind utility classes.
- Keep `localStorage` key unique per module.
- Sync and persist on `add`/`update`/`remove` calls.
