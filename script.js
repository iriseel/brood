let touchDevice = false;

let mothContainers = null;
let flutterIntervals = [];
let lineIndex = 0;
let chapterNum = 0;
const container = document.querySelector(".container");
const chapter1 = document.querySelector(".chapter1");
const chapter2 = document.querySelector(".chapter2");
const chapter3 = document.querySelector(".chapter3");
const shadowTextContainer = document.querySelector(".shadowTextContainer");
const allMothsContainer = document.querySelector(".allMothsContainer");
let stickyDivs = [];

let lastScrollTop = 0;

//shadowIndex is for keeping track of which stickyDiv/shadow is the most recently generated
let shadowIndex = 0;
let fakestickyScrollDifference = 0;

const mothImgs = [
    "imgs/scan_moths/img20231107_17445165_1.png",
    "imgs/scan_moths/img20231107_17445165_2.png",
    "imgs/scan_moths/img20231107_17445165_3.png",
    "imgs/scan_moths/img20231107_17580860_1.png",
    "imgs/scan_moths/img20231107_17580860_2.png",
    "imgs/scan_moths/img20231107_18165319.png",
    "imgs/scan_moths/img20231107_18174427_1.png",
    "imgs/scan_moths/img20231107_18174427_2.png",
    "imgs/scan_moths/img20231107_18184108_1.png",
    "imgs/scan_moths/img20231107_18184108_2.png",
    "imgs/scan_moths/img20231107_18184108.png",
    "imgs/scan_moths/img20231107_18223046_1.png",
    "imgs/scan_moths/img20231107_18223046_2.png",
    "imgs/scan_moths/img20231107_18231857.png",
    "imgs/scan_moths/img20231107_18273517.png",
    // "imgs/scan_moths/",
    // "imgs/scan_moths/",
    // "imgs/scan_moths/",
    // "imgs/scan_moths/"
];

// const mothHoleImgs = [
//     "imgs/holes/hole1.png",
//     "imgs/holes/hole2.png",
// ];

const headerImgs = [
    "imgs/scan_words/emergence.png",
    "imgs/scan_words/inheritance.png",
    "imgs/scan_words/passing_on.png",
]

