const Cadastro = {

    id: {
        inputDate: "date",
        formSignUp: "sign-up",
    },

    getFormData: (form) => {
        form = new FormData(form);

        return {
            name:       form.getAll('name')[0], //lê campo name do formulário
            email:      form.getAll('email')[0], //lê campo email do formulário
            birthDate:  form.getAll('date')[0], //lê campo date do formulário
            senha:      form.getAll('senha')[0], //lê campo senha do formulário
            confirme:   form.getAll('confirme')[0], //lê campo confimar senha do formulário
            office:     form.getAll('office')[0] //lê campo confimar senha do formulário
        }
    },

    makeSignUp: (formData) =>{
        // lógica para salvar ususario
        User.saveUser({
            name: formData.name,
            email: formData.email,
            birthDate: formData.birthDate,
            senha: CryptoJS.MD5(formData.senha).toString(),
            office: formData.office,
        });
        // Redireciona para tela de login quando o usuario for cadastrado com sucesso.
        window.location.href ='./../Login/login.html';
    },

    listener: () => {
        form =  document.getElementById(Cadastro.id.formSignUp)
        form.addEventListener('submit', (e) => {
            e.preventDefault();
           
            const data = Cadastro.getFormData(form);
            if(data.senha !== data.confirme) {
                alert('Campos de senha e confirmar senha devem ser iguais')
            }else {
                Cadastro.makeSignUp(data);
            }
        });
    },

    startForm: () => {
        const dateField = document.getElementById(Cadastro.id.inputDate);
        // Obtém a data atual
        const today = new Date();
        // Adiciona valor maximo para a data de nascimento
        dateField.setAttribute('max', today.toISOString().split('T')[0]);

    },

    start: () => {
        Cadastro.startForm();
        Cadastro.listener();
    }
}