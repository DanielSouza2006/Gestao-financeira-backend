let card=document.querySelector('.card');
let loginButton=document.querySelector('.loginButton');
let cadastroButton=document.querySelector('.cadastroButton');

loginButton.addEventListener('click', () => {
    card.classList.remove('cadastroActive');
    card.classList.add('loginActive');
});

cadastroButton.addEventListener('click', () => {
    card.classList.remove('loginActive');
    card.classList.add('cadastroActive');
});


function fazerLogin() {
    const emailField = document.getElementById('email');
    const senhaField = document.getElementById('senha');
    const user = emailField.value.trim();
    const pass = senhaField.value.trim();

    if (!user || !pass) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const dados = { "email": user, "senha": pass };

    fetch('https://gestao-financeira-backend-hhqs.onrender.com/login', {

        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(dados)
    })
    .then(resposta => {
        if (!resposta.ok) {
            return resposta.json()
            .then(err => {
                throw new Error(err.mensagem || "Erro na autenticação");
            });
        }
        return resposta.json();
    })
    .then(resultado => {
        console.log("Sucesso:", resultado.mensagem);
        // Usamos assign para garantir o redirecionamento entre portas diferentes
        window.location.assign("dashboard.html");
    })
    .catch(erro => {
        console.error("Erro no fetch:", erro);
        if (erro.message === "Failed to fetch") {
            alert("Erro: Não foi possível conectar ao servidor. Verifique se o terminal rodando 'api.py' está aberto.");
        } else {
            alert(erro.message);
        }
    });
}
