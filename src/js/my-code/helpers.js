function toRadians(angle){
    return angle * Math.PI / 180;
}

export function toDegrees(angle){
    return angle * 180 / Math.PI;
}

// creates svg element for dom, sets attributes and textContent, attaches it to parent and returns it
export function createSvgElement(type, attributes, parent, textContent){
    let element = document.createElementNS('http://www.w3.org/2000/svg', type);
    element.textContent = textContent;

    Object.keys(attributes).forEach(key => {
        element.setAttribute(key, attributes[key]);
    });

    if (parent) {
        parent.append(element);
    }

    return element;
}

// creates element for dom, sets attributes and innerText, attaches it to parent and returns it
export function createDomElement(type, attributes, parent, innerText = null){
    let element = document.createElement(type);
    element.innerText = innerText;

    Object.keys(attributes).forEach(key => {
        element.setAttribute(key, attributes[key]);
    });

    if (parent) {
        parent.append(element);
    }

    return element;
}

export default toRadians;
