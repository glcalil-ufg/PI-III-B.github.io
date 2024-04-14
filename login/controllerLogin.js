const Login = {

    //id de elementos importantes
    id: {
        formLogin: 'login-form',
    },

    makeLogin: (form) => {
        form = new FormData(form);

        let dados = {
            email: form.getAll('email')[0], //lê campo email do formulário
            senha: CryptoJS.MD5(form.getAll('senha')[0]).toString(), //lê campo senha do formulário e aplica criptografia md5
        }

        user = User.auth(dados.email, dados.senha); //valida login e senha

        //aviso de login com sucesso ou invalido
        if(user.auth){
            alert('login com sucesso');
            window.location = '../board/board.html';
        } else {
            alert(user.mensagem);
        }
        
    },

    //listeners da página
    listener: () => {
        form =  document.getElementById(Login.id.formLogin)
        listener = form.addEventListener('submit', (e) => {
            e.preventDefault();
            Login.makeLogin(form);
        });
    },
   
    //inicia o script quando o documento estiver carregado
    start: () => {
       Login.listener();
    }
}