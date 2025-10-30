package za.ac.cput.adp3gitrevisionexercise.codemind;

import java.util.ArrayList;
import java.util.List;

/**
 * Captures how the CodeMind.AI blueprint validates quality.
 */
public final class TestingPlan {

    private final List<String> backendChecks;
    private final List<String> frontendChecks;
    private final List<String> integrationChecks;
    private final List<String> automationChecks;

    private TestingPlan(Builder builder) {
        this.backendChecks = List.copyOf(builder.backendChecks);
        this.frontendChecks = List.copyOf(builder.frontendChecks);
        this.integrationChecks = List.copyOf(builder.integrationChecks);
        this.automationChecks = List.copyOf(builder.automationChecks);
    }

    public List<String> getBackendChecks() {
        return backendChecks;
    }

    public List<String> getFrontendChecks() {
        return frontendChecks;
    }

    public List<String> getIntegrationChecks() {
        return integrationChecks;
    }

    public List<String> getAutomationChecks() {
        return automationChecks;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static final class Builder {
        private final List<String> backendChecks = new ArrayList<>();
        private final List<String> frontendChecks = new ArrayList<>();
        private final List<String> integrationChecks = new ArrayList<>();
        private final List<String> automationChecks = new ArrayList<>();

        private Builder() {
        }

        public Builder addBackendCheck(String check) {
            add(check, backendChecks);
            return this;
        }

        public Builder addFrontendCheck(String check) {
            add(check, frontendChecks);
            return this;
        }

        public Builder addIntegrationCheck(String check) {
            add(check, integrationChecks);
            return this;
        }

        public Builder addAutomationCheck(String check) {
            add(check, automationChecks);
            return this;
        }

        private void add(String check, List<String> target) {
            if (check != null && !check.isBlank()) {
                target.add(check.trim());
            }
        }

        public TestingPlan build() {
            return new TestingPlan(this);
        }
    }
}
