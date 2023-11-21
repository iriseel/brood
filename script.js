let mothContainers = null;
let flutterIntervals = [];
let lineIndex = 0;
const container = document.querySelector(".container");
const chapter1 = document.querySelector(".chapter1");
const chapter2 = document.querySelector(".chapter2");
const shadowTextContainer = document.querySelector(".shadowTextContainer");
const allMothsContainer = document.querySelector(".allMothsContainer");
let stickyDivs = [];

let lastTouchMove = null;
let lastScrollTop = 0;

let totalHeight = null;

//shadowIndex is for keeping track of which stickyDiv/shadow is the most recently generated
let shadowIndex = 0;
let fakestickyScrollDifference = 0;

const mothImgs = [
    "imgs/scan_moths/img20231107_18184108.png",
    "imgs/scan_moths/img20231107_17580860_1.png",
    "imgs/scan_moths/img20231107_17580860_2.png"
];

const mothHoleImgs = [
    "imgs/holes/hole1.png",
    "imgs/holes/hole2.png",
];


const chapter1Texts = [
    "One theory was that the disease started when the moths ate through the archives. Perhaps they were attracted by their disuse, all that history unnourished by life. There was no need for book burning when you could just let them mold. From the moths, the history passed to the bees, the cicadas, the butterflies, the roaches, the locusts, and the maggots. No one noticed a difference in their behaviors.",
    "Another theory was that they simply absorbed the memories from all the surfaces of the world, the trash on the streets, the witness trees and building facades and shoddily repaired pavements, the albums and trinkets traded at flea markets.",
    "Either way, it was not long before humans became carriers.",
    "Dejavu is the first sign. The sights, sounds, smells come from elsewhere. First in passing, then in pursuit. Faces as old as new, intimate conversations with strangers, unfamiliar objects fitting snugly in the hand.",
    "It was the cicadas, the ones that come every 17 years. My grandmother remembers seeing them everywhere, on the trees, the buildings, the ground. One couldn’t walk without catching a fistful of vibrating wings. It was like rain. Some people wielded umbrellas as shields.",
    "She was blindsided by her first exposure. It was a hot day in August. She had to go out to buy some groceries. She was standing at the crosswalk, waiting for the light to turn. All around her was sound. She felt that all the vibration generated a heat that made the already sweltering weather even more unbearable. The buzzing began to sound like language when suddenly she found herself in a mass of heaving bodies, chanting words in a language she did not understand. The man on stage wore a strange, tall cone of a hat with scribblesd on it, his head hung low, but familiar in a way that terrified her.",
    "She later learned that one of her mother’s memories had found her. It turns out that it is quite common for the insects to mistake the relatives of the memories’ former inhabitants for the inhabitants themselves. It is still a mystery how they find their ways to us. Some scientists have proposed that they are attracted to our blood like sugar water. Others have found that these new species of moths are attracted to darkness, and find refuge in the murky crevices within our bodies. Maybe no darkness is the same, but it is inherited.",
    "It was not long before serious cases appeared. During dinner, an elderly woman was sabotaged with visions of relatives’ emaciated limbs and swollen bellies, and lost her sight. In the middle of a meeting, a middle-aged man pleaded with his employer to lower his gun and spare his life, swearing that he was not a Communist like his brother.",
    // "",
    
];

const chapter2Texts = [
    "Then, once the children started to cry and gaze strangely into the distance, it was discovered that the insects were hereditary. Like a woman whose grandmother’s features only surface in her face in adulthood, usually you didn’t find out what you inherited till much later. You could try to predict when a brood would emerge, but it was not always reliable. Sometimes, when the weather was warm, you ate something wrong, or some other obscure conditions were met, they would hatch early.",
]


//every year
// setInterval(() => popup(fireworksImgs, fireworksImgsCounter), 31556926000);

// TOUCH EVENTS
document.addEventListener('touchstart', function(event) {
    const touch = event.touches[0]; // Consider the first touch for simplicity
    console.log(event.touches);
    const x = touch.clientX;
    const y = touch.clientY;
    lastTouchMove = event;
   
    clearAllFlutterIntervals();
    sendMothstoTarget(x, y);
})

//?? WIP
// Override with touchmove, which is triggered only on move
document.addEventListener('touchmove', function(event) {
  lastTouchMove = event;
});

