let login = (options) => {
    _validate(options.form, options.component);
};

let _validate = (form, component) => {
    $(form).validate(validation(component));
};

let validation = (component) => {
    return {
        rules: {
            emailAddress: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            emailAddress: {
                required: 'Need an email address here.',
                email: 'Is this email address legit?'
            },
            password: {
                required: 'Need a password here.'
            }
        },
        submitHandler() {
            _handleLogin(component);
        }
    };
};

let _handleLogin = () => {
    let email = $('[name="emailAddress"]').val(),
        password = $('[name="password"]').val();

    Meteor.loginWithPassword(email, password, (error) => {
        if (error) {
            Bert.alert(error.reason, 'warning');
        } else {
            Bert.alert('Logged in!', 'success');
        }
    });
};

Modules.client.login = login;