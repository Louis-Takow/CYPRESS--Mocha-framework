/// <reference types="cypress" />
class ClaimPage{

    getAssignClaimButton(){
       return cy.get('button').contains('Assign Claim');   
    }

    getEmployeeNameField(){
        return cy.get('input[placeholder="Type for hints..."]');   
     }

    selectDropdownOption(firstName){
        return cy.get('div[role = "listbox"]').contains(firstName).click();
    }
    
    getEventDropdown(){
        return cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input');
    }

    selectEventOption(eventType){
        return cy.get('div[role = "listbox"]').contains(eventType).click();
    }

    getCurrencyDropdown(){
        return cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input');
    }

    selectCurrencyOption(currencyType){
        return cy.get('div[role = "listbox"]').contains(currencyType).click();
    }

    getCreateButton(){
        return cy.get('button').contains('Create');
    }

    getSubmitButton(){
        return cy.get('button').contains('Submit');
    }
}
export default ClaimPage;