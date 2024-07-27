function parseAttr(attributes = "") {
    const attr = {};
    let match;
    let text = '';
    for (const k of attributes.trim().split(' ')) {
        if (k.startsWith('.')) {
            attr['class'] = k.substring(1);
        }
        else if (k.startsWith('#')) {
            attr['id'] = k.substring(1);
        }
        else if ((match = k.match(/(\w+)=(\w*)/g))) {
            const [, key, value] = match;
            attr[key] = value;
        }
        else {
            // unknown
            text += ' ' + k;
        }
    }
    attr['text'] = text.trim();
    return attr;
}
function renderAttr(attributes) {
    let result = "";
    const skip = ['text'];
    for (const [key, value] of Object.entries(attributes)) {
        if (!skip.includes(key)) {
            result += ` ${key}='${value}'`;
        }
    }
    return result;
}
export function parseRenderAttr(attributes) {
    return renderAttr(parseAttr(attributes));
}
function parseBlock(block) {
    const nblock = {
        tag: block[0],
        attr: block[1],
        blocks: block.slice(2),
        content: block.slice(2).reduce((r, c, i) => {
            r[c[0]] = c[1];
            return r;
        }, {})
    };
    return nblock;
}
export class TemplateManager {
    static templates = new Map();
    static install(tag, renderer) {
        this.templates.set(tag, renderer);
    }
    static has(tag) {
        return this.templates.has(tag);
    }
    static get(tag) {
        return this.templates.get(tag);
    }
}
export function render(root) {
    let html = "";
    const [tag, attr, ...nodes] = root;
    if (TemplateManager.has(tag)) {
        return TemplateManager.get(tag)(parseBlock(root), render);
    }
    // assemble attributes
    const attributes = parseAttr(attr);
    // opening tag
    if (tag)
        html += `<${tag}${renderAttr(attributes)}>`;
    if (attributes['text']) {
        // inner text
        html += attributes['text'];
    }
    for (const node of nodes) {
        // render
        html += render(node);
    }
    // closing tag
    if (tag)
        html += `</${tag}>`;
    return html;
}
