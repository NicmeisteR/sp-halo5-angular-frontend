
# WaypointTerminal

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.2.

---

## Architecture: Angular 21 Official Best Practices

This project follows Angular's official recommendations for scalable, maintainable applications.

### Why Feature-First Structure?
- **Simplicity:** Organizes code by feature, making it easy to find and reason about.
- **Scalability:** New features are added in their own folders, reducing merge conflicts and code tangling.
- **Separation of Concerns:** Keeps feature logic, shared utilities, and app-wide services clearly separated.
- **Modern Angular:** Uses standalone components, signals, and lazy-loaded feature routes.

### Recommended Project Structure

```
src/app/
	features/         # Each feature in its own folder
		users/
			user-list/
				user-list.component.ts
				user-list.component.html
			user-detail/
				user-detail.component.ts
				user-detail.component.html
			user.service.ts
		dashboard/
			dashboard.component.ts
			dashboard.service.ts
	shared/           # Shared components, pipes, directives, and models
		components/
		pipes/
		directives/
		models/
	core/             # Singleton services, app-wide utilities, guards, interceptors
		services/
		guards/
		interceptors/
	app.config.ts
	app.routes.ts
	app.ts
```

### Best Practices
- Use standalone components and signals for state management
- Organize by feature, not by type
- Place feature-specific services in their feature folders
- Use `shared/` for truly reusable code
- Use `core/` for singleton services and app-wide utilities
- Prefer inline templates for small components
- Use signals and computed for state, avoid `any` type

#### References
- [Angular Application Structure](https://angular.dev/guide/structure)
- [Angular Standalone Components](https://angular.io/guide/standalone-components)

## Component Generation Script:
ng generate component features/service-records/arena/arena --standalone --flat --export

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
