$(document).ready(function() {
    // Função do Carrossel
    let currentIndex = 0;
    const items = document.querySelectorAll('.carrossel-item');
    const itemCount = items.length;
    const intervalTime = 5000; // Tempo em milissegundos (5 segundos)

    function updateCarousel() {
        items.forEach((item, index) => {
            if(index === currentIndex) {
                $(item).fadeIn(500);
            } else {
                $(item).fadeOut(500);
            }
        });
    }

    document.getElementById('next').addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    });

    document.getElementById('prev').addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    });

    let carouselInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }, intervalTime);

    document.querySelectorAll('.carrossel-controls button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            clearInterval(carouselInterval);
        });
        button.addEventListener('mouseleave', function() {
            carouselInterval = setInterval(function() {
                currentIndex = (currentIndex + 1) % itemCount;
                updateCarousel();
            }, intervalTime);
        });
    });

    updateCarousel();

    // Pesquisa e filtro de página de artigos
    document.getElementById('search').addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll('.article-list article').forEach(function(article) {
            const articleText = article.textContent.toLowerCase();
            if (articleText.includes(searchTerm)) {
                $(article).show();
            } else {
                $(article).hide();
            }
        });
    });

    // Função de planejamento de saúde
    document.getElementById('health-planner').addEventListener('submit', function(e) {
        e.preventDefault();
        const goal = document.getElementById('goal').value;
        const duration = document.getElementById('duration').value;
        const steps = document.getElementById('steps').value;
        localStorage.setItem('healthGoal', goal);
        localStorage.setItem('healthDuration', duration);
        localStorage.setItem('healthSteps', steps);
        alert('Planejamento salvo com sucesso!');
        this.reset();
    });

    document.getElementById('view-goal-btn').addEventListener('click', function() {
        document.getElementById('popup-goal').textContent = 'Meta: ' + localStorage.getItem('healthGoal');
        document.getElementById('popup-duration').textContent = 'Duração: ' + localStorage.getItem('healthDuration') + ' dias';
        document.getElementById('popup-steps').textContent = 'Passos: ' + localStorage.getItem('healthSteps');
        $('#goal-popup').show();
    });

    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', function() {
            $('#goal-popup').hide();
        });
    });

    // Função de formulário de contato
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        $('#contact-summary').show();
        this.reset();
    });
});