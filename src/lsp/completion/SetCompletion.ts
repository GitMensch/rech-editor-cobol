import { CompletionItemKind, CompletionItem, InsertTextFormat } from "vscode-languageserver";
import { CompletionInterface } from "./CompletionInterface";
import { CompletionUtils } from "../commons/CompletionUtils";

/**
 * Class to generate LSP Completion Items for Cobol 'set' clause
 */
export class SetCompletion implements CompletionInterface {

    public generate(_line: number, column: number, _lines: string[]): Promise<CompletionItem[]> {
        return new Promise((resolve) => {
            let text = "set" + CompletionUtils.fillMissingSpaces(20, column + 2) + "${0}";
            resolve(
                [{
                    label: 'Gerar comando SET',
                    detail: 'Gera o comando SET colocando o cursor na posição da primeira variável',
                    insertText: text,
                    insertTextFormat: InsertTextFormat.Snippet,
                    filterText: "set",
                    preselect: true,
                    kind: CompletionItemKind.Keyword
                }]
            );
        });
    }

}