document.addEventListener('touchend', function(event) {
    setTimeout(() => sendMothstoEdges(), 1000);
    // console.log("touchend")
})



//CREATE N NUMBER OF MOTHS AT WINDOW EDGES (used in init)
// Function to create divs at random positions
function createMovingDivs() {
    const numDivs = 3; // Number of divs to create
    
    for (let i = 0; i < numDivs; i++) {
        const [edgeX, edgeY] = getEdgePositions();
        makeMoth("moth_container", edgeX, edgeY);

    }
}

//MAKE BG MOTH
function makeBGMoth() {
    // console.log("creating bg moth")
    const bgMothContainers = document.querySelectorAll(".bg_moth_container");
    if (bgMothContainers.length > 10) {
        bgMothContainers[0].remove();
        // console.log("removed moth");
    }

    const scrollY = window.scrollY;

    const [mothContainer] = makeMoth("bg_moth_container", 0, scrollY);

    mothContainer.classList.add("blur");

    setInterval(() => bgFlutter(mothContainer, scrollY), 500);
}

//SEND MOTHS TO TARGET
function sendMothstoTarget(x, y) {
    const variation = 100;
    mothContainers = document.querySelectorAll(".moth_container");
    // Calculate the distance and duration based on div's initial position
    mothContainers.forEach((mothContainer) => {
        mothContainer.style.transition = ".15s ease-in-out";
        const flutterInterval = setInterval(() => flutter(mothContainer, x, y, variation), 150);
        flutterIntervals.push(flutterInterval);
    })
}

//DISPERSE MOTHS
function sendMothstoEdges() {
    clearAllFlutterIntervals();
    mothContainers = document.querySelectorAll(".moth_container");

    mothContainers.forEach((mothContainer) => {
        const [edgeX, edgeY] = getEdgePositions();

        positionDiv(mothContainer, edgeX, edgeY);

        mothContainer.style.transition = "1s ease-in-out";
        // console.log("sending to edge");

    })

}


//GENERAL FUNCTIONS
function randomize(min, max) {
    return min + Math.random() * (max - min);
}

function positionDiv(div, x, y) {
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
}

function doesClassContain(element) {
    const classList = Array.from(element.classList);
    const lineClassName = classList.find(className => className.startsWith('line'));

    return lineClassName || null;
}

function getClassName(element, keyword) {
    const hasClassName = element.classList.contains(`${keyword}`);
    return hasClassName;
}

function clearAllFlutterIntervals() {
    flutterIntervals.forEach(flutterInterval => {
        clearInterval(flutterInterval);
    });

    // Clear the stored interval IDs
    flutterIntervals.length = 0;
}

function getEdgePositions() {
    // Calculate random positions on the window edges
    const edge = Math.floor(Math.random() * 4); // Choose a random edge (0 - top, 1 - right, 2 - bottom, 3 - left)

    let edgeX, edgeY;
    // .6 * window.innerWidth is bc that's the largest size of a moth
    const buffer = .6 * window.innerWidth; // Distance outside the window border

    switch (edge) {
        case 0: // Top edge
            edgeX = Math.random() * window.innerWidth;
            edgeY = -buffer;
            break;
        case 1: // Right edge
            edgeX = window.innerWidth + buffer;
            break;
        case 2: // Bottom edge
            edgeX = Math.random() * window.innerWidth;
            edgeY = window.innerHeight + buffer;
            break;
        case 3: // Left edge
            edgeX = -buffer;
            edgeY = Math.random() * (window.innerHeight);
            break;
    }
    return [edgeX, edgeY];
}

//MAKE AND POSITION MOTH
function makeMoth(mothType, x, y) {
    const mothContainer = document.createElement('div');
    mothContainer.classList.add(mothType);
    const moth = document.createElement('div');
    moth.classList.add('moth');
    const imgElement = document.createElement('img');
    
    const randomImageUrl = mothImgs[Math.floor(Math.random() * mothImgs.length)];
    imgElement.src = randomImageUrl;

    const mothSize = randomize(20, 50);
    imgElement.style.height = mothSize + "vh";

    allMothsContainer.appendChild(mothContainer);
    mothContainer.appendChild(moth);
    moth.appendChild(imgElement);

    positionDiv(mothContainer, x, y);

    return [mothContainer];
}

