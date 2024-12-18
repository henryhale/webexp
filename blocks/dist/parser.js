export function parse(text = "") {
    const lines = text.split('\n');
    const result = ['', ''];
    let level = {
        '-1': result
    };
    let ln = 0;
    for (const line of lines) {
        ln++;
        let trimmedLine = line.trimStart();
        const indent = line.length - trimmedLine.length;
        trimmedLine = trimmedLine.trimEnd();
        if (trimmedLine === '' || trimmedLine.startsWith('#')) {
            continue;
        }
        for (const k of Object.keys(level).map(x => Number(x))) {
            if (k > indent) {
                delete level[k];
            }
        }
        const match = trimmedLine.match(/^([\w@$%]+):\s*(.*)$/);
        if (match) {
            const node = [match[1], match[2]];
            level[indent - 1].push(node);
            level[indent] = node;
        }
        else {
            throw new Error("Invalid syntax at line " + ln);
        }
    }
    return result;
}
