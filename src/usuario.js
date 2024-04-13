class User {
    static resetLocalStorage(){
        localStorage.clear('backlog');
        localStorage.clear('em-andamento');
        localStorage.clear('review');
        localStorage.clear('pronto');
        localStorage.clear('user');
    }

    static clearAllUsers(){
        localStorage.clear('users');

        return true;
    }

    static saveUser(user){

        let userList = [];

        const buffer = localStorage.getItem('users');

        if(buffer !== null){
            userList = JSON.parse(buffer);
        }

        userList.push(user);

        localStorage.setItem('users', JSON.stringify(userList));

        return {
            error: false,
            message: 'Usuário salvo com sucesso!',
            data: null
        }
    }

    static getAll(){
        const buffer = localStorage.getItem('users');

        if(buffer === null){
            return {
                error: true,
                message: 'Nenhum usuário cadastrado!',
                data: null
            }
        } else {
            const userList = JSON.parse(buffer);

            if(userList !== null){
                return {
                    error: false,
                    message: 'Usuário(s) encontrado(s) com sucesso!',
                    data: userList
                }
            } else{
                return {
                    error: true,
                    message: 'Falha ao listar usuários!',
                    data: null
                }
            }
        }
    }


    static getUserByEmail(userEmail){
        const buffer = localStorage.getItem('users');

        if(buffer === null){
            return {
                error: true,
                message: 'Nenhum usuário cadastrado!',
                data: null
            }
        } else {
            const userList = JSON.parse(buffer);

            for(const user of userList){
                if(user.email == userEmail){
                    return {
                        error: false,
                        message: 'Usuário encontrado com sucesso!',
                        data: user
                    }
                }
            }

            return {
                error: true,
                message: 'Usuário não encontrado!',
                data: null
            }
        }
    }

    //valida email e senha dos usuarios
    static auth(email, psw){
        const result = User.getUserByEmail(email);

        if(result.error) return { auth: false, mensagem: result.message};

        const user = result.data;

        if(user.senha == psw) {
            return { auth: true, mensagem: 'Logado com sucesso!'};
        } else {
            return { auth: false, mensagem: 'Senha ou usuário inválidos!'};
        }
    }

}