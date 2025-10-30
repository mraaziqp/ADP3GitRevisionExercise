package za.ac.cput.adp3gitrevisionexercise.codemind;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CodeMindBlueprintBuilderTest {

    private ProjectBlueprint blueprint;

    @BeforeEach
    void setUp() {
        blueprint = CodeMindBlueprintBuilder.createDefaultBlueprint();
    }

    @Test
    void ensuresObservabilityComponentIsPresent() {
        assertTrue(blueprint.findComponent("Observability & Telemetry").isPresent(),
                "Observability component should be part of the improved blueprint");
        Component component = blueprint.findComponent("Observability & Telemetry").orElseThrow();
        assertTrue(component.getEnhancements().contains("Integrate OpenTelemetry traces and metrics dashboards"));
    }

    @Test
    void summaryHighlightsNonFunctionalPriorities() {
        String summary = blueprint.generateSummary();
        assertTrue(summary.contains("Non-functional priorities"));
        assertTrue(summary.contains("Observability hooks to trace AI decisions"));
    }

    @Test
    void testingPlanIncludesSecurityAutomation() {
        assertTrue(blueprint.testingPlan().getAutomationChecks()
                .contains("Security scanning (Bandit, npm audit, OWASP Zap)"));
    }
}
