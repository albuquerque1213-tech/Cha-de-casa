document.addEventListener('DOMContentLoaded', function() {
    const textGiftsList = document.getElementById('text-gifts-list');
    const copyPixButton = document.getElementById('copy-pix-button');
    const pixKeyDisplay = document.getElementById('pix-key-display');
    const phoneNumber = '5581999588505';

    const gifts = [
        'Presente via PIX',
'Airfryer',
'Alexa',
'Balcão aéreo',
'Batedeira',
'Conjunto de copos',
'Conjunto de edredons',
'Conjunto de panelas',
'Conjunto de pratos',
'Conjunto de talheres',
'Conjunto de toalhas de banho',
'Conjunto de travessas',
'Contribuição para Máquina de lavar',
'Espremedor',
'Ferro de passar',
'Founde',
'Frigideira de Cerâmica',
'Frigideira de Aço Inox',
'Liquidificador',
'Lustre suspenso',
'Microondas',
'Organizadores de mantimentos (cozinha)',
'Panela de Pressão',
'Pipoqueira',
'Porta temperos',
'Puff para descanso',
'Sanduicheira',
'Ventilador',
'Cortinas',
'Prateleiras para banheiro',
'Jogo de marmitas de vidro',
'Grill',
'Cesto de roupa',
'Organizador de talheres',
'Jogo de facas',
'Utensílios de cozinha de silicone',
'Conjunto de Almofadas',
'Kit de ferramentas',
'Mangueira de Jardim',
'Lixeira',
'Afiador de facas',
'Espelho',
'Churrasqueira'
    ];

    const chosenGiftsKey = 'chosenGifts';

    function loadChosenGifts() {
        const chosenGifts = localStorage.getItem(chosenGiftsKey);
        return chosenGifts ? JSON.parse(chosenGifts) : [];
    }

    function saveChosenGift(giftName) {
        const chosenGifts = loadChosenGifts();
        if (!chosenGifts.includes(giftName)) {
            chosenGifts.push(giftName);
            localStorage.setItem(chosenGiftsKey, JSON.stringify(chosenGifts));
        }
    }

    function renderGifts() {
        textGiftsList.innerHTML = '';
        const chosenGifts = loadChosenGifts();

        const giftsToDisplay = gifts.filter(giftName => {
            const isPixOrContribution = giftName === 'Presente via PIX' || giftName.includes('Contribuição');
            return !chosenGifts.includes(giftName) || isPixOrContribution;
        });

        giftsToDisplay.forEach(giftName => {
            const listItem = document.createElement('li');
            listItem.textContent = giftName;
            listItem.setAttribute('data-gift-name', giftName);
            listItem.addEventListener('click', function() {
                chooseGift(giftName);
            });
            textGiftsList.appendChild(listItem);
        });
    }

    function chooseGift(giftName) {
        const guestName = prompt("Para confirmar sua escolha, por favor, digite seu nome:");
        if (guestName && guestName.trim() !== "") {
            const message = `${guestName} escolheu te presentear com ${giftName}.`;
            
            // Remove o presente da lista e salva no localStorage
            saveChosenGift(giftName);
            renderGifts();
            
            // Abre o WhatsApp para enviar a notificação
            sendToWhatsApp(message);
            
            alert(`Obrigado, ${guestName}! Sua escolha foi registrada e a notificação foi enviada.`);
        } else {
            alert("Nome inválido. A escolha não foi registrada.");
        }
    }

    function sendToWhatsApp(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank').focus();
    }

    copyPixButton.addEventListener('click', function() {
        const pixKey = pixKeyDisplay.textContent;
        navigator.clipboard.writeText(pixKey).then(() => {
            alert('Chave PIX copiada para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar a chave PIX:', err);
            alert('Não foi possível copiar a chave PIX. Por favor, copie manualmente: ' + pixKey);
        });
    });

    const pixGiftName = 'Presente via PIX';
    if (!gifts.includes(pixGiftName)) {
        gifts.unshift(pixGiftName);
    }
    
    renderGifts();
});
