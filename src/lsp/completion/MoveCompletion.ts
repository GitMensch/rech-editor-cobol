import { CompletionItemKind, CompletionItem, InsertTextFormat } from "vscode-languageserver";
import { CompletionInterface } from "./CompletionInterface";
import { CompletionUtils } from "../commons/CompletionUtils";

/**
 * Class to generate LSP Completion Items for Cobol 'move' clause
 */
export class MoveCompletion implements CompletionInterface {

    public generate(_line: number, column: number, _lines: string[]): Promise<CompletionItem[]> {
        return new Promise((resolve) => {
            let lineWithoutEnter = _lines[_line].replace("\r", "").replace("\n", "");
            let futureLine = CompletionUtils.replaceLastWord(lineWithoutEnter, "move");
            let text = "move" + CompletionUtils.fillSpacesFromWordEnd(20, column, futureLine) + "${0}";
            resolve(
                [{
                    label: 'MOVE command',
                    detail: 'Generates MOVE command and sets cursor on first variable',
                    insertText: text,
                    insertTextFormat: InsertTextFormat.Snippet,
                    filterText: "move mv",
                    preselect: true,
                    kind: CompletionItemKind.Keyword
                }]
            );
        });
    }

}