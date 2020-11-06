"use strict";

class TextEditor {
    constructor(e) {
        this.target = e;
        this.DOM = null;
        this.init();
    }

    init() {

        const DOM = document.querySelector(this.target);

        if (DOM) {
            const contenteditable = document.querySelector("[contenteditable]");
            const el = document.querySelector('.editor');
            const bold = document.querySelector(".click-Blod");
            const italic = document.querySelector(".click-Italc");
            const li = document.querySelector(".click-li");
            const a = document.querySelector(".click-a");
            const link = document.getElementById("txtFormatUrl");
            const input = document.querySelector('div');
            // const pad = document.createTextNode('\u00A0');

            // input.appendChild(pad);

            // let selection = window.getSelection();


            bold.addEventListener(
                "click",
                () => {
this.surroundSelection();
                    // let b = document.createElement("b")
                    // let range = selection.getRangeAt(0).cloneRange();

                    // range.surroundContents(b)

                    // selection.removeAllRanges();
                    // selection.addRange(range);
                    // let pad = this.addPad();

                    // range.setEnd(pad, 1);

                    // selection.collapseToEnd();
                    // this.getContent(contenteditable)
                });
            italic.addEventListener(
                "click",
                () => {
                    let i = document.createElement("i")
                    window.getSelection().getRangeAt(0).surroundContents(i)
                    // this.getContent(contenteditable)
                });
            li.addEventListener(
                "click",
                () => {
                    let li = document.createElement("li")
                    window.getSelection().getRangeAt(0).surroundContents(li)

                    // this.getContent(contenteditable)
                });
            a.addEventListener(
                "click",
                () => {
                    // console.log(link.value);
                    let a = document.createElement("a")
                    a.href = link.value;
                    console.log(a);
                    window.getSelection().getRangeAt(0).surroundContents(a)

                    // this.pasteHtmlAtCaret(a);
                    // this.getContent(contenteditable)
                });
        }
    }
    getContent(text) {
        // let range = new Range();

        // const el = document.querySelector('.editor')//ideti linka
        // el.setAttribute('contenteditable', true);
        // let textNode = el.firstChild
        // let caret = textNode.length

        // let element = document.createElement("b")
        // window.getSelection().getRangeAt(0).surroundContents(element)
        let sel = document.getSelection();
        // sel.setEnd;

        if (document.getSelection) {    // all browsers, except IE before version 9
            alert(sel);
        }
        else {
            if (document.selection) {   // Internet Explorer before version 9
                var textRange = document.selection.createRange();
                alert(textRange.text);
            }
        }
        let savedRange = sel.getRangeAt(0);
        sel.removeAllRanges();

        console.log(sel);
        sel.addRange(savedRange)
    }

    pasteHtmlAtCaret(html) {

        var sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)
                var el = document.createElement("img");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                console.log(frag);
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                    console.log(lastNode);
                }
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            // IE < 9
            document.selection.createRange().pasteHTML(html);
        }
    }

    addPad() {
        var $input = document.querySelector('.editorContainer > div');
        var pad = document.createTextNode('\u00A0');
// console.log($input);
//         $input.appendChild(pad);

        return pad;
    }
    surroundSelection() {
        var sel = window.getSelection();
        if (!sel || !sel.rangeCount) return;
        console.log(sel);
        var code = document.createElement("b");
        // code.style.fontStyle = "italic";
        // code.style.background = "#ddd";
        
        var range = sel.getRangeAt(0).cloneRange();
        console.log(range);
        range.surroundContents(code);
        // sel.removeAllRanges();
        sel.addRange(range);
        
        var padNode = this.addPad();
        range.setEnd(padNode, 1);
        console.log(range);
        sel.collapseToEnd();
    }
    
}

export default TextEditor;