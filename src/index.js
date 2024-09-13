const get = (query) => document.querySelector(query);

const getAll = (query) => Array.from(document.querySelectorAll(query));

const getProperty = (element, propertyName) => getComputedStyle(element).getPropertyValue(propertyName);

const getWidth = (element) => element.offsetWidth;

const getLeft = (element) => parseFloat(getProperty(element, "left").slice(0, -2));

const changeLeft = (element, newNum) => { element.style.left = newNum };

const exceedsUpward = (number, coreNumber) => number <= -coreNumber;

const exceedsDownward = (number) => number > 0;

const addLeft = (element) => {
    const divWidth = getWidth(element);
    const pictureWidth = getWidth(element.childNodes[1]);
    const curLeftVal = getLeft(element);
    console.log([element, divWidth, pictureWidth, curLeftVal].join("\n"));
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
    console.log([element, divWidth, pictureWidth, curLeftVal].join("\n"));
    const newLeft = curLeftVal + pictureWidth;
    if (exceedsDownward(newLeft)) {
        return -divWidth + pictureWidth;
    }
    return newLeft;
};

function getPictures(pictureFrame) {
    return pictureFrame.childNodes[1];
}

function next(pictureFrame) {
    const pictures = getPictures(pictureFrame);
    if (pictures.length <= 2) {
        return;
    }
    const newLeft = `${addLeft(pictures)}px`;
    changeLeft(pictures, newLeft);
}

function back(pictureFrame) {
    const pictures = getPictures(pictureFrame);
    if (pictures.length <= 2) {
        return;
    }
    const newLeft = `${subLeft(pictures)}px`;
    changeLeft(pictures, newLeft);
}

function createButton(className, callbackfn) {
    const button = document.createElement('button');
    button.className = `p-frame-asset p-frame-btn ${className}`;
    button.addEventListener('click', callbackfn);
    return button;
}

function constructButtons(pictureFrame) {
    const nextButton = createButton('next-btn', () => next(pictureFrame));
    const backButton = createButton('back-btn', () => back(pictureFrame));
    pictureFrame.appendChild(nextButton);
    pictureFrame.appendChild(backButton);
}

export function makeImageCarouselAll(frameQuery) {
    const pictureFrameAll = getAll(frameQuery);
    pictureFrameAll.map((pictureFrame) => constructButtons(pictureFrame));
}

export function makeImageCarousel(frameQuery) {
    const pictureFrame = get(frameQuery);
    constructButtons(pictureFrame);
}

export function loadDefaultImageCarousel() {
    const defaultQuery = "div.picture-frame";
    const pictureFrameAll = getAll(defaultQuery);
    pictureFrameAll.map((pictureFrame) => constructButtons(pictureFrame));
}

// module.exports = { makeImageCarouselAll, makeImageCarousel, loadDefaultImageCarousel };
