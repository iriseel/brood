const textDiv = document.querySelector(".text");

const babyImgs = [
    "imgs/baby/baby1.jpeg",
    "imgs/baby/baby2.jpeg",
    "imgs/baby/newborn.jpeg",
    "imgs/baby/vernix_feet.jpeg",
    "imgs/baby/vernix1.jpeg",
    "imgs/baby/vernix2.jpeg",
    // "imgs/",
    // "imgs/",
]

const candleImgs = [
    "imgs/candle/candle1.gif",
    "imgs/candle/candle2.gif",
    "imgs/candle/candle3.gif",
]

const fireworksImgs = [
    "imgs/fireworks/july4_fireworks1.jpg",
    "imgs/fireworks/july4_fireworks2.jpg",
    "imgs/fireworks/october10_fireworks1.jpg",
    "imgs/fireworks/october10_fireworks2.jpg",
]

const migrationImgs = [
    "imgs/migration/cranes1.jpeg",
    "imgs/migration/cranes2.jpeg",
    "imgs/migration/geese.jpeg",
    "imgs/migration/waders.jpeg",
]

const perennialsImgs = [
    "imgs/perennials/chicory.jpeg",
    "imgs/perennials/dahlia.jpeg",
    "imgs/perennials/pear.jpeg",
]

const june4Imgs = [
    "imgs/hk/victoria_park_2021_1.jpeg",
    "imgs/hk/victoria_park_2021_2.jpeg",
    "imgs/hk/victoria_park_2022_1.jpeg",
    "imgs/hk/victoria_park_2022_2.jpeg",
    "imgs/hk/victoria_park_2023_1.jpeg",

]

const texts = [
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

const mothImgs = [
    "imgs/scan_moths/img20231107_18184108.png",
    "imgs/scan_moths/img20231107_17580860_1.png",
    "imgs/scan_moths/img20231107_17580860_2.png"
];

let counter = 0;
let textCounter = 0;
let babyImgsCounter = 0;
let candleImgsCounter = 0;
let fireworksImgsCounter = 0;
let migrationImgsCounter = 0;
let perennialsImgsCounter = 0;
let june4ImgsCounter = 0;

let popup_w;
let popupWidth_Min = 100;
let popupWidth_Max = 300;
let popupHeight_Min = 100;
let popupHeight_Max = 300;
let leftPos;
let topPos;

let paragraphIndex = 0;

function popup(imgs, imgCounter) {
        let popupWidth =
            Math.floor(Math.random() * (popupWidth_Max - popupWidth_Min + 1)) +
            popupWidth_Min;
        let popupHeight =
            Math.floor(
                Math.random() * (popupHeight_Max - popupHeight_Min + 1)
            ) + popupHeight_Min;
        const screenWidth = window.screen.availWidth;
        const screenHeight = window.screen.availHeight;
        var leftPos = Math.floor(Math.random() * (screenWidth - popupWidth));
        var topPos = Math.floor(Math.random() * (screenHeight - popupHeight));

        var popupName = "Popup" + counter;

        popup_w = window.open(
            "",
            popupName,
            `width=${popupWidth},height=${popupHeight}, left=${leftPos}, top=${topPos}`
        );

        popup_w.document.write(
            `<html><head><link rel="stylesheet" href="popup.css" /><title>${texts[counter]}</title></head><body>
            <div class="popup">
                <img src="${imgs[imgCounter]}">
            </div>
            <script src="popup.js"></script>
            </body></html>`
        );

        counter++;
        textCounter++;

        //??Why does this stay at 1??
        imgCounter++;
        console.log(imgCounter);


        if (imgCounter > imgs.length - 1) {
            imgCounter = 0;
        }

        if (textCounter > texts.length - 1) {
            textCounter = 0;
        }
    
}


//every year
setInterval(() => popup(babyImgs, babyImgsCounter), 31556926000);
setInterval(() => popup(june4Imgs, june4ImgsCounter), 31556926000);

setInterval(() => popup(fireworksImgs, fireworksImgsCounter), 86400000);
setInterval(() => popup(migrationImgs, migrationImgsCounter), 31556926000);
setInterval(() => popup(perennialsImgs, perennialsImgsCounter), 31556926000);


// setInterval(() => popup(fireworksImgs, fireworksImgsCounter), 3000);
// setInterval(() => popup(migrationImgs, migrationImgsCounter), 4000);


// Function to generate a random letter from the alphabet
function getRandomLetter() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}
  
// Function to change the color of a random letter in the text
function changeRandomLetter() {
    const randomLetter = getRandomLetter();
    // Create a regular expression to match the random letter
    const regex = new RegExp(randomLetter, 'gi'); // 'gi' flag makes it case-insensitive

    const paragraphs = document.querySelectorAll('.text p');
   
    paragraphs.forEach((paragraph) => {
        const paragraphText = paragraph.textContent;

        // Replace the matched letter with a span element to change its color
        const newText = paragraphText.replace(regex, (match) => {
            return `<span class="alteredLetter">${match}</span>`;
        });
        
       paragraph.innerHTML = newText;
    });
    
   
}

// Initial call to remove a random letter when the page loads
// setTimeout(function() {changeRandomLetter(); }, 2000);
// setTimeout(insertMoth(), 2000);
// setTimeout(insertMoth(), 5000);
// setInterval(() => insertMoth(), 1000);


