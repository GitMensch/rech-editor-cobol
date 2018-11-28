import { CobolDoc } from "./CobolDoc";
import { DocElement } from "./DocElement";

/**
 * Class to parse Cobol paragraph and variable documentations
 */
export class CobolDocParser {

    /**
     * Parses the specified documentation
     */
    public parseCobolDoc(documentation: string[]): CobolDoc {
        if (this.isRechDoc(documentation)) {
            return this.extractRechDoc(documentation);
        }
        return this.extractDefaultDoc(documentation);
    }

    /**
     * Extracts Cobol documentation in RechDoc format
     * 
     * @param documentation unparsed documentation
     */
    private extractRechDoc(documentation: string[]): CobolDoc {
        let comment = "";
        let params: DocElement[] = [];
        let returns: DocElement[] = [];
        let throws: DocElement[] = [];
        let parsingRechDoc = false;
        let extractingComment = false;
        documentation.forEach((currentLine) => {
            if (currentLine.trim().startsWith("*>/**")) {
                parsingRechDoc = true;
                extractingComment = true;
            } else {
                if (currentLine.trim().startsWith("*>*/")) {
                    parsingRechDoc = false;
                }
                if (parsingRechDoc) {
                    if (currentLine.match(/@param/)) {
                        this.updateDocElement(params, currentLine);
                        extractingComment = false;
                    }
                    if (currentLine.match(/@return/)) {
                        extractingComment = false;
                        this.updateDocElement(returns, currentLine);
                    }
                    if (currentLine.match(/@throws/)) {
                        extractingComment = false;
                        this.updateDocElement(throws, currentLine);
                    }
                    if (currentLine.match(/(@enum|@optional|@default|@extends)/)) {
                        extractingComment = false;
                    }
                    if (extractingComment) {
                        let currentComment = currentLine.replace("*>", "").trim();
                        if (currentComment.length == 0) {
                            comment.concat("\n\n");
                        } else {
                            comment = comment.concat(currentComment).concat(" ");
                        }
                    }

                }
            }
        })
        return new CobolDoc(comment, params, returns, throws);
    }

    /**
     * Updates the specified elements array creating a document element from the current line
     * 
     * @param elements elements array to be updated
     * @param currentLine current line used to create a document element
     */
    private updateDocElement(elements: DocElement[], currentLine: string) {
        let element = this.createDocElementFromLine(currentLine);
        if (element) {
            elements.push(element);
        }
    }

    /**
     * Creates a document element from the specified line
     * 
     * @param currentLine current line to create a document element
     */
    private createDocElementFromLine(currentLine: string): DocElement | undefined {
        let docElementRegex = /\s+\*>\s+(@param|@return|@throws)\s([\w-]+)\s?(.*)?/.exec(currentLine);
        if (docElementRegex) {
            if (docElementRegex[3]) {
                return new DocElement(docElementRegex[2], docElementRegex[3]);
            }
            if (docElementRegex[2]) {
                return new DocElement(docElementRegex[2], "");
            }
        }
        return undefined;
    }

    /**
     * Returns true if the documentation represents a RechDoc
     * 
     * @param documentation 
     */
    private isRechDoc(documentation: string[]): boolean {
        let doc = documentation.toString();
        return doc.includes("*>/**")
    }

    /**
     * Extracts the default documentation
     * 
     * @param documentation paragraph default documentation
     */
    private extractDefaultDoc(documentation: string[]): CobolDoc {
        let comment = "";
        documentation.forEach((currentLine) => {
            if (currentLine.trim().startsWith("*>->")) {
                let currentComment = "";
                currentComment = currentLine.replace("*>->", "").replace("<-<*", "").trim();
                currentComment = this.removeDots(currentComment);
                comment = comment.concat(currentComment).concat(" ");
            }
        });
        return new CobolDoc(comment, [], [], []);
    }

    /**
     * Removes dots at the end of the comment
     * 
     * @param currentLine current line text
     */
    private removeDots(currentLine: string): string {
        while (currentLine !== "" && currentLine.endsWith(".")) {
            currentLine = currentLine.slice(0, -1);
        }
        return currentLine;
    }

}
