import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from "./config/ui.config";
import REG from "./config/reg.config";
import NAV from "./config/nav.config";
import {validate} from "./helpers/validate";
import {getAutocomplete, getDatePicker} from "./plugins/bootstrap/bootstrap";
import {showInputError, removeInputError} from "./views/form";
import {register, getRegisterErrorMessage} from "./services/reg.service";
import {login, getLoginErrorMessage} from "./services/auth.service";
import {notify} from "./views/notifications";
import {getCountry, getCity} from "./storage/reg.storage";
import {getResponseObject} from "./views/reg.form";

//nav
const {nav, login_reg, reg} = NAV;
//login
const {form, inputEmail, inputPassword, div_login} = UI;
const inputsLogin = [inputEmail, inputPassword];
// register
const {regForm, email, password, city, country, div_reg} = REG;
const inputsReg = [email, password];

// Events
nav.addEventListener('click', e => {
    if (e.target.classList.contains('login')) {
        div_login.classList.remove('hidden');
        login_reg.classList.add('bg-info', 'text-white');
        reg.classList.remove('bg-info', 'text-white');
        div_reg.classList.add('hidden');
    }

});
nav.addEventListener('click', e => {
    if (e.target.classList.contains('reg')) {
        div_reg.classList.remove('hidden');
        div_login.classList.add('hidden');
        reg.classList.add('bg-info', 'text-white');
        login_reg.classList.remove('bg-info', 'text-white');
        getDatePicker();
        getCountry().then((countries) => {
            getAutocomplete(country.id, countries);
        });
        city.addEventListener("focus", e => {
            let index = country.dataset.index;
            getCity(index).then((cities) => {
                getAutocomplete(city.id, cities);
            });
        });
    }

});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit();


});
regForm.addEventListener('submit', e => {
    e.preventDefault();
    onSubmitReg();

});

inputsLogin.forEach(el => el.addEventListener('focus', () => removeInputError(el)));
inputsReg.forEach(el => el.addEventListener('focus', () => removeInputError(el)));

//Handlers
async function onSubmit() {
    const isValidForm = inputsLogin.every((elem) => {
        const isValidInput = validate(elem);
        if (!isValidInput) {
            showInputError(elem);
        }
        return isValidInput;
    });

    if (!isValidForm) {
        return;
    }
    try {
        await login(inputEmail.value, inputPassword.value);
        notify({msg: "Login success", className: "alert-success"});

        form.reset();
        return;
    } catch (error) {
        const msg = getLoginErrorMessage(error);
        const className = "alert-warning";
        const timeout = 3000;
        notify({msg, className, timeout});
    }
}

async function onSubmitReg() {

    const isValidForm = inputsReg.every((elem) => {
        const isValidInput = validate(elem);
        if (!isValidInput) {
            showInputError(elem);
        }
        return isValidInput;
    });
    if (!isValidForm) {
        return;
    }
    try {
        const object = getResponseObject(regForm);
        await register(object).then((res) => {
            const msg = res.message;
            const className = "alert-success";
            const timeout = 3000;
            notify({msg, className, timeout});
        });
    } catch (error) {
        const msg = getRegisterErrorMessage(error);
        const className = "alert-warning";
        const timeout = 3000;
        notify({msg, className, timeout});
    }
}

