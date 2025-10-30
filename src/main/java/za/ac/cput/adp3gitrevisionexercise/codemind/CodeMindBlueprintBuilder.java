package za.ac.cput.adp3gitrevisionexercise.codemind;

/**
 * Generates an enriched blueprint derived from the provided
 * CodeMind.AI specification.
 */
public final class CodeMindBlueprintBuilder {

    private static final String PROJECT_NAME = "CodeMind.AI";

    private CodeMindBlueprintBuilder() {
        // utility class
    }

    public static ProjectBlueprint createDefaultBlueprint() {
        ProjectBlueprint.Builder builder = ProjectBlueprint.builder(PROJECT_NAME);

        builder
                .addComponent(Component.builder("Auth Router", "Backend")
                        .addResponsibility("Register and authenticate users with JWT")
                        .addResponsibility("Hash passwords using bcrypt")
                        .addEnhancement("Add refresh tokens and configurable password policies")
                        .build())
                .addComponent(Component.builder("CodeMind AI Router", "Backend")
                        .addResponsibility("Accept code samples and orchestrate analysis")
                        .addResponsibility("Aggregate lint results and AI suggestions")
                        .addEnhancement("Pluggable analyzers so new languages can be introduced without redeploying the API")
                        .build())
                .addComponent(Component.builder("Projects Router", "Backend")
                        .addResponsibility("Persist project metadata and histories")
                        .addEnhancement("Support team workspaces with role-based access control")
                        .build())
                .addComponent(Component.builder("Script Sandbox", "Backend")
                        .addResponsibility("Execute code samples securely with timeouts")
                        .addEnhancement("Isolated container runner with resource quotas")
                        .build())
                .addComponent(Component.builder("Observability & Telemetry", "Backend")
                        .addResponsibility("Expose health and readiness endpoints")
                        .addEnhancement("Integrate OpenTelemetry traces and metrics dashboards")
                        .addEnhancement("Provide audit logging for analysis actions")
                        .build());

        builder
                .addComponent(Component.builder("Dashboard Shell", "Frontend")
                        .addResponsibility("Host micro-apps and navigation")
                        .addEnhancement("Skeleton states for slow network connections")
                        .build())
                .addComponent(Component.builder("Authentication Flows", "Frontend")
                        .addResponsibility("Provide register and login forms")
                        .addEnhancement("Integrate password strength indicators and social login hooks")
                        .build())
                .addComponent(Component.builder("Code Editor", "Frontend")
                        .addResponsibility("Allow users to edit code with syntax highlighting")
                        .addEnhancement("Share Monaco editor preferences across sessions")
                        .build())
                .addComponent(Component.builder("Analysis Workspace", "Frontend")
                        .addResponsibility("Display lint, AI output and optimization suggestions")
                        .addEnhancement("Provide diff view comparing original and fixed code")
                        .build())
                .addComponent(Component.builder("Visual Experience", "Frontend")
                        .addResponsibility("Render ambient animations like Sora Orb and Particle Canvas")
                        .addEnhancement("Offer reduced motion and high-contrast accessibility modes")
                        .build());

        builder
                .addComponent(Component.builder("Data Layer", "Infrastructure")
                        .addResponsibility("Manage PostgreSQL / SQLite connections and migrations")
                        .addEnhancement("Introduce migration versioning and automated rollbacks")
                        .build())
                .addComponent(Component.builder("Containerization", "Infrastructure")
                        .addResponsibility("Provide Docker images for backend and frontend")
                        .addEnhancement("Add multi-stage builds and health-check instructions")
                        .build())
                .addComponent(Component.builder("CI/CD", "Infrastructure")
                        .addResponsibility("Run automated tests on each commit")
                        .addEnhancement("Publish coverage reports and dependency insights")
                        .build())
                .addComponent(Component.builder("Security & Compliance", "Infrastructure")
                        .addResponsibility("Enforce linting, auditing and vulnerability scans")
                        .addEnhancement("Implement rate-limiting and secret rotation guidance")
                        .build());

        builder.addNonFunctionalFocus("Async-first API calls for responsive analysis queues");
        builder.addNonFunctionalFocus("Scalable micro-frontend structure for future agent tooling");
        builder.addNonFunctionalFocus("Observability hooks to trace AI decisions");
        builder.addNonFunctionalFocus("Security hardening with least-privilege defaults");

        builder.testingPlan(defaultTestingPlan());

        return builder.build();
    }

    private static TestingPlan defaultTestingPlan() {
        return TestingPlan.builder()
                .addBackendCheck("Pytest-powered FastAPI route coverage with HTTPX client")
                .addBackendCheck("Database migrations smoke tests")
                .addFrontendCheck("Jest + React Testing Library component coverage")
                .addFrontendCheck("Lint budget enforcement with ESLint and Prettier")
                .addIntegrationCheck("Playwright E2E for register → analyze happy path")
                .addIntegrationCheck("Docker Compose smoke test for health endpoints")
                .addAutomationCheck("Security scanning (Bandit, npm audit, OWASP Zap)")
                .addAutomationCheck("GitHub Actions pipeline with caching and artifacts")
                .build();
    }
}
