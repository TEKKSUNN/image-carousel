const get = (query) => document.querySelector(query);

const getAll = (query) => Array.from(document.querySelectorAll(query));

const getProperty = (element, propertyName) => getComputedStyle(element).getPropertyValue(propertyName);

const getWidth = (element) => element.offsetWidth;

const getLeft = (element) => parseFloat(getProperty(element, "left").slice(0, -2));

const changeLeft = (element, newNum) => { console.log(element); element.style.left = newNum };

const exceedsUpward = (number, coreNumber) => number <= -coreNumber;

const exceedsDownward = (number) => number > 0;

const addLeft = (element) => {
    const divWidth = getWidth(element);
    const pictureWidth = getWidth(element.childNodes[1]);
    const curLeftVal = getLeft(element);
    const newLeft = curLeftVal - pictureWidth;
    if (exceedsUpward(newLeft, divWidth)) {
        return 0;
    }
    return newLeft;
};

const subLeft = (element) => {
    const divWidth = getWidth(element);
    const pictureWidth = getWidth(element.childNodes[1]);
    const curLeftVal = getLeft(element);
    const newLeft = curLeftVal + pictureWidth;
    if (exceedsDownward(newLeft)) {
        return -divWidth + pictureWidth;
    }
    return newLeft;
};

function getPictures(pictureFrame) {
    return pictureFrame.childNodes[1];
}

function getPicturesOnly(pictures) {
    return Array.from(pictures.childNodes)
        .filter((element) => element.nodeName === "IMG");
}

function getIndexFromLeft(pictures) {
    const curLeftVal = getLeft(pictures);
    const pictureWidth = getWidth(pictures.childNodes[1]);
    const index = Math.abs(curLeftVal) / pictureWidth;
    return index;
}

function updateCircles(pictures, pictureFrame) {
    const circleNodes = Array.from(pictureFrame.lastChild.childNodes);
    const activeCircleIndex = getIndexFromLeft(pictures);
    activateCircle(activeCircleIndex, circleNodes);
}

function next(pictureFrame) {
    const pictures = getPictures(pictureFrame);
    if (pictures.length <= 2) {
        return;
    }
    const newLeft = `${addLeft(pictures)}px`;
    changeLeft(pictures, newLeft);
    updateCircles(pictures, pictureFrame);
}

function back(pictureFrame) {
    const pictures = getPictures(pictureFrame);
    if (pictures.length <= 2) {
        return;
    }
    const newLeft = `${subLeft(pictures)}px`;
    changeLeft(pictures, newLeft);
    updateCircles(pictures, pictureFrame);
}

function createButton(className, callbackfn) {
    const button = document.createElement('button');
    button.className = `p-frame-asset p-frame-btn ${className}`;
    button.addEventListener('click', callbackfn);
    return button;
}

function createDiv(className) {
    const div = document.createElement('div');
    div.className = `p-frame-asset ${className}`;
    return div;
}

function createCircle(callbackfn) {
    const circle = document.createElement("div");
    circle.className = `p-frame-circle`;
    circle.addEventListener('click', callbackfn);
    return circle;
}

function calculateLeft(pictures, index) {
    const pictureWidth = getWidth(pictures.childNodes[1]);
    const newLeft = -(pictureWidth * index);
    return `${newLeft}px`;
}

function defaultCircle(...circleNodes) {
    circleNodes.forEach((circle) => {
        circle.classList.remove('active-circle');
    })
}

function activateCircle(index, circleNodes) {
    defaultCircle(...circleNodes);
    circleNodes[index].classList.add('active-circle');
}

function createCirclesFrom(pictureFrame) {
    const pictures = getPictures(pictureFrame);
    const picturesOnly = getPicturesOnly(pictures);
    const circleNodes = [];
    picturesOnly.forEach((imgNode, index) => {
        const left = calculateLeft(pictures, index)
        const newCircle = createCircle(() => {
            changeLeft(pictures, left);
        });
        if (index === 0) {
            newCircle.classList.add('active-circle');
        }
        circleNodes.push(newCircle);
    });
    circleNodes.forEach((circle, index) => {
        circle.addEventListener('click', () => {
            activateCircle(index, circleNodes);
        });
    });
    return circleNodes;
}

function appendTo(parentNode, ...childNodes) {
    childNodes.forEach((node) => {
        parentNode.appendChild(node);
    });
}

function constructButtons(pictureFrame) {
    const nextButton = createButton('next-btn', () => next(pictureFrame));
    const backButton = createButton('back-btn', () => back(pictureFrame));
    const imageCircleGroup = createDiv('p-frame-circle-group');
    const imageCircles = createCirclesFrom(pictureFrame);
    appendTo(imageCircleGroup, ...imageCircles);
    window.setInterval(() => next(pictureFrame), 5000);
    pictureFrame.appendChild(nextButton);
    pictureFrame.appendChild(backButton);
    pictureFrame.appendChild(imageCircleGroup);
}

function makeImageCarouselAll(frameQuery) {
    const pictureFrameAll = getAll(frameQuery);
    pictureFrameAll.map((pictureFrame) => constructButtons(pictureFrame));
}

function makeImageCarousel(frameQuery) {
    const pictureFrame = get(frameQuery);
    constructButtons(pictureFrame);
}

function loadDefaultImageCarousel() {
    const defaultQuery = "div.picture-frame";
    const pictureFrameAll = getAll(defaultQuery);
    pictureFrameAll.map((pictureFrame) => constructButtons(pictureFrame));
}

module.exports = { makeImageCarouselAll, makeImageCarousel, loadDefaultImageCarousel };