//find sticky div with highest data index
function findHighestDataIndex() {
    // let highestDataIndexStickyDiv;
    let highestDataIndex = -Infinity;
    const latestStickyDivs = document.querySelectorAll(".sticky.latest, .fakesticky.latest");

    latestStickyDivs.forEach(function(latestStickyDiv) {
        const dataIndexValue = parseInt(latestStickyDiv.getAttribute('data-index'), 10);

        if (!isNaN(dataIndexValue) && dataIndexValue > highestDataIndex) {
            highestDataIndex = dataIndexValue;
            // highestDataIndexStickyDiv = stickyDiv;
        }
    });

    console.log("highest data index is: " + highestDataIndex);
    return highestDataIndex;
}

//INSERT TEXTS
function insertTexts(chapter, texts) {
    for (var i = 0; i < texts.length; i++) {
        const paragraphDiv = document.createElement('p');
        const parentElement = chapter.querySelector(".textContainer");
        parentElement.appendChild(paragraphDiv);
        const paragraphText = texts[i];
        insertTextWithLineBreaks(paragraphText, paragraphDiv);

        //add bookworm hole at end of each paragraph
        //hole mask
        const imgDiv = document.createElement('div');
        imgDiv.classList.add("hole");
        imgDiv.classList.add("fakesticky");
        const holeWidth = randomize(10, 90);
        const holeHeight = holeWidth/2;
        const holeMargin = randomize(0, 100 - holeWidth);
        imgDiv.style.width = holeWidth + "vw";
        imgDiv.style.height = holeHeight + "vw";
        //the -1em is to account for the body's 1em margin
        imgDiv.style.marginLeft = `calc(${holeMargin}vw - 1em)`;
        parentElement.appendChild(imgDiv);

        //hole moth
        //?? Adding holemoths seems to mess up the scrolling a little, introduces wiggle room for scrolling back up, and extra down (so that the scanner line is scrolled past), which shouldn't be allowed at all. This problem only happens on touchscreen, not when it's desktop!
        // ??Adding this iteration seems to break the page?
        // const numHoleMoths = randomize(1, 2);
        // for (var i = 0; i < numHoleMoths; i++) {
            const img = document.createElement('img');
            img.classList.add("holeMoth");
            const randomImageUrl = mothImgs[Math.floor(Math.random() * mothImgs.length)];
            img.src = randomImageUrl;

            //?? WIP not sure this helps make the animation more organic/erratic
            // Use cubic-bezier timing function for the animation
            const timingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;
            const duration = randomize(.5, 2); // Adjust the duration as needed
            // Apply the animation
            img.style.transition = `left ${duration}s ${timingFunction}, top ${duration}s ${timingFunction}`;

            const mothHeight = randomize(20, 90);
            img.style.height = mothHeight + "vh";
            imgDiv.appendChild(img);
            setInterval(() => flutter(img, imgDiv.offsetWidth/2, imgDiv.offsetHeight/2, 200), duration*1000);
        // }
        

        lineIndex++;
        imgDiv.classList.add(`line${lineIndex}`);
        imgDiv.setAttribute('data-index', lineIndex);
        
    }
    
}

//SPLIT TEXT INTO LINES BY WINDOW WIDTH
function insertTextWithLineBreaks(text, parentElement) {
    const words = text.split(' ');

    let currentLine = '';
    let parentElementWidth = "";
    if (parentElement) {
        parentElementWidth = parentElement.offsetWidth;
    }
    else {
        console.log("no parent element exists")
        return
    }
    // console.log("parent element width is" + parentElementWidth);

    // Function to create a new Line div and append it to the parent
    function createNewLineDiv(lineText) {
        const lineDiv = document.createElement('div');
        lineDiv.classList.add("sticky");
        lineDiv.classList.add(`line${lineIndex}`);
        //?? this might not be necessary
        lineDiv.setAttribute('data-index', lineIndex);
        lineDiv.textContent = lineText;
        parentElement.appendChild(lineDiv);
    }

    for (var i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + word + ' ';
        // console.log("test line is: " + testLine);
        
        // Create a temporary span element to measure the width of the text
        const tempSpan = document.createElement('span');
        tempSpan.classList.add("temp");
        tempSpan.textContent = testLine;
        document.body.appendChild(tempSpan);
        //WIP
        // offsetWidth doesn't take into account the final space within the span, so width calculations can be off by like 20px
        const tempSpanWidth = tempSpan.offsetWidth;

        // console.log("temp span width is: " + tempSpanWidth);

        // Check if the width exceeds the window width
        if (tempSpanWidth > parentElementWidth) {
            // If it does, create a new line with the current line content
            //Note that .lineIndex starts at 1, not 0, because i've incremented it before I add the class in createLineDiv
            lineIndex++;
            createNewLineDiv(currentLine);
            // console.log("NEW LINE");

            // Start a new line with the current word
            currentLine = word + ' ';
        } else {
            // If it doesn't exceed the window width, continue building the current line
            currentLine = testLine;
        }

        // Remove the temporary span element
        document.body.removeChild(tempSpan);
    }

    // Create a div for the last line if there is any remaining text
    if (currentLine.trim() !== '') {
        lineIndex++;
        createNewLineDiv(currentLine.trim());
    }

    // define stickyDivs only once they have all been generated!
    stickyDivs = document.querySelectorAll('.sticky, .fakesticky');
}

