/// <reference types="cypress" />
class RecruitmentPage{

    getAddButton(){
       return  cy.get('button').contains(' Add ');
    }

    getFirstNameField(){
        return  cy.get('input[name="firstName"]');
     }

     getLastNameField(){
        return  cy.get('input[name="lastName"]');
     }

     getEmailField(){
        return  cy.get(':nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input');
     }
     
     getSaveButton(){
        return   cy.get('.oxd-button--secondary').contains('Save');
     }
}
export default RecruitmentPage;