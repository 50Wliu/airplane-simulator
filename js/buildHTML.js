function buildHtml(descriptor) {
    var tagname = descriptor[0];
    var attributes = descriptor[1];
    var children = descriptor[2];
    var element = document.createElement(tagname);
    for (var attr in attributes) {
        var value = attributes[attr];
        switch (attr) {
        case 'id':
            element.id = value;
            break;
        case 'class':
            if (element.classList) {
                if (typeof value !== 'object') {
                    value = value.split(' ');
                };
                var _js4 = value.length;
                for (var _js3 = 0; _js3 < _js4; _js3 += 1) {
                    var classes = value[_js3];
                    element.classList.add(classes);
                };
            } else {
                element.className = value;
            };
            break;
        case 'style':
            for (var descriptors in value) {
                var values = value[descriptors];
                element.style[descriptors] = typeof values === 'string' ? values : String(values) + 'px';
            };
            break;
        default:
            element.setAttribute(attr, value);
        };
    };
    if (children) {
        var _js4 = children.length;
        for (var _js3 = 0; _js3 < _js4; _js3 += 1) {
            var child = children[_js3];
            var parsedChild = typeof child === 'string' ? document.createTextNode(child) : buildHtml(child);
            element.appendChild(parsedChild);
        };
    };
    __PS_MV_REG = {};
    return element;
};
