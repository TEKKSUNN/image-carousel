# image-carousel
An image carousel npm package.

# How to install
Simply type this inside your bash terminal:
```npm install --save @tekksunn/image-carousel```

# How to use
## ...it on HTML
### Step 1
Make a picture frame by making a div with the class value `picture-frame image-carousel`:
```
<div class="picture-frame image-carousel">
    <!-- More content here below... -->
</div>
```

### Step 2
Make a div that holds all the pictures inside it, with the class value `pictures`:
```
<div class="picture-frame image-carousel">
    <div class="pictures">
        <!-- Actual images go here -->
    </div>
</div>
```

### Step 3
Add your `img` tags inside `div.pictures`, each having the class name `carousel-img`:
```
<div class="picture-frame image-carousel">
    <div class="pictures">
        <img src="./example/img-1.jpg" alt="carousel image number 1" class="carousel-img">
        <img src="./example/img-2.jpg" alt="carousel image number 2" class="carousel-img">
        <img src="./example/img-3.jpg" alt="carousel image number 3" class="carousel-img">
        <img src="./example/img-4.jpg" alt="carousel image number 4" class="carousel-img">
        <img src="./example/img-5.jpg" alt="carousel image number 5" class="carousel-img">
    </div>
</div>
```

### Step 4 (A must)
Proceed to **How to use ...it in Javascript (load the image carousel)**

## ...it in Javascript (load the image carousel)
Include in your main script the following at the very top:
```import { loadDefaultImageCarousel } from "@tekksunn/image-carousel"```

and then include the following in your code:
```document.addEventListener("DOMContentLoaded", loadDefaultImageCarousel)```

### Additional functions
You can also use the functions:
- makeImageCarouselAll(frameQuery)
- makeImageCarousel(frameQuery)

*...which can make any picture frame despite having a different element or class become an image carousel.*

#### What is frameQuery?
**frameQuery** means the css selector for the picture frame, `"div.picture-frame"` for example.

## ...its stylesheet
Include in your own website's stylesheet the following at the very top:
```@import url("@tekksunn/image-carousel/src/styles.css");```

# Example Website
Please go [here](https://tekksunn.github.io/image-carousel-example) for a visual reference.