function insertTexts() {
    textDiv.innerHTML="";
    for (var i = 0; i < texts.length; i++) {
        const paragraph = document.createElement('p');
        textDiv.appendChild(paragraph);
        const paragraphText = texts[i];
        // Split text into an array of characters
        const characters = paragraphText.split('');

        for (var m = 0; m < characters.length; m++) {
        
            // Append the character to the content div
            paragraph.appendChild(document.createTextNode(characters[m]));
        }
        
    }
}

insertTexts();

function insertMoth() {
    textDiv.innerHTML="";
    for (var i = 0; i < texts.length; i++) {
        console.log("loop")
        const paragraph = document.createElement('p');
        textDiv.appendChild(paragraph);
        const paragraphText = texts[i];
        // Split text into an array of characters
        const characters = paragraphText.split('');

        for (var m = 0; m < characters.length; m++) {
            // Decide whether to insert an image (50% chance in this example)
            // var insertImage = Math.random() < 0.01;
        
            // if (insertImage) {
            //   // Randomly select an image URL
            //   var randomImageUrl = mothImgs[Math.floor(Math.random() * mothImgs.length)];
        
            //   // Create an <img> element and set its source
            //   var imgElement = document.createElement('img');
            //   imgElement.classList.add("moth");
            //   imgElement.src = randomImageUrl;
        
            //   // Append the image to the content div
            //   paragraph.appendChild(imgElement);
            // }
        
            // Append the character to the content div
            paragraph.appendChild(document.createTextNode(characters[m]));
        }
        
    }

}

let lastMove = null;

document.addEventListener('touchstart', function(event) {
    const touch = event.touches[0]; // Consider the first touch for simplicity
    console.log(event.touches);
    const x = touch.clientX;
    const y = touch.clientY;
    lastMove = event;
   
    sendFliestoTarget(x, y);
})


// Override with touchmove, which is triggered only on move
document.addEventListener('touchmove', function(event) {
  lastMove = event;
});

document.addEventListener('touchend', function(event) {
    setTimeout(sendFliestoEdges(), 2000);
    console.log("touchend")
})


function getEdgePositions() {
    // Calculate random positions on the window edges
    const edge = Math.floor(Math.random() * 4); // Choose a random edge (0 - top, 1 - right, 2 - bottom, 3 - left)

    let edgeX, edgeY;
    const buffer = 50; // Distance from the window border

    switch (edge) {
        case 0: // Top edge
            x = Math.random() * window.innerWidth;
            y = -buffer;
            break;
        case 1: // Right edge
            x = window.innerWidth + buffer;
            y = Math.random() * window.innerHeight;
            break;
        case 2: // Bottom edge
            x = Math.random() * window.innerWidth;
            y = window.innerHeight + buffer;
            break;
        case 3: // Left edge
            x = -buffer;
            y = Math.random() * window.innerHeight;
            break;
    }

    return [edgeX, edgeY];
}


//CREATE FLIES
// Function to create divs at random positions and animate towards the target
function createMovingDivs() {
    const numDivs = 10; // Number of divs to create
    
    for (let i = 0; i < numDivs; i++) {
        const mothContainer = document.createElement('div');
        mothContainer.classList.add('moth_container');
        const moth = document.createElement('div');
        moth.classList.add('moth');
        const imgElement = document.createElement('img');
        
        const randomImageUrl = mothImgs[Math.floor(Math.random() * mothImgs.length)];
        imgElement.src = randomImageUrl;

        // const mothSize = randomize()

        const [edgeX, edgeY] = getEdgePositions();

        mothContainer.style.top = `${edgeY}px`;
        mothContainer.style.left = `${edgeX}px`;

        document.body.appendChild(mothContainer);
        mothContainer.appendChild(moth);
        moth.appendChild(imgElement);
    }
}

createMovingDivs();

//DISPERSE FLIES
function sendFliestoEdges() {
    const mothContainers = document.querySelectorAll(".moth_container");
    const flies = document.querySelectorAll(".moth");

    mothContainers.forEach((mothContainer) => {
        const [edgeX, edgeY] = getEdgePositions();
        mothContainer.style.top = `${edgeY}px`;
        mothContainer.style.left = `${edgeX}px`;
        console.log("sending to edge")


        // const deltaX = edgeX - mothContainer.getBoundingClientRect().left;
        // const deltaY = edgeY - mothContainer.getBoundingClientRect().top;
        // const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        // const speed = randomize(200, 300); // Varying speed

        // // ??The moth dispersal isn't working quite right. They're not going to the window edges?
        // mothContainer.style.transition = `transform ${distance / speed}s`;
        // mothContainer.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    })

}

//GATHER FLIES
function sendFliestoTarget(x, y) {
    const variation = 100;
    const mothContainers = document.querySelectorAll(".moth_container");
    const moths = document.querySelectorAll(".moth");
    // Calculate the distance and duration based on div's initial position
    mothContainers.forEach((mothContainer) => {

        x = randomize(x - variation, x + variation);
        y = randomize(y - variation, y + variation);
        // ??Somehow they all end up towards the middle of the target?
        // const deltaX = x - mothContainer.getBoundingClientRect().left;
        // const deltaY = y - mothContainer.getBoundingClientRect().top;
        // const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        // const speed = randomize(100, 300); // Varying speed

        // mothContainer.style.transition = `transform ${distance / speed}s`;
        // mothContainer.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        
        mothContainer.style.left = x + "px";
        mothContainer.style.top = y + "px";

    })
}


//GENERAL FUNCTIONS
function randomize(min, max) {
    return min + Math.random() * (max - min);
}