/// <reference types="cypress" />
class AdminPage{

  getUsernameField(){
      return cy.get(':nth-child(2) > .oxd-input');
  }

  getSearchButton(){
      return cy.get('button[type="submit"]');
  }

  getEditIconofFirstRecordFound(){
      return cy.get('.oxd-table-cell-actions > :nth-child(2) > .oxd-icon').first();
  }

  selectUserRole(role){
      cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click({force:true});;
      cy.get('div[role="listbox"]').contains(role).click(); 
  }
  
  getSaveButton(){
      return cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[2]/button[2]");
  }

  getDeleteIconofFirstRecordFound(){
      return cy.get('.oxd-table-cell-actions > :nth-child(1) > .oxd-icon').first();
  }

  getYesDeleteButton(){
      return cy.get('.oxd-button--label-danger');
  }

}
export default AdminPage;