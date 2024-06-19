$(document).ready(function() {
    // Função do Carrossel
    let currentIndex = 0;
    const items = $('.carrossel-item');
    const itemCount = items.length;
    const intervalTime = 5000; // Tempo em milissegundos (5 segundos)
    let carouselInterval;

    function updateCarousel() {
        items.each(function(index) {
            if(index === currentIndex) {
                $(this).fadeIn(500);
            } else {
                $(this).fadeOut(500);
            }
        });
    }

    function startCarousel() {
        if (carouselInterval) clearInterval(carouselInterval);
        carouselInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        }, intervalTime);
    }

    $('#next').click(function() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    });

    $('#prev').click(function() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    });

    $('.carrossel-controls button').hover(function() {
        clearInterval(carouselInterval);
    }, function() {
        startCarousel();
    });

    startCarousel(); // Inicia o carrossel automaticamente

    // Pesquisa e filtro de página de artigos
    $('#search').keyup(function() {
        const searchTerm = $(this).val().toLowerCase();
        $('.article-list article').each(function() {
            const articleText = $(this).text().toLowerCase();
            $(this).toggle(articleText.includes(searchTerm));
        });
    });

    // Função de planejamento de saúde
    $('#health-planner').submit(function(e) {
        e.preventDefault();
        const goal = $('#goal').val();
        const duration = $('#duration').val();
        const steps = $('#steps').val();
        localStorage.setItem('healthGoal', goal);
        localStorage.setItem('healthDuration', duration);
        localStorage.setItem('healthSteps', steps);
        alert('Planejamento salvo com sucesso!');
        $(this).trigger('reset');
    });

    $('#view-goal-btn').click(function() {
        $('#popup-goal').text('Meta: ' + localStorage.getItem('healthGoal'));
        $('#popup-duration').text('Duração: ' + localStorage.getItem('healthDuration') + ' dias');
        $('#popup-steps').text('Passos: ' + localStorage.getItem('healthSteps'));
        $('#goal-popup').show();
    });

    $('.close-btn').click(function() {
        $('#goal-popup').hide();
    });

    // Função de formulário de contato
    $('#contact-form').submit(function(event) {
        event.preventDefault();
        $('#contact-summary').show();
        $(this).trigger('reset');
    });
});