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

    const menu = document.querySelector('.settings');

    const toggleView = (event) => {
        if (event.ctrlKey && event.key === 'm') {
            if ($(".pretty-render").is(":visible")) {
                $(".pretty-render").hide();
                $(".pretty-none").show();
            } else {
                $(".pretty-render").show();
                $(".pretty-none").hide();
                printJSON();
            }
        }
    };

    document.addEventListener('keydown', toggleView);
});