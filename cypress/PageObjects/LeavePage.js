/// <reference types="cypress" />
class LeavePage{

    getApplySubsection(){
       return cy.get(':nth-child(1) > .oxd-topbar-body-nav-tab-item');
    }

    getLeaveTypeDropdown(){
        return cy.get('div[class="oxd-select-text-input"]').contains('Select');
    }

    selectLeaveTypeOption(leaveType){
        return cy.get('div[role = "listbox"]').contains(leaveType).click();
    }
 
    enterFromDate(yearDayMonth){
        return cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input').click({force:true})
        .type(yearDayMonth);
    }
 
    enterToDate(yearDayMonth){
        return cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon').click({force:true})
        .type(yearDayMonth);
    } 

    getApplyButton(){
        return cy.get('button').contains(' Apply ');
    }

    getMyLeaveSubsection(){
        return cy.get(':nth-child(2) > .oxd-topbar-body-nav-tab-item');
    }
    
    getlatestLeaveRecord(){
        return cy.get(':nth-child(1) > .oxd-topbar-body-nav-tab-item');
    }
}
export default LeavePage;