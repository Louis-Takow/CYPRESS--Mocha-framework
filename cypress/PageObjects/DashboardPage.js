/// <reference types="cypress" />
class DashboardPage{

    getSidepanel(){
        return cy.get('nav[aria-label="Sidepanel"]');
    }

    getUserDropdownButton(){
        return cy.get('.oxd-userdropdown-tab > .oxd-icon');
    }

    selectLoginOption(){
        return cy.get(':nth-child(4) > .oxd-userdropdown-link'); // class + nth child
    }
    
    getSidepanelTab(category){
        return cy.get('nav[aria-label="Sidepanel"]').contains(category);
    }

}
export default DashboardPage;