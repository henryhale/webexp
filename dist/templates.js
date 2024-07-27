import { TemplateManager } from "./render.js";
import { parseRenderAttr } from "./render.js";
const t = {};
export function init() {
    for (const [tag, fn] of Object.entries(t)) {
        TemplateManager.install(tag, fn);
    }
}
t['hr'] = (_) => {
    return `<hr class='dotted'>`;
};
t['img'] = (b) => {
    const [src, alt, ...attr] = b.attr.split(' ');
    const { src: src2, alt: alt2 } = b.content;
    return `<img src='${src || src2}' alt='${alt || alt2}' loading='lazy' ${parseRenderAttr(attr.join(' '))}/>`;
};
t['a'] = (b) => {
    const [href, ...text] = b.attr.split(' ');
    return `<a href='${href}'>${text.join(' ')}</a>`;
};
t['input'] = (b) => {
    const [type, ...text] = b.attr.split(' ');
    const label = text.join(' ');
    const id = label.toLowerCase().replace(/[\W]/g, '-').split('').join('');
    let html = '<div>';
    if (!['submit', 'reset'].includes(type)) {
        html += `<label for='${id}'>${label}</label><input id='${id}' type='${type}' name='${id}' />`;
    }
    else {
        html += `<input type='${type}' value='${label}' />`;
    }
    return html + `</div>`;
};
t['form'] = (b, r) => {
    let html = `<form action='${b.content.action}' method='${b.content.method}' ${parseRenderAttr(b.attr).trim()}>`;
    for (const block of b.blocks) {
        if (block[0] == 'action' || block[0] == 'method') {
            continue;
        }
        html += r(block);
    }
    return html + '</form>';
};
/**
 * TODO
 * - components like Accordion, Breadcrumb, ...
 * - for - $for: list (rendering lists)
 * - if - $if: condition (conditional output based on value/variable)
 * - layouts - top-level (@layout: type) and slots (slot: name)
 * a layout file contains one or more named slots
 * pages that use the layout, use `@layout: type` in top/first lines of the file
 * - themes (@theme: type)
 * also top-level directive to specify css styles/theming - adds the link to that stylesheet
 * - full page templates
 */ 