const chapter1Texts = [
    "One theory was that the disease started when the moths ate through the archives. Perhaps they were attracted by their disuse, all that history unnourished by life. There was no need for book burning when you could just let them mold. From the moths, the history passed to the bees, the cicadas, the butterflies, the roaches, the locusts, and the maggots. No one noticed a difference in their behaviors.",
    "Another theory was that they simply absorbed the memories from all the surfaces of the world, the trash on the streets, the witness trees and building facades and shoddily repaired pavements, the albums and trinkets traded at flea markets.",
    "Either way, it was not long before humans became carriers.",
    "Dejavu is the first sign. The sights, sounds, smells come from elsewhere. First in passing, then in pursuit. Faces as old as new, intimate conversations with strangers, unfamiliar objects fitting snugly in the hand.",
    "It was the cicadas, the ones that come every 17 years. My grandmother remembers seeing them everywhere, on the trees, the buildings, the ground. One couldn’t walk without catching a fistful of vibrating wings. It was like rain. Some people wielded umbrellas as shields.",
    "She was blindsided by her first exposure. It was a hot day in August. She had to go out to buy some groceries. She was standing at the crosswalk, waiting for the light to turn. All around her was sound. She felt that all the vibration generated a heat that made the already sweltering weather even more unbearable. The buzzing began to sound like language when suddenly she found herself in a mass of heaving bodies, chanting words in a language she did not understand. The man on stage wore a strange, tall cone of a hat with scribbles on it, his head hung low, but familiar in a way that terrified her.",
    "She later learned that one of her mother’s memories had found her. It turns out that it is quite common for the insects to mistake the relatives of the memories’ former inhabitants for the inhabitants themselves. It is still a mystery how they find their ways to us. Some scientists have proposed that they are attracted to our blood like sugar water. Others have found that these new species of moths are attracted to darkness, and find refuge in the murky crevices within our bodies. Maybe no darkness is the same, but it is inherited.",
    "It was not long before serious cases appeared. During dinner, an elderly woman was sabotaged with visions of relatives’ emaciated limbs and swollen bellies, and lost her sight. In the middle of a meeting, a middle-aged man pleaded with his employer to lower his gun and spare his life, swearing that he was not a Communist like his brother.",
    "Governments and hospitals scrambled to classify and contain the rapidly spreading disease. It wasn’t long before the men in white suits came and sealed their apartment doors from the outside, and then entire buildings, complexes, even cities. Temporary field hospitals were hastily set up to accommodate the sudden outbreak. People were sprayed with pesticides at checkpoints. Once it regained its bearings after the first few emergences, the government tried to predict the mass eruptions and squash the nymphs as they surfaced from the ground. The insects that had not yet nested into hosts were collected in batches, and passed through shredding trucks. They came out the other end as fluffy snowdrifts, soft confetti. But there never seemed to be enough trucks.",
    "Most of those afflicted hovered around stages 1 and 2, and learned to live with the spates of buzzing and accompanying impulse to pass on their visions. The urge would break over you like a combination of immense nausea and intelligible tinnitus. It was horrible, but you grew used to bearing with it. You could track a person’s progression in the disease with the frequency of their compulsive outpourings, in person or online, as their profile filled up with pleas to never forget some obscure date, eulogies for strangers, reminiscences directed at no one in particular. As soon as anyone advanced to stage 3, the government automatically shut down their social media accounts. They knew that soon they would be ranting their memories to any ear and any online forum within reach, sometimes by force if necessary. Stage 4 was comparatively quiet. Locked in their rooms or roaming the streets, they would chitter, twitch, and click around, looking for things with antennae they didn't have. People learned to avoid those who were too far gone. It wouldn’t be long before the white suits took them away.",
    "For all the glowing advertisements and state endorsements, surgery produced mixed results. The location where the insects made their nests seemed arbitrary. Some colonies would be found resting atop or within the folds of the brain, others in between the folds of intestines, others beneath the shin. Usually patients left the operating table with some part of their body missing, with no guarantee that any stray eggs wouldn’t briskly repopulate.",
    "Doctors dissected the insects, trying to find some organ of memory, some special synapse, but all their medical examinations, their clinical trials, produced the simple result that they were only bugs. It was like trying to uncover the location of the human soul.",
    "It was taboo to acknowledge aloud, but the illness was not always just something to cope with. To some, maybe a number more than can be admitted, the infection came as a relief, a gift. Some greeted their parasites as old friends, others revered them as mediums, and all evaded treatment. For them, the humming was as grounding as it was disorienting. They came to develop a feeling of responsibility for the wellbeing of their inhabitants, terror even at the thought of their leaving, and thus tried to condition their interiors to be as welcoming as possible. But the insects are cruel. They always overstay their welcome in the bodies of those who don't want them, and leave early from those who don't want to let them go.",
    // "",
    // "",
    // "",
    // "",
    
];

const chapter2Texts = [
    "Then, once the children started to cry and gaze strangely into the distance, it was discovered that the insects were hereditary. Like a woman whose grandmother’s features only surface in her face in adulthood, usually you didn’t find out what you inherited till much later. You could try to predict when a brood would emerge, but it was not always reliable. Sometimes, when the weather was warm, you ate something wrong, or some other obscure conditions were met, they would hatch early.",
    //?? NOT ACTUALLY CHAPTER 2, BUT JUST PUTTING THEM HERE FOR NOW
]

const chapter3Texts = [
    "Ten years after her first infection and five years after I had moved abroad, my mother was hospitalized. When I returned to visit her, I could hear the humming as soon as I entered the room. When she opened her mouth, I saw hundreds of vibrating wings, rising rhythmically with the sound. The doctor had warned me that they had replaced most of her tongue.",
    "Those who, like my mother, reached the terminal stage of possession were completely immobilized. They stayed frozen in place at the site of the final outbreak, their brains flooded with the past. There was no future for those who had progressed to this stage — the activity of memory occupied so much of their being that they could not even eat or drink, and soon even blinking and breathing would be beyond them. Rumors circulated that some terminal cases would shed their skins and molt, flying away.",
    "I did not witness so spectacular an emergence in my mother’s last moments. Yet, looking into her eyes, I saw something liquid move behind them. When I touched her, her edges were soft. Later I saw moths gathering at her grave.",
]


