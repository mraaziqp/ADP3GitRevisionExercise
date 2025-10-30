package za.ac.cput.adp3gitrevisionexercise.codemind;

/**
 * Simple CLI entry point that prints the enriched blueprint so
 * engineers can quickly review or hand it off to another agent.
 */
public final class CodeMindBlueprintPrinter {

    private CodeMindBlueprintPrinter() {
    }

    public static void main(String[] args) {
        ProjectBlueprint blueprint = CodeMindBlueprintBuilder.createDefaultBlueprint();
        System.out.println(blueprint.generateSummary());
    }
}
