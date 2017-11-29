import toRadians from './helpers';

class Artwork {
    constructor() {
        this.svg = document.querySelector('svg');
        this.width = this.svg.getAttribute('width');
        this.height = this.svg.getAttribute('height');
        this.xOffset = this.width/2;
        this.yOffset = this.height/2;
        this.Paths = [];
        this.params={
            color: '#ffffff',
            backgroundColor: '#000000',
            minAngles: 5,
            maxAngles: 7,
            minLength: 40,
            maxLength: 110,
            minRepetitions: 7,
            maxRepetitions: 9,
            count: 6,
        };
        this.logoPath = (this.params.color === '#ffffff')
            ? '<path transform="matrix(2 0 0 2 690 20)" d="M55.99 3.08c-.43.44-.68 1.06-.74 1.86h4.58c-.02-.42-.09-.79-.22-1.11-.13-.32-.3-.59-.51-.8-.21-.21-.46-.36-.73-.47-.27-.1-.55-.15-.84-.15-.6 0-1.11.22-1.54.67zm2.96 6.3c.37-.23.61-.54.72-.95h3.06c-.35 1.19-.96 2.1-1.83 2.74-.86.64-1.9.96-3.1.96-3.74 0-5.61-2.09-5.61-6.28 0-.89.12-1.69.37-2.41.24-.72.59-1.33 1.06-1.85.46-.51 1.03-.91 1.7-1.18.66-.27 1.43-.41 2.3-.41 1.73 0 3.04.57 3.93 1.71.89 1.14 1.34 2.86 1.34 5.15h-7.73c.04.88.29 1.57.74 2.09.45.51 1.03.77 1.76.77.49 0 .92-.11 1.29-.34zm-12.58 4.64c-.21.21-.52.39-.92.52-.39.13-.97.27-1.73.42-1.18.23-1.98.54-2.43.9-.43.37-.66.9-.66 1.59 0 1.18.66 1.78 1.99 1.78.52 0 1.01-.09 1.46-.28.45-.18.84-.43 1.17-.74.32-.31.59-.68.79-1.1.2-.42.3-.87.3-1.34zM49 7.11c.51.53.88 1.19 1.12 1.97.23.79.34 1.68.34 2.67v10.07h-3.81c-.12-.41-.21-.89-.25-1.43-.48.56-1.13 1.01-1.92 1.35-.8.33-1.72.5-2.77.5-1.79 0-3.1-.41-3.93-1.22-.83-.81-1.24-1.86-1.24-3.15 0-1.14.18-2.06.53-2.74.36-.68.85-1.21 1.49-1.6.63-.39 1.38-.67 2.25-.85.87-.19 1.82-.36 2.85-.51 1.03-.15 1.72-.35 2.08-.59.35-.25.53-.66.53-1.22 0-.52-.23-.92-.71-1.21-.47-.29-1.1-.44-1.9-.44-.95 0-1.62.22-2.03.65-.41.43-.67 1-.77 1.71h-3.82c.02-.82.16-1.57.4-2.26.24-.69.63-1.28 1.16-1.78.54-.5 1.24-.88 2.1-1.15.86-.27 1.91-.4 3.15-.4 1.21 0 2.25.14 3.1.42.85.28 1.53.68 2.05 1.21zM31.66 21.82h-4.29L21.83 5.9h4.57l3.24 10.51L32.92 5.9h4.31zM16.73 5.9h4.09v15.92h-4.09zm0-5.83h4.09v3.92h-4.09zM7.65 18.81c-1.03 0-1.87-.45-2.52-1.35-.65-.89-.97-2.05-.97-3.47 0-3.28 1.17-4.92 3.53-4.92 2.28 0 3.43 1.72 3.43 5.17 0 1.36-.33 2.46-.99 3.3-.66.85-1.49 1.27-2.48 1.27zm3.31-10.84c-1.15-1.66-2.69-2.49-4.6-2.49-1 0-1.9.2-2.69.59-.79.4-1.46.97-2 1.7-.55.74-.96 1.6-1.24 2.61-.29 1-.43 2.11-.43 3.31 0 1.34.17 2.54.5 3.6.34 1.05.8 1.95 1.39 2.68.59.74 1.29 1.3 2.11 1.68.82.39 1.72.59 2.71.59 1.93 0 3.37-.79 4.31-2.37l.04 1.95h3.93V.07h-4.03zM52 15.97h10.63V14H52z" fill="#fff"/>'
            : '';
    }

    init() {
        this.createMenu();
        this.redrawSvg();
    }

    redrawSvg(){
console.log('abstract', this.params.abstract);

        this.Paths = [];

        for (let i=0; i<this.params.count; i++) {
            const xOffset = Math.random() * this.width;
            const yOffset = Math.random() * this.height;
            this.Paths.push('<g class="flower">');
            let length = Math.random() * (this.params.maxLength - this.params.minLength) + this.params.minLength;

            this.createStar(xOffset, yOffset, length);
            this.Paths.push('</g>');
        }

        this.svg.innerHTML = ''
            + '<filter id="lightMe1">'
            + '<feDiffuseLighting in="SourceGraphic" result="light" lighting-color="white">'
            + '<fePointLight x="220" y="80" z="220" />'
            + '</feDiffuseLighting>'
            + '<feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>'
            + '</filter>'
            + '<rect fill="' + this.params.backgroundColor + '" x="0" y="0" width="' + this.width + '" height="' + this.height + '" filter="url(#lightMe1)"/>'
            + this.Paths.join(' ')
            + this.logoPath;
    }