//SCROLLING FUNCTIONS
function checkScroll(event) {
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollDifference = currentScrollTop - lastScrollTop;
    // console.log(shadowIndex);

    // disabling scrolling up so the user can only move forward
    if (currentScrollTop < lastScrollTop) {
        // event.preventDefault();
        window.scrollTo(0, lastScrollTop);
    }

    stickyDivs.forEach(function(stickyDiv) {

        //check if stickyDiv meets these conditions
        const isLatest = getClassName(stickyDiv, 'latest');
        const isFakesticky = getClassName(stickyDiv, "fakesticky");
        const isHole = getClassName(stickyDiv, "hole");
        const dataIndexValue = stickyDiv.getAttribute('data-index');
        
        const rect = stickyDiv.getBoundingClientRect();
        // make sure to keep it as <= and not just ==, since sometimes a sticked div seems to go further up than top = 0, and then it will appear if isAtOrAboveTop = rect.top == 0
        const isAtOrAboveTop = rect.top <= 0;
        const isBelowTop = rect.top > 0;

        // Toggle classes based on the position of the sticky div
        if (!isFakesticky) {
            stickyDiv.classList.toggle("blur", isAtOrAboveTop);
            stickyDiv.classList.toggle("transparent", isAtOrAboveTop);
        }

        //this is so that multiple duplicate shadow lines aren't added for the same stickyDiv
        stickyDiv.classList.toggle("latest", isAtOrAboveTop);

        if (isAtOrAboveTop) {
            // the problem is, isAtOrAboveTop will be true for all of the previously passed divs bc of their sticky position. So the additional !isLatest condition helps ensure that scrollingDown() is only run once, since as soon as a stickyDiv is unfixed from the top, it gains a .latest class and therefore no longer meets the required conditions
            if (currentScrollTop > lastScrollTop && !isLatest) {
                // console.log("scrolling down");
                //reset fakestickyScrollDifference for the most recently scrolled past stickyDiv
                fakestickyScrollDifference = 0;
                shadowIndex = parseInt(stickyDiv.getAttribute('data-index'), 10);
                scrollingDown(stickyDiv, isFakesticky, isHole);
            }

            //fakestickyScrollingDown() only for the most recently scrolled past stickyDiv (i.e., whose data-index matches shadowIndex)
            else if (dataIndexValue == shadowIndex && isFakesticky) {
                    fakestickyScrollingDown(stickyDiv, scrollDifference);
                
            }
        }
        // Same logic as above: these conditions help ensure that scrollingUp() only runs one time, as soon as a stickyDiv is unfixed from the top. Then the stickyDiv loses its .latest and therefore won't scrollingUp() a second time.
        // else if (isBelowTop) {
        //     if (currentScrollTop < lastScrollTop && isLatest && !isFakesticky) {
        //         fakestickyScrollDifference = 0;
        //         shadowIndex = parseInt(stickyDiv.getAttribute('data-index'), 10) -1;
        //         scrollingUp();
        //     }
        // }

        //this is so that multiple duplicate shadow lines aren't added for the same stickyDiv
        //?? I'm putting this after the isAtOrAboveTop just to make sure that the .latest class isn't removed from the stickyDiv before scrollingDown has a chance to run once. But I don't know if that actually makes a difference?
        // stickyDiv.classList.toggle("latest", isAtOrAboveTop);
        
    });

    lastScrollTop = currentScrollTop;
}


