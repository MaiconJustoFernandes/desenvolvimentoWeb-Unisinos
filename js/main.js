$(document).ready(function() {
  
    // Configuração inicial do carrossel
    let currentIndex = 0; // Índice atual do item visível
    const items = $('.carrossel-item'); // Seleciona todos os itens do carrossel
    const itemCount = items.length; // Conta o número total de itens
    const intervalTime = 5000; // Define o tempo de intervalo para troca automática (5 segundos)
    let carouselInterval; // Variável para armazenar o intervalo do carrossel

    // Atualiza o carrossel para mostrar o item atual e esconder os outros
    function updateCarousel() {
        items.each(function(index) {
            if(index === currentIndex) {
                $(this).fadeIn(500); // Mostra o item atual com efeito de fade
            } else {
                $(this).fadeOut(500); // Esconde os outros itens com efeito de fade
            }
        });
    }

    // Inicia o carrossel com troca automática de itens
    function startCarousel() {
        if (carouselInterval) clearInterval(carouselInterval); // Limpa o intervalo anterior se existir
        carouselInterval = setInterval(function() { // Cria um novo intervalo
            currentIndex = (currentIndex + 1) % itemCount; // Atualiza o índice atual, voltando ao início se necessário
            updateCarousel(); // Atualiza o carrossel para o novo índice
        }, intervalTime);
    }

    // Evento de clique para o botão "Próximo"
    $('#next').click(function() {
        currentIndex = (currentIndex + 1) % itemCount; // Avança para o próximo item
        updateCarousel(); // Atualiza o carrossel
    });

    // Evento de clique para o botão "Anterior"
    $('#prev').click(function() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount; // Retrocede para o item anterior
        updateCarousel(); // Atualiza o carrossel
    });

    // Pausa o carrossel quando o mouse está sobre os botões "Anterior" e "Proximo"
    $('.carrossel-controls button').hover(function() {
        clearInterval(carouselInterval); // Pausa o carrossel
    }, function() {
        startCarousel(); // Continua o carrossel ao sair do hover
    });

    startCarousel(); // Inicia o carrossel automaticamente ao carregar a página

    // Pesquisa e filtro de página de artigos
    $('#search').keyup(function() {
        const searchTerm = $(this).val().toLowerCase(); // Obtém o termo de pesquisa
        $('.article-list article').each(function() {
            const articleText = $(this).text().toLowerCase(); // Obtém o texto do artigo
            $(this).toggle(articleText.includes(searchTerm)); // Mostra ou esconde o artigo baseado na pesquisa
        });
    });

    // Função de planejamento de saúde
    $('#health-planner').submit(function(e) {
        e.preventDefault(); // Previne o comportamento padrão de envio do formulário
        // Obtém os valores dos campos do formulário
        const goal = $('#goal').val();
        const duration = $('#duration').val();
        const steps = $('#steps').val();
        // Salva os valores no localStorage
        localStorage.setItem('healthGoal', goal);
        localStorage.setItem('healthDuration', duration);
        localStorage.setItem('healthSteps', steps);
        alert('Planejamento salvo com sucesso!'); // Exibe um alerta de sucesso
        $(this).trigger('reset'); // Reseta o formulário
    });

    // Exibe os detalhes do planejamento de saúde salvos
    $('#view-goal-btn').click(function() {
        $('#popup-goal').text('Meta: ' + localStorage.getItem('healthGoal'));
        $('#popup-duration').text('Duração: ' + localStorage.getItem('healthDuration') + ' dias');
        $('#popup-steps').text('Passos: ' + localStorage.getItem('healthSteps'));
        $('#goal-popup').show(); // Mostra o popup com os detalhes
    });

    // Fecha o popup de detalhes do planejamento de saúde
    $('.close-btn').click(function() {
        $('#goal-popup').hide(); // Esconde o popup
    });

    // Função de formulário de contato
    $('#contact-form').submit(function(event) {
        event.preventDefault(); // Previne o comportamento padrão de envio do formulário
        $('#contact-summary').show(); // Mostra a mensagem de resumo do contato
        $(this).trigger('reset'); // Reseta o formulário
    });
});