    //creates star on random place consisting of [this.params.angles] parts
    createStar(xOffset, yOffset, length){


        const angleOffset =  Math.random() * 360;
        const angles = Math.round(Math.random() * (this.params.maxAngles - this.params.minAngles) + this.params.minAngles);
        const repetitions = Math.random() * (this.params.maxRepetitions - this.params.minRepetitions) + this.params.minRepetitions;
        for (let i=0; i< angles; i++){
            this.Paths.push('<g>');
            this.createAngles(i, length, angleOffset, xOffset, yOffset, angles, repetitions);
            this.Paths.push('</g>');
        }
    }

    createAngles(currentAngle, length = this.params.length, angleOffset, xOffset, yOffset, angles, repetitions){

        const angle = new Angle(angles, length, xOffset, yOffset, this.params.color, this.params.backgroundColor);

        for (let i=0; i < repetitions; i++){
            this.Paths.push(angle.createSinglePath(currentAngle + angleOffset, i * 20, this.abstract));
        }
    }

    //expands menu with list of changeable parameters
    createMenu(){
        const menu = document.querySelector('#menu');
        let element = document.createElement('hr');
        menu.appendChild(element);
        const paramBox = document.createElement('div');
        paramBox.className='param-box';
        menu.appendChild(paramBox);
        element = document.createElement('h3');
        element.innerText = 'Parameter';
        paramBox.appendChild(element);

        Object.keys(this.params).forEach(key => this.createParamElement(paramBox, key));

        const abstractContainer = document.createElement('div');
        abstractContainer.className = 'params';
        paramBox.appendChild(abstractContainer);
        element = document.createElement('input');
        element.setAttribute('type', 'checkbox');
        element.addEventListener('change', (e) => this.abstract = e.target.checked);

        abstractContainer.appendChild(element);
        const label = document.createElement('label');
        label.innerText = 'Make it abstract!';
        abstractContainer.appendChild(label);



        element = document.createElement('a');
        element.setAttribute('href', '#');
        element.innerText = 'Refresh';
        element.addEventListener('click', () => this.redrawSvg());
        menu.appendChild(element);
    }

    //create Element consisting of label and input field with onChangeListener
    createParamElement(parentNode, name){
        const label = document.createElement('label');
        label.className = 'params';
        label.innerText = name + ': ';
        parentNode.appendChild(label);
        let element = document.createElement('input');
        element.setAttribute('value', this.params[name]);
        element.addEventListener('change', e => this.onAttributeChange(name, e.target.value));
        parentNode.appendChild(element);
        parentNode.appendChild(element);
    }

    onAttributeChange(type, e){
        this.params[type] = isFinite(e) ? parseInt(e) : e;
        //this.redrawSvg();
    }

}

class Angle{
    constructor(count, length, xOffset, yOffset, color, backgroundColor) {
        this.angles = count;
        this.length = length;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.color = color;
        this.backgroundColor = backgroundColor;
    }

    createSinglePath(currentAngle, moveLength = this.length/40, abstract) {

        const angle0 = 360 / this.angles * currentAngle;

        const x0 = Math.sin(toRadians(angle0)) * (abstract ? Math.random() : 1) * this.length + this.xOffset;
        const y0 = -Math.cos(toRadians(angle0)) * (abstract ? Math.random() : 1) * this.length + this.yOffset;
        const angle1 = 360 / this.angles * (currentAngle + 1);
        let x1 = Math.sin(toRadians(angle1)) * (abstract ? Math.random() : 1) * this.length + this.xOffset;
        let y1 = -Math.cos(toRadians(angle1)) * (abstract ? Math.random() : 1) * this.length + this.yOffset;
        const movingAngle = 360 / this.angles * (currentAngle + 0.5);
        const moveX = Math.sin(toRadians(movingAngle)) * (abstract ? Math.random() : 1) * moveLength * this.length / 100;
        const moveY = -Math.cos(toRadians(movingAngle)) * (abstract ? Math.random() : 1) * moveLength * this.length / 100;
        return '<path transform="translate(' + moveX + ' ' + moveY + ')" id ="angle_' + currentAngle + '" ' +
            'd="M ' + x0 + ' ' + y0 + ' L ' + this.xOffset + ' ' + this.yOffset + ' L ' + x1 + ' ' + y1 + ' " ' +
            'd="M ' + this.xOffset + ' ' + this.yOffset + ' L ' + x0 + ' ' + y0 + ' M ' + this.xOffset + ' ' + this.yOffset + ' L ' + x1 + ' ' + y1 + ' " ' +
            'fill="none" ' +
            'stroke="' + this.color + '" ' +
            '/>';
    }
}

export default Artwork;
