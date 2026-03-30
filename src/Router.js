// ==================== MODULE: Router ====================
export class Router {
    constructor() {
        this.routes = [];
        window.addEventListener('popstate', () => this.handleLocation());
    }

    addRoute(pattern, handler) {
        this.routes.push({ pattern, handler });
    }

    matchRoute(path) {
        for (let route of this.routes) {
            const patternParts = route.pattern.split('/');
            const pathParts = path.split('/');
            if (patternParts.length !== pathParts.length) continue;

            const params = {};
            let match = true;
            for (let i = 0; i < patternParts.length; i++) {
                if (patternParts[i].startsWith(':')) {
                    params[patternParts[i].slice(1)] = pathParts[i];
                } else if (patternParts[i] !== pathParts[i]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return { handler: route.handler, params };
            }
        }
        return null;
    }

    handleLocation() {
        const path = window.location.pathname;
        const match = this.matchRoute(path);
        if (match) {
            match.handler(match.params);
        } else {
            console.warn('No route matched for', path);
        }
    }

    navigate(path, replace = false) {
        if (replace) {
            window.history.replaceState(null, '', path);
        } else {
            window.history.pushState(null, '', path);
        }
        this.handleLocation();
    }
}