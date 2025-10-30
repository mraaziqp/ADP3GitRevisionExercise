package za.ac.cput.adp3gitrevisionexercise.codemind;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.StringJoiner;

/**
 * A structured view of the CodeMind.AI plan, combining original
 * requirements with improvements we identified while analysing the
 * provided specification.
 */
public final class ProjectBlueprint {

    private final String projectName;
    private final Map<String, List<Component>> componentsByLayer;
    private final List<String> nonFunctionalFocus;
    private final TestingPlan testingPlan;

    private ProjectBlueprint(Builder builder) {
        this.projectName = builder.projectName;
        Map<String, List<Component>> tmp = new LinkedHashMap<>();
        builder.componentsByLayer.forEach((layer, comps) ->
                tmp.put(layer, List.copyOf(comps))
        );
        this.componentsByLayer = Map.copyOf(tmp);
        this.nonFunctionalFocus = List.copyOf(builder.nonFunctionalFocus);
        this.testingPlan = builder.testingPlan;
    }

    public String getProjectName() {
        return projectName;
    }

    public List<Component> getComponentsByLayer(String layer) {
        return componentsByLayer.getOrDefault(layer, List.of());
    }

    public Map<String, List<Component>> getComponentsByLayer() {
        return componentsByLayer;
    }

    public List<String> getNonFunctionalFocus() {
        return nonFunctionalFocus;
    }

    public TestingPlan testingPlan() {
        return testingPlan;
    }

    public Optional<Component> findComponent(String componentName) {
        return componentsByLayer.values().stream()
                .flatMap(List::stream)
                .filter(component -> component.getName().equalsIgnoreCase(componentName))
                .findFirst();
    }

    public String generateSummary() {
        StringBuilder builder = new StringBuilder();
        builder.append("Blueprint for ").append(projectName).append(System.lineSeparator());
        builder.append("Layers:").append(System.lineSeparator());
        componentsByLayer.forEach((layer, components) -> {
            builder.append("- ").append(layer).append(':').append(System.lineSeparator());
            components.forEach(component -> {
                builder.append("  • ").append(component.getName()).append(" → ");
                StringJoiner joiner = new StringJoiner(", ");
                component.getResponsibilities().forEach(joiner::add);
                builder.append(joiner);
                if (!component.getEnhancements().isEmpty()) {
                    builder.append(" | Improvements: ");
                    builder.append(String.join(", ", component.getEnhancements()));
                }
                builder.append(System.lineSeparator());
            });
        });

        builder.append("Non-functional priorities:").append(System.lineSeparator());
        nonFunctionalFocus.forEach(focus ->
                builder.append("- ").append(focus).append(System.lineSeparator())
        );

        builder.append("Testing strategy highlights:").append(System.lineSeparator());
        appendSection(builder, "Backend", testingPlan.getBackendChecks());
        appendSection(builder, "Frontend", testingPlan.getFrontendChecks());
        appendSection(builder, "Integration", testingPlan.getIntegrationChecks());
        appendSection(builder, "Automation", testingPlan.getAutomationChecks());
        return builder.toString();
    }

    private void appendSection(StringBuilder builder, String title, List<String> checks) {
        builder.append("- ").append(title).append(':');
        if (checks.isEmpty()) {
            builder.append(" none");
        } else {
            builder.append(System.lineSeparator());
            checks.forEach(check ->
                    builder.append("  • ").append(check).append(System.lineSeparator())
            );
        }
    }

    public static Builder builder(String projectName) {
        return new Builder(projectName);
    }

    public static final class Builder {
        private final String projectName;
        private final Map<String, List<Component>> componentsByLayer = new LinkedHashMap<>();
        private final List<String> nonFunctionalFocus = new ArrayList<>();
        private TestingPlan testingPlan;

        private Builder(String projectName) {
            this.projectName = Objects.requireNonNull(projectName, "Project name is required");
        }

        public Builder addComponent(Component component) {
            componentsByLayer
                    .computeIfAbsent(component.getLayer(), key -> new ArrayList<>())
                    .add(component);
            return this;
        }

        public Builder addNonFunctionalFocus(String focus) {
            if (focus != null && !focus.isBlank()) {
                nonFunctionalFocus.add(focus.trim());
            }
            return this;
        }

        public Builder testingPlan(TestingPlan testingPlan) {
            this.testingPlan = Objects.requireNonNull(testingPlan, "Testing plan is required");
            return this;
        }

        public ProjectBlueprint build() {
            if (testingPlan == null) {
                throw new IllegalStateException("Testing plan must be provided");
            }
            return new ProjectBlueprint(this);
        }
    }
}
