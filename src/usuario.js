const User = {
    //usuarios para login
    users: [
        {
            email: "caroline.joyce@email.com",
            name: 'Joyce',
            psw: '1adbb3178591fd5bb0c248518f39bf6d' //asdf1234
        },
        {
            email: "glcalil@email.com",
            name: 'Gabriel',
            psw: '828fd9255753432d51df95eb62d61722' //1234asdf
        },
        {
            email: "r2d2@email.com",
            name: 'Arthur',
            psw: 'd8578edf8458ce06fbc5bb76a58c5ca4' //qwerty
        },
        {
            email: "admin@email.com",
            name: 'Fred',
            psw: '21232f297a57a5a743894a0e4a801fc3' //admin
        }
    ],

    //valida email e senha dos usuarios
    auth: (email, psw) => {
        for(let i = 0; i < User.users.length; i++){
            let element = User.users[i];
            if(element.email == email){
                if(element.psw == psw) {
                    return { auth: true, mensagem: 'Logado com sucesso!'};
                } else {
                    return { auth: false, mensagem: 'Senha ou usuário inválida!'};
                }
            }
        }
        return { auth: false, mensagem: 'Usuário não encontrado!'};
    },


}