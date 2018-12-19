import { CompletionItemKind, CompletionItem, InsertTextFormat } from "vscode-languageserver";
import { CompletionInterface } from "./CompletionInterface";
import { CompletionUtils } from "../commons/CompletionUtils";
import { CobolVariable, Type } from "./CobolVariable";

// Cobol column for 'VALUE' clause declaration
const VALUE_COLUMN_DECLARATION = 51;

/**
 * Class to generate LSP Completion Items for Cobol value
 */
export class ValueCompletion implements CompletionInterface {

    public generate(line: number, column: number, lines: string[]): CompletionItem[] {
        let currentLineText = lines[line];
        let variable = CobolVariable.parseLine(currentLineText);
        let text = this.generateTextFromVariable(variable, column);
        return [{
            label: 'Completar declaração de VALUE',
            detail: 'Será inserida cláusula VALUE no lugar apropriado.',
            insertText: text,
            insertTextFormat: InsertTextFormat.Snippet,
            filterText: "value",
            preselect: true,
            kind: CompletionItemKind.Variable
        }];
    }

    /**
     * Generate the value text from the specified variable and column number
     *
     * @param variable Cobol variable
     * @param column column
     */
    private generateTextFromVariable(variable: CobolVariable, column: number): string {
        let text = CompletionUtils.fillMissingSpaces(VALUE_COLUMN_DECLARATION, column - 1);
        if (variable.getType() == Type.Alphanumeric) {
            text = text.concat("value is ${1:spaces}");
        } else {
            text = text.concat("value is ${1:zeros}");
            text = text.concat(this.createCompIfNeeded(variable));
        }
        text = text.concat(".");
        return text;
    }

    /**
     * Create comp or comp-x text if needed
     *
     * @param variable Cobol variable
     */
    private createCompIfNeeded(variable: CobolVariable): string {
        if (!variable.isDisplay()) {
            if (variable.getType() == Type.Decimal || variable.isAllowNegative()) {
                return " ${2:comp}";
            }
            return " ${2:comp-x}";
        }
        return "";
    }

}
