$(document).ready(function() {
    let autoScroll = false;
    let lastScrollTop = 0;

    $("html, body").animate({ scrollTop: 0 }, 1000); // Garante que a página começa no topo

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

    function smoothScroll(direction) {
        let currentScrollTop = $(window).scrollTop();
        let targetScrollTop = direction === 'up' ? Math.max(currentScrollTop - 300, 0) : currentScrollTop + 300;
        $("html, body").animate({ scrollTop: targetScrollTop }, 1000);
    }

    typeEffect($(".header-title .up"), "HI!", function() {
        typeEffect($(".header-title .down"), "I am Vitor Gabriel", function() {
            typeEffect($(".header-subtitle"), "FULL STACK DEVELOPER | DEVOPS ENTHUSIAST", function() {
                $("body").css("overflow-y", "auto");

                // Habilitar rolagem automática do mouse
                $(window).on('mousemove', function(e) {
                    let windowHeight = $(window).height();
                    let mouseY = e.clientY;

                    // Se o mouse estiver mais perto do topo, rolar para cima
                    if (mouseY < 50) {
                        if (lastScrollTop !== 0) {
                            smoothScroll('up');
                            lastScrollTop = 0;
                        }
                    }
                    // Se o mouse estiver mais perto do fundo, rolar para baixo
                    else if (mouseY > windowHeight - 50) {
                        if (lastScrollTop !== 1) {
                            smoothScroll('down');
                            lastScrollTop = 1;
                        }
                    }
                });
            });
        });
    });
});