function scrollingDown(stickyDiv, isFakesticky, isHole) {
    // makeBGMoth();

    //ADD SHADOW LINE
    //??For some reason a random "" is prepended at the start of the shadowTextContainer at the first clonenode??
    const shadowLineDiv = stickyDiv.cloneNode(true);

    shadowLineDiv.classList.remove("sticky");
    shadowLineDiv.style.position = "relative";

    shadowLineDiv.classList.remove("blur");
    shadowLineDiv.classList.remove("transparent");
    shadowLineDiv.classList.add("shadowLine");
    if (!isFakesticky) {
        shadowLineDiv.classList.add("expand");
    }
    else if (isHole) {
        const holeMoths = shadowLineDiv.querySelectorAll("img");
        holeMoths.forEach((holeMoth) => {
            setInterval(() => flutter(holeMoth, shadowLineDiv.offsetWidth/2, shadowLineDiv.offsetHeight/2, 200), 1000);
        })
    }
    shadowTextContainer.prepend(shadowLineDiv);

}

function scrollingUp() {
    //REMOVE SHADOW LINE
    const removedShadow = shadowTextContainer.firstChild;
    //??For some reason sometimes more shadows are removed than should be, so that before we get to the top of the text, all the shadows have already been removed. At other times, not as many shadows are removed as should be. Why??
    if (removedShadow) {
        removedShadow.classList.add("transparent");
        removedShadow.classList.add("shrink");
        shadowTextContainer.removeChild(removedShadow);
        // ??I wanted to add this so that there could be a transition, but it seems like waiting 1s to removeChild() is making it so that a lot of shadowLines that should be remvoed are skipped over instead
        // setTimeout(() => {
        //     shadowTextContainer.removeChild(removedShadow);
        // }, 1000);
        // console.dir(removedShadow);
    }
    else {
        console.log("shadow to remove doesn't exist!")
    }
}

//FAKESTICKY SCROLLING
function fakestickyScrollingDown(stickyDiv, scrollDifference) {
    // console.log("fake scrolling down");
    //find the shadow div that corresponds to the most recently scrolled past stickyDiv
    const shadow = document.querySelector(`.fakesticky.latest.shadowLine[data-index="${shadowIndex}"]`);
    // console.log(shadow)
    // console.log(shadowIndex);
    const computedStyle = window.getComputedStyle(shadow);
    fakestickyScrollDifference = fakestickyScrollDifference + scrollDifference;

    //shift the shadow up so that the texts before it don't suddenly jump down
    shadow.style.top = `${-shadow.offsetHeight + fakestickyScrollDifference}px`;
    shadow.style.marginBottom = `${-shadow.offsetHeight + fakestickyScrollDifference}px`;
    
    // this needs to go after shadow.style.top is set for the first time above, otherwise shadow.style.top starts at 0 and this condition is automatically set forever
    if (parseInt(computedStyle.top) >= 0) {
        shadow.style.top = 0 + "px";
        shadow.style.marginBottom = 0 + "px";
        stickyDiv.classList.add("past");
    }
    // console.log(shadow.style.top)
    
}

//WIP: CLEAN UP SOMEHOW
// FLUTTER ANIMATIONS
function bgFlutter(movingDiv) {
    // Calculate new random positions
    const newLeft = randomize(0, window.innerWidth);
    const newTop = randomize(scrollY, scrollY + window.innerHeight);

    // Move the div to the new positions
    positionDiv(movingDiv, newLeft, newTop);

}

function flutter(mothContainer, x, y, variation) {
    x = randomize(x - variation, x + variation);
    y = randomize(y - variation, y + variation);
    
    positionDiv(mothContainer, x, y);
}


// set the window to start at the top each time I reload the page
window.onbeforeunload = function() {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
};

function init() {
    insertTexts(chapter1, chapter1Texts);
    insertTexts(chapter2, chapter2Texts);

    //get container height only once all stickyDivs have been inserted!
    totalHeight = container.scrollHeight;
    console.log(totalHeight);

    createMovingDivs();
    // updateSticky();

    window.addEventListener('scroll', checkScroll);
    // window.addEventListener('resize', updateSticky);

}

init();



