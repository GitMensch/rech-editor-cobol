import { CompletionItemKind, CompletionItem, InsertTextFormat } from "vscode-languageserver";
import { CompletionInterface } from "./CompletionInterface";
import { CompletionUtils } from "../commons/CompletionUtils";

/**
 * Class to generate LSP Completion Items for Cobol 'perform' clause
 */
export class PerformCompletion implements CompletionInterface {

    public generate(_line: number, column: number, _lines: string[]): Promise<CompletionItem[]> {
        return new Promise((resolve) => {
            let text = "perform" + CompletionUtils.fillMissingSpaces(35, column + 6) + "${0}" + CompletionUtils.separatorForColumn(column);
            resolve(
                [{
                    label: 'Gerar comando PERFORM',
                    detail: 'Gera o comando PERFORM para chamada do parágrafo.',
                    insertText: text,
                    insertTextFormat: InsertTextFormat.Snippet,
                    filterText: "pe perform",
                    preselect: true,
                    kind: CompletionItemKind.Keyword
                }]
            );
        });
    }

}