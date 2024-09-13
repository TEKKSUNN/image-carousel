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

const getNumPictures = (pictures) => Math.floor(pictures.childNodes.length / 2);

const getCurrentImgNum = (pictureFrame) => parseInt(pictureFrame.lastChild.textContent);

const getImgNum = (pictureFrame) => pictureFrame.lastChild;

const changeImgNum = (pictureFrame, newNum) => { getImgNum(pictureFrame).textContent = `${newNum}` };

function addImageNum(pictureFrame, pictures) {
    const numPictures = getNumPictures(pictures);
    const currentNum = getCurrentImgNum(pictureFrame);
    const newNum = currentNum + 1;
    if (newNum > numPictures) {
        return 1;
    }
    return newNum;
}

function subImageNum(pictureFrame, pictures) {
    const numPictures = getNumPictures(pictures);
    const currentNum = getCurrentImgNum(pictureFrame);
    const newNum = currentNum - 1;
    if (newNum < 1) {
        return numPictures;
    }
    return newNum;
}

function getPictures(pictureFrame) {
    return pictureFrame.childNodes[1];
}

function next(pictureFrame) {
    const pictures = getPictures(pictureFrame);
    if (pictures.length <= 2) {
        return;
    }
    const newLeft = `${addLeft(pictures)}px`;
    const newImgNum = addImageNum(pictureFrame, pictures);
    changeLeft(pictures, newLeft);
    changeImgNum(pictureFrame, newImgNum);
}

function back(pictureFrame) {
    const pictures = getPictures(pictureFrame);
    if (pictures.length <= 2) {
        return;
    }
    const newLeft = `${subLeft(pictures)}px`;
    const newImgNum = subImageNum(pictureFrame, pictures);
    changeLeft(pictures, newLeft);
    changeImgNum(pictureFrame, newImgNum);
}

function createButton(className, callbackfn) {
    const button = document.createElement('button');
    button.className = `p-frame-asset p-frame-btn ${className}`;
    button.addEventListener('click', callbackfn);
    return button;
}

function createText(className, type, content) {
    const text = document.createElement(type);
    text.className = `p-frame-asset p-frame-text ${className}`;
    text.textContent = content;
    return text;
}

function constructButtons(pictureFrame) {
    const nextButton = createButton('next-btn', () => next(pictureFrame));
    const backButton = createButton('back-btn', () => back(pictureFrame));
    const imageNumber = createText('image-number', 'p', '1');
    window.setInterval(() => next(pictureFrame), 5000);
    pictureFrame.appendChild(nextButton);
    pictureFrame.appendChild(backButton);
    pictureFrame.appendChild(imageNumber);
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
