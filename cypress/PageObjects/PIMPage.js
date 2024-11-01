/// <reference types="cypress" />
class PIMPage{
   
    getAddButton(category){
        return cy.get('button').contains(' Add ');
    }

    getFirstNameField(){
        return cy.get('input[name="firstName"]');
    }

    getLastNameField(){
        return cy.get('input[name="lastName"]');
    }

    getCreateLoginDetailsToogleButton(){
        return cy.get('.oxd-switch-input');
    }

    getUsernameField(){
        return cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[1]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/input[1]");
    }

    getPasswordField(){
        return cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[1]/div[2]/div[4]/div[1]/div[1]/div[1]/div[2]/input[1]");
    }

    getConfirmPasswordField(){
        return cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[1]/div[2]/div[4]/div[1]/div[2]/div[1]/div[2]/input[1]");
    }

    getSaveButton(){
        return cy.get('button').contains('Save');
    }
}
export default PIMPage;