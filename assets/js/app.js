$(document).ready(function() {

    $(".preety-print").addClass("hide-top");

    let autoScroll = false;
    $("html, body").animate({ scrollTop: 0 }, 1000);

    function typeEffect(element, text, callback) {
        let currentLength = 0;
        let typingSpeed = 50;

        let interval = setInterval(function() {
            if (currentLength < text.length) {
                currentLength++;
                element.html(text.substring(0, currentLength));
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, typingSpeed);
    }

    typeEffect($(".header-title .up"), "HI!", function() {
        typeEffect($(".header-title .down"), "I am Vitor Gabriel", function() {
            typeEffect($(".header-subtitle"), "FULL STACK DEVELOPER | DEVOPS ENTHUSIAST", function() {
                $("body").css("overflow-y", "auto");

                setTimeout(function() {
                    autoScroll = true;
                    $(".preety-print").removeClass("hide-top");
                }, 2000);
            });
        });
    });
    
    $(window).on('scroll', function() {
        if (autoScroll) {
            autoScroll = false;
        }
    });


    const data = {
        name: "Vitor Gabriel de Oliveira",
        profession: "Full Stack Developer",
        birthYear: 2007,
        bio: "Since a young age, I've been dedicated to programming and innovation. I am passionate about technology and its power to create solutions and connect people. I enjoy exploring new fields and understanding how my knowledge can interconnect. I am driven by challenges, especially those that seem impossible to solve. I always strive to push my limits and identify areas where I can further develop.",
        journey: {
            frontEnd: {
                start: "HTML, CSS, SCSS, SASS, LESS",
                frameworks: ["Bootstrap", "UIKit", "Tailwind"],
                javascript: ["jQuery", "React", "Angular", "Astro", "Vue"]
            },
            backEnd: {
                languages: ["PHP", "Node.js"],
                tools: ["GraphQL", "Laravel", "REST APIs"]
            },
            devOps: {
                os: "Linux",
                platforms: ["AWS", "DigitalOcean", "HostGator VPS"],
                tools: ["Docker", "Kubernetes", "CI/CD", "PM2"]
            },
            blockchain: {
                concepts: ["Blocks", "Binary Trees", "Hash Encryption", "Proof of Work", "Peer-to-Peer Communication"],
                projects: ["Blockchain Prototype in Node.js", "Optimized Mining with AI"]
            }
        },
        activities: {
            employment: [
                {
                    company: "Clickweb",
                    location: "Londrina, Paraná, BR",
                    position: "Full Stack Developer Junior",
                    startDate: "2024-01-03",
                    endDate: "Present"
                },
                {
                    company: "Clickweb",
                    location: "Londrina, Paraná, BR",
                    position: "Estagiário - Desenvolvedor",
                    startDate: "2023-10-08",
                    endDate: "2024-12-31"
                }
            ],
            education: [
                {
                    institution: "Marista Escola Social Irmão Acácio",
                    location: "Londrina, Paraná, BR",
                    course: "Ensino médio técnico de informática para internet",
                    startDate: "2022-03-01",
                    endDate: "2024-12-12"
                }
            ]
        },
        skills: ["JavaScript", "Node.js", "React", "CSS", "HTML", "Docker"],
        contact: {
            email: "vitorgabrieldeoliveiradev@gmail.com",
            business: "vitorgabrieldeoliveira.business@gmail.com",
            phone: "+55 43 98487-3807"
        }
    };
    

    function printJSON() {
        const prettyJSON = JSON.stringify(data, null, 4);
        $("#json-output").text(prettyJSON);
    }

    $(".pretty-render").hide();

    $("#prety").on("change", function() {
        if ($(this).prop("checked")) {
            $(".pretty-render").show();
            $(".pretty-none").hide();
            printJSON();
        } else {
            $(".pretty-none").show();
            $(".pretty-render").hide();
        }
    });

    const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
});

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

let mouseMoved = false;

const pointer = {
    x: .5 * window.innerWidth,
    y: .5 * window.innerHeight,
};

const params = {
    pointsNumber: 40,
    widthFactor: .3,
    mouseThreshold: .6,
    spring: .4,
    friction: .5
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
    trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    };
}

window.addEventListener("click", e => {
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("mousemove", e => {
    mouseMoved = true;
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("touchmove", e => {
    mouseMoved = true;
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

function updateMousePosition(eX, eY) {
    pointer.x = eX;
    pointer.y = eY;
}

setupCanvas();
update(0);
window.addEventListener("resize", setupCanvas);

function update(t) {

    if (!mouseMoved) {
        pointer.x = (.5 + .3 * Math.cos(.002 * t) * (Math.sin(.005 * t))) * window.innerWidth;
        pointer.y = (.5 + .2 * (Math.cos(.005 * t)) + .1 * Math.cos(.01 * t)) * window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Define the color of the trail
    ctx.strokeStyle = "#603ED7"; // Change this to any color you want for the trail
    
    trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? .4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
    });

    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
        const xc = .5 * (trail[i].x + trail[i + 1].x);
        const yc = .5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
    }
    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    ctx.stroke();

    window.requestAnimationFrame(update);
}

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
}


});