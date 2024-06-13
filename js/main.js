$(document).ready(function() {
    let currentIndex = 0;
    const items = $('.carrossel-item');
    const itemCount = items.length;
    const intervalTime = 5000; // Tempo em milissegundos (5 segundos)

    function updateCarousel() {
        items.fadeOut(500).eq(currentIndex).fadeIn(500); // Troca de imagens com efeito fade
    }

    $('#next').click(function() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    });

    $('#prev').click(function() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    });

    // Troca de imagem a cada intervalo definido automatico
    let carouselInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }, intervalTime);

    // Parar o mouse sobre os botões de controle do carrossel, a execução sera interrompida
    $('.carrossel-controls button').on('mouseenter', function() {
        clearInterval(carouselInterval);
    }).on('mouseleave', function() {
        carouselInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        }, intervalTime);
    });

    // Inicia o carrossel mostrando o primeiro item
    updateCarousel();
});


// Pesquisa e filtro de pagina artigos
$(document).ready(function() {
    $('#search').on('keyup', function() {
        const searchTerm = $(this).val().toLowerCase();
        $('.article-list article').each(function() {
            const articleText = $(this).text().toLowerCase();
            if (articleText.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

// Função de planejamento de saúde
$(document).ready(function() {
    $('#health-planner').on('submit', function(event) {
        event.preventDefault();

        const goal = $('#goal').val();
        const duration = $('#duration').val();
        const steps = $('#steps').val();

        $('#summary-goal').text(goal);
        $('#summary-duration').text(duration);
        $('#summary-steps').text(steps);

        $('#plan-summary').show();
        $(this)[0].reset();
    });
});

// Função de formulário de contato
$(document).ready(function() {
    $('#contact-form').on('submit', function(event) {
        event.preventDefault();

        $('#contact-summary').show();
        $(this)[0].reset();
    });
});
