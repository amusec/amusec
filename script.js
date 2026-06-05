/* ==========================================
   VIVEK JOURNEY WEBSITE
   script.js
========================================== */


/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const revealElements = document.querySelectorAll(
    ".chapter, .mindset-card, .contact-card"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ==========================================
   SMOOTH NAVIGATION
========================================== */

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if(target){

                target.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });

            }

        }
    );

});


/* ==========================================
   ACTIVE NAVBAR HIGHLIGHT
========================================== */

const navLinks =
document.querySelectorAll(".nav-links a");

const sections =
document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if(
            window.scrollY >= sectionTop
        ){

            currentSection =
                section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href")
            .replace("#","");

        if(href === currentSection){

            link.classList.add("active");

        }

    });

});


/* ==========================================
   TERMINAL TYPING EFFECT
========================================== */

const terminalElement =
document.querySelector(".terminal");

if(terminalElement){

    const commands = [

        "whoami",

        "cat story.txt",

        "sudo learn_everything",

        "ssh curiosity",

        "build impossible",

        "grep meaning life.log",

        "explore --recursive",

        "while(true){ learn(); }"

    ];

    let cmdIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeCommand(){

        const current =
            commands[cmdIndex];

        if(!deleting){

            terminalElement.textContent =
            "vivek@life:~$ " +
            current.substring(
                0,
                charIndex + 1
            );

            charIndex++;

            if(
                charIndex === current.length
            ){

                deleting = true;

                setTimeout(
                    typeCommand,
                    1500
                );

                return;
            }

        }else{

            terminalElement.textContent =
            "vivek@life:~$ " +
            current.substring(
                0,
                charIndex - 1
            );

            charIndex--;

            if(charIndex === 0){

                deleting = false;

                cmdIndex++;

                if(
                    cmdIndex >= commands.length
                ){
                    cmdIndex = 0;
                }

            }

        }

        setTimeout(
            typeCommand,
            deleting ? 35 : 70
        );

    }

    typeCommand();

}


/* ==========================================
   READING PROGRESS BAR
========================================== */

const progressBar =
document.createElement("div");

progressBar.id =
"reading-progress";

document.body.appendChild(
    progressBar
);

window.addEventListener(
    "scroll",
    () => {

        const totalHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            (window.scrollY / totalHeight)
            * 100;

        progressBar.style.width =
            progress + "%";

    }
);


/* ==========================================
   PROGRESS BAR STYLE
========================================== */

const progressStyle =
document.createElement("style");

progressStyle.innerHTML = `

#reading-progress{

    position:fixed;

    top:0;
    left:0;

    height:3px;

    width:0%;

    background:#00ff88;

    z-index:99999;

    box-shadow:
    0 0 10px #00ff88,
    0 0 25px #00ff88;

}

.nav-links a.active{

    color:#00ff88;

}

`;

document.head.appendChild(
    progressStyle
);


/* ==========================================
   HERO PARALLAX
========================================== */

const hero =
document.getElementById("hero");

window.addEventListener(
    "scroll",
    () => {

        const scrollY =
            window.scrollY;

        if(hero){

            hero.style.transform =
            `translateY(${scrollY * 0.05}px)`;

        }

    }
);


/* ==========================================
   CHAPTER HIGHLIGHT
========================================== */

const chapters =
document.querySelectorAll(".chapter");

const chapterObserver =
new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.style.transition =
                    "all 0.5s ease";

                entry.target.style.transform =
                    "translateY(0px)";

            }

        });

    },

    {
        threshold:0.3
    }

);

chapters.forEach(chapter => {

    chapterObserver.observe(
        chapter
    );

});


/* ==========================================
   QUOTE GLOW EFFECT
========================================== */

const quotes =
document.querySelectorAll(
    "blockquote"
);

quotes.forEach(quote => {

    quote.addEventListener(
        "mouseenter",
        () => {

            quote.style.boxShadow =
            "0 0 30px rgba(0,255,136,.2)";

        }
    );

    quote.addEventListener(
        "mouseleave",
        () => {

            quote.style.boxShadow =
            "none";

        }
    );

});


/* ==========================================
   FLOATING CURSOR GLOW
========================================== */

const glow =
document.createElement("div");

glow.id = "cursor-glow";

document.body.appendChild(
    glow
);

const glowStyle =
document.createElement("style");

glowStyle.innerHTML = `

#cursor-glow{

    position:fixed;

    width:250px;
    height:250px;

    border-radius:50%;

    background:
    radial-gradient(
        circle,
        rgba(0,255,136,.12),
        transparent 70%
    );

    pointer-events:none;

    transform:
    translate(-50%,-50%);

    z-index:-1;

}

`;

document.head.appendChild(
    glowStyle
);

document.addEventListener(
    "mousemove",
    e => {

        glow.style.left =
            e.clientX + "px";

        glow.style.top =
            e.clientY + "px";

    }
);


/* ==========================================
   FOOTER TERMINAL STATUS
========================================== */

const footerText =
document.querySelector(
    "footer p"
);

if(footerText){

    const statuses = [

        "vivek@life:~$ learning",

        "vivek@life:~$ building",

        "vivek@life:~$ debugging",

        "vivek@life:~$ exploring",

        "vivek@life:~$ experimenting",

        "vivek@life:~$ still curious",

        "vivek@life:~$ solving problems",

        "vivek@life:~$ never finished"

    ];

    setInterval(() => {

        const randomStatus =

            statuses[
                Math.floor(
                    Math.random() *
                    statuses.length
                )
            ];

        footerText.textContent =
            randomStatus;

    }, 3500);

}


/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log(`

=========================================

Hi there.

If you're reading this,
you're probably curious too.

That's how all of this started.

One HTML chapter.
One question.

"How does this actually work?"

Stay curious.

- Vivek

=========================================

`);


/* ==========================================
   EASTER EGG
========================================== */

let keySequence = "";

document.addEventListener(
    "keydown",
    e => {

        keySequence +=
            e.key.toLowerCase();

        if(
            keySequence.includes(
                "curious"
            )
        ){

            alert(
                "Curiosity built everything you see here."
            );

            keySequence = "";
        }

        if(
            keySequence.length > 25
        ){

            keySequence =
            keySequence.slice(-25);

        }

    }
);
