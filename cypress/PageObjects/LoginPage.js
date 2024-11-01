/// <reference types="cypress" />
class LoginPage{

    getUsernameField(){
       return cy.get('input[name="username"]');
    }

    getPasswordField(){
        return  cy.get('input[name="password"]');
    }

    getLoginButton(){
        return cy.get('button').contains('Login')
    }
}
export default LoginPage;