//every year
// setInterval(() => popup(fireworksImgs, fireworksImgsCounter), 31556926000);

// TOUCH EVENTS
document.addEventListener('touchstart', function(event) {
    const touch = event.touches[0]; // Consider the first touch for simplicity
    console.log(event.touches);
    const x = touch.clientX;
    const y = touch.clientY;
   
    clearAllFlutterIntervals();
    sendMothstoTarget(x, y);
})


document.addEventListener('touchend', function(event) {
    setTimeout(() => sendMothstoEdges(), 1000);
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

//SEND MOTHS TO TARGET
function sendMothstoTarget(x, y) {
    const variation = 100;
    mothContainers = document.querySelectorAll(".moth_container");
    // Calculate the distance and duration based on div's initial position
    mothContainers.forEach((mothContainer) => {
        const randomImageUrl = mothImgs[Math.floor(Math.random() * mothImgs.length)];
        const imgElement = mothContainer.querySelector(".moth").querySelector("img");
        imgElement.src = randomImageUrl;
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

    const mothSize = randomize(10, 80);
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
    const headerDiv = document.createElement('div');
        headerDiv.classList.add("header");
        headerDiv.classList.add("fakesticky");
        lineIndex++;
        headerDiv.classList.add(`line${lineIndex}`);
        headerDiv.setAttribute('data-index', lineIndex);

        const headerImg = document.createElement("img");
        headerImg.src = headerImgs[chapterNum];

        chapter.prepend(headerDiv);
        headerDiv.appendChild(headerImg);
        chapterNum++;
    for (var i = 0; i < texts.length; i++) {

        const paragraphDiv = document.createElement('p');
        const parentElement = chapter.querySelector(".textContainer");
        parentElement.appendChild(paragraphDiv);
        const paragraphText = texts[i];
        insertTextWithLineBreaks(paragraphText, paragraphDiv);
        

        if (!touchDevice) {
            //add bookworm hole at end of each paragraph
            //hole mask
            const imgDiv = document.createElement('div');
            imgDiv.classList.add("hole");
            imgDiv.classList.add("fakesticky");
            const holeWidth = randomize(10, 40);
            const holeHeight = randomize(10, 30);
            const holeMargin = randomize(0, 100 - holeWidth);
            imgDiv.style.width = holeWidth + "%";
            imgDiv.style.height = holeHeight + "vh";
            //the -1em is to account for the body's 1em margin
            imgDiv.style.marginLeft = `calc(${holeMargin}% - 1em)`;
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

                const mothHeight = randomize(20, 80);
                img.style.height = mothHeight + "vh";
                imgDiv.appendChild(img);
                setInterval(() => flutter(img, imgDiv.offsetWidth/2, imgDiv.offsetHeight/2, 200), duration*1000);
            // }

            lineIndex++;
            imgDiv.classList.add(`line${lineIndex}`);
            imgDiv.setAttribute('data-index', lineIndex);

        }
        
        
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
        
    });

    lastScrollTop = currentScrollTop;
}


function scrollingDown(stickyDiv, isFakesticky, isHole) {

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

//detect if touchscreen
if ('ontouchstart' in window || navigator.maxTouchPoints) {
    // The device supports touch events
    console.log("Touch events supported");
    touchDevice = true;
} else {
    // The device does not support touch events
    touchDevice = false;
}

function init() {
    insertTexts(chapter1, chapter1Texts);
    insertTexts(chapter2, chapter2Texts);
    insertTexts(chapter3, chapter3Texts);

    if (touchDevice) {
        createMovingDivs();
    }
    // updateSticky();

    window.addEventListener('scroll', checkScroll);
    // window.addEventListener('resize', updateSticky);

}

init();



