package za.ac.cput.adp3gitrevisionexercise.codemind;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Represents a single building block in the CodeMind.AI ecosystem.
 * Components capture responsibilities and improvement ideas so that
 * the blueprint can be extended by future agent builders.
 */
public final class Component {

    private final String name;
    private final String layer;
    private final List<String> responsibilities;
    private final List<String> enhancements;

    private Component(Builder builder) {
        this.name = builder.name;
        this.layer = builder.layer;
        this.responsibilities = List.copyOf(builder.responsibilities);
        this.enhancements = List.copyOf(builder.enhancements);
    }

    public String getName() {
        return name;
    }

    public String getLayer() {
        return layer;
    }

    public List<String> getResponsibilities() {
        return responsibilities;
    }

    public List<String> getEnhancements() {
        return enhancements;
    }

    @Override
    public String toString() {
        return "Component{" +
                "name='" + name + '\'' +
                ", layer='" + layer + '\'' +
                ", responsibilities=" + responsibilities +
                ", enhancements=" + enhancements +
                '}';
    }

    /**
     * Builder helps us gradually capture knowledge from the original
     * spec while allowing the agent to inject improvements.
     */
    public static final class Builder {
        private final String name;
        private final String layer;
        private final List<String> responsibilities = new ArrayList<>();
        private final List<String> enhancements = new ArrayList<>();

        public Builder(String name, String layer) {
            this.name = Objects.requireNonNull(name, "Component name is required");
            this.layer = Objects.requireNonNull(layer, "Component layer is required");
        }

        public Builder addResponsibility(String responsibility) {
            if (responsibility != null && !responsibility.isBlank()) {
                responsibilities.add(responsibility.trim());
            }
            return this;
        }

        public Builder addEnhancement(String enhancement) {
            if (enhancement != null && !enhancement.isBlank()) {
                enhancements.add(enhancement.trim());
            }
            return this;
        }

        public Component build() {
            return new Component(this);
        }
    }

    public static Builder builder(String name, String layer) {
        return new Builder(name, layer);
    }
}
