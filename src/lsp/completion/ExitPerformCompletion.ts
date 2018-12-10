import { CompletionItemKind, CompletionItem, InsertTextFormat } from "vscode-languageserver";
import { CompletionInterface } from "./CompletionInterface";
import { CompletionUtils } from "../commons/CompletionUtils";

/**
 * Class to generate LSP Completion Items for Cobol 'exit perform' clause
 */
export class ExitPerformCompletion implements CompletionInterface {

    public generate(_line: number, column: number, _lines: string[]): CompletionItem[] {
        let text = "EXIT" + CompletionUtils.fillMissingSpaces(35, column + 3) + "PERFORM" + CompletionUtils.separatorForColumn(column);
        return [{
            label: 'Gerar comando EXIT PERFORM',
            detail: 'Gera o comando EXIT PERFORM para sair do laço atual',
            insertText: text,
            insertTextFormat: InsertTextFormat.Snippet,
            filterText: "EXIT PERFORM XP",
            preselect: true,
            kind: CompletionItemKind.Keyword
        }];
    }

}