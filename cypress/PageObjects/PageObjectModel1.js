class OrangePageObjects{
  login(username, password) {
    cy.get('.oxd-text--h5').should('contain', 'Login'); //class locator and assertion
    cy.get('input[name="username"]').type(username); //CSS Selector(tag+attribute)
    cy.get('input[name="password"]').type(password);
    cy.get('button').contains('Login').should('be.visible').click();//tag and text
    cy.get('nav[aria-label="Sidepanel"]').should('be.visible');
    }
    logout(){
    cy.wait(1000);
    cy.get('.oxd-userdropdown-tab > .oxd-icon').click({ force: true });
    cy.get(':nth-child(4) > .oxd-userdropdown-link').click(); //class + nth child
    }
    unsuccessfulLogin1(){
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.xpath("//body/div[@id='app']/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/form[1]/div[1]/div[1]/span[1]")
    .should('be.visible').and('contain','Required');
    cy.xpath("//body/div[@id='app']/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/form[1]/div[2]/div[1]/span[1]")
    .should('be.visible').and('contain','Required');
    }
    unsuccessfulLogin2(){
    cy.reload();
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.xpath("//body/div[@id='app']/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/form[1]/div[2]/div[1]/span[1]")
    .should('be.visible').and('contain','Required');
    }
    unsuccessfulLogin3(){
    cy.reload();
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.xpath("//body/div[@id='app']/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/form[1]/div[1]/div[1]/span[1]")
    .should('be.visible').and('contain','Required');
    }
    unsuccessfulLogin4(){
    cy.reload();
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type('123');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.get('div[role="alert"]').should('be.visible').and('contain','Invalid credentials');
    }
    unsuccessfulLogin5(){
    cy.reload();
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('123');
    cy.get('button').contains('Login').should('be.visible').click();
    cy.get('div[role="alert"]').should('be.visible').and('contain','Invalid credentials');
    }
    getPasswordResetLink(){
      cy.get('.orangehrm-login-forgot > .oxd-text').should('be.visible').click();
    cy.get('form[action="/web/index.php/auth/requestResetPassword"]').should('be.visible')
    .and('contain','Reset Password');
    }
    accessSidepanel(category, breadcrum){
    cy.get('nav[aria-label="Sidepanel"]').contains(category).click();
    cy.get('.oxd-topbar-header-breadcrumb').should('contain',breadcrum);
    }
    passwordReset(defaultusername){
    cy.get('input[name="username"]').type(defaultusername);
    cy.get('button').contains('Reset Password').should('be.visible').click();
    cy.get('.orangehrm-card-container').should('be.visible').and('contain','Reset Password link sent successfully')
    }
    createNewUser(firstname, lastname, createdusername, createdpassword){
      cy.get('button').contains(' Add ').click();
    cy.get('input[name="firstName"]').type(firstname);
    cy.get('input[name="lastName"]').type(lastname);
    cy.get('.oxd-switch-input').click();
    cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[1]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/input[1]")
    .type(createdusername);
    cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[1]/div[2]/div[4]/div[1]/div[1]/div[1]/div[2]/input[1]")
    .type(createdpassword);
    cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[1]/div[2]/div[4]/div[1]/div[2]/div[1]/div[2]/input[1]")
    .type(createdpassword);
    cy.get('button').contains('Save').should('be.visible').click();
    cy.wait(1000);
    cy.url().should('contain','pim/viewPersonalDetails');
    cy.get('.orangehrm-card-container').should('contain','Personal Details');
    }
    createNewUserasAdmin(hint, firstname, adminusername, createdpassword){
    cy.get('button').contains(' Add ').click();
    cy.get('nav[aria-label="Sidepanel"]').contains('Admin').click();
    cy.get('.oxd-topbar-header-breadcrumb').should('contain','Admin');
    cy.get('button').contains(' Add ').click();
    cy.get('div[class="oxd-select-text-input"]').contains('Select').click({force:true});
    cy.get('div[role="listbox"]').contains('Admin').click();
    cy.get('.oxd-autocomplete-text-input > input').type(hint);
    cy.get('div[role = "listbox"]').contains(firstname).click();
    cy.get('div[class="oxd-select-text-input"]').contains('Select').click({ force: true });
    cy.get('div[role = "listbox"]').contains('Enabled').click();
    cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type(adminusername);
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type(createdpassword);
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(createdpassword);
    cy.get('button').contains('Save').should('be.visible').click();
    cy.wait(1000);
    cy.url().should('contain','admin/viewSystemUser');
    }
    searchandEditSystemUsers(username, initialrole, editrole){
    cy.get(':nth-child(2) > .oxd-input').type(username);
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(1000);
    cy.get('.oxd-table-cell-actions > :nth-child(2) > .oxd-icon').first().click({ force: true });
    cy.wait(1000);
    cy.url().should('contain','admin/saveSystemUser');
    cy.get('.orangehrm-card-container').should('be.visible').and('contain','Edit User');
    cy.get('div[class="oxd-select-text-input"]').contains(initialrole).click({force:true});
    cy.get('div[role="listbox"]').contains(editrole).click();
    cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[2]/button[2]").click({force:true});
    cy.wait(1000);
    }
    searchandDeleteSystemUsers(username){
    cy.get('nav[aria-label="Sidepanel"]').contains('Admin').click();
    cy.get(':nth-child(2) > .oxd-input').type(username);
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(1000);
    cy.get('.oxd-table-cell-actions > :nth-child(1) > .oxd-icon').first().click({ force: true });
    cy.wait(1000);
    cy.get('.oxd-sheet').should('be.visible');
    cy.get('.oxd-button--label-danger').click();
    }
    assignLeaveTrial(hint, firstname, comment){
    cy.get(':nth-child(6) > .oxd-topbar-body-nav-tab-item > .oxd-icon').click({force:true});
    cy.get(':nth-child(2) > li > .oxd-topbar-body-nav-tab-link').click({force:true})
    cy.get('.oxd-autocomplete-text-input > input').type(hint);
    cy.get('div[role = "listbox"]').contains(firstname).click();
    cy.get('div[class="oxd-select-text-input"]').contains('Select').click({force: true});
    cy.get('div[role = "listbox"]').contains(comment).click();
    cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input').click({force:true})
    .type('2023-03-12');
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input').click({force:true})
    cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[5]/div[1]/div[1]/div[1]/div[2]/textarea[1]").click({force:true}).type('personal');
    cy.get('.oxd-button').click();
    cy.get('div[role="document"]').should('be.visible');
    cy.get('button').contains('Ok').click();
    }
    addCustomer(customername, customerdescription){
    cy.get('.oxd-topbar-body-nav-tab-item').contains('Project Info ').click();
    cy.get('ul[role="menu"]').contains('Customers').click();
    cy.url().should('contain','time/viewCustomers');
    cy.get('.orangehrm-header-container').should('be.visible').and('contain','Customers');
    cy.get('.oxd-button').click();
    cy.get(':nth-child(2) > .oxd-input').type(customername);
    cy.get('textarea[placeholder="Type description here"]').type(customerdescription);
    cy.wait(1000);
    cy.get('.oxd-button--secondary').contains('Save').click({force:true});
    cy.wait(1000);
    cy.url().should('contain','time/viewCustomer');
    }
    editCustomerandDeleteCustomer(editedcustomername){
  //Edit Customer
  cy.get('.oxd-topbar-body-nav-tab-item').contains('Project Info ').click();
  cy.get('ul[role="menu"]').contains('Customers').click();
  cy.url().should('contain','time/viewCustomers');
  cy.get(':nth-child(1) > .oxd-table-row > [style="flex: 1 1 0%;"] > .oxd-table-cell-actions > :nth-child(2) > .oxd-icon')
  .first().click({force:true});
  cy.url().should('contain','time/addCustomer');
  cy.get('.orangehrm-card-container').should('be.visible').and('contain','Edit Customer');
  cy.get(':nth-child(2) > .oxd-input').clear().type(editedcustomername);
  cy.wait(1000);
  cy.get('.oxd-button--secondary').click();
  //Delete Customer
  cy.get(':nth-child(1) > .oxd-table-row > [style="flex: 1 1 0%;"] > .oxd-table-cell-actions > :nth-child(1) > .oxd-icon')
  .first().click({force:true});
  cy.get('.oxd-sheet').should('be.visible');
  cy.get('.oxd-button--label-danger').click();
    }
    addRecruitmentCandidate(candidatefirstname, candidatetlastname){
    cy.get('button').contains(' Add ').click();
    cy.wait(1000);
    cy.url().should('contain','recruitment/addCandidate');
    cy.get('.orangehrm-card-container').should('contain','Add Candidate');
    cy.get('input[name="firstName"]').type(candidatefirstname);
    cy.get('input[name="lastName"]').type(candidatetlastname);
    cy.get('div[class="oxd-select-text-input"]').contains('Select').click({ force: true });
    cy.get('div[role = "listbox"]').contains('IT').click();
    cy.get(':nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type('PD@mail.com');
    cy.get('.oxd-grid-3 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('123456');
    cy.get('.oxd-checkbox-input > .oxd-icon').click();
    cy.get('.oxd-button--secondary').contains('Save').click();
    cy.wait(1000);
    cy.get('.orangehrm-card-container').should('contain','Application Stage');
    }
    maintenancePagePasswordEntry(password){
      cy.get('input[name="password"]').type(password);
      cy.get('button').contains('Confirm').should('be.visible').click();
    }
    postNewBuzzNewsfeed(newbuzz){
    cy.get('.oxd-buzz-post-input').type(newbuzz);
    cy.get('button').contains('Post').should('be.visible').click();
    cy.get('.oxd-grid-1 > :nth-child(1) > .oxd-sheet').should('be.visible');
    }
    editandDeleteNewsBuzzfeed(editednewbuzz){
      //Edit new Buzz Newsfeed
    cy.get(':nth-child(1) > .oxd-sheet > .orangehrm-buzz-post > .orangehrm-buzz-post-header > .orangehrm-buzz-post-header-config > li > .oxd-icon-button > .oxd-icon')
    .click({force:true});
    cy.get('.oxd-dropdown-menu > :nth-child(2)').click();
    cy.get('.oxd-dialog-container-default--inner > .oxd-sheet').should('be.visible').and('contain','Edit');
    cy.get('.orangehrm-buzz-post-modal-header-text > .oxd-buzz-post > .oxd-buzz-post-input').clear().type(editednewbuzz);
    cy.get('.oxd-form-actions > .oxd-button').should('be.visible').click();
    cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/p[1]").should('be.visible');
    //Delete new Buzz Newsfeed
    cy.wait(1000);
    cy.get(':nth-child(1) > .oxd-sheet > .orangehrm-buzz-post > .orangehrm-buzz-post-header > .orangehrm-buzz-post-header-config > li > .oxd-icon-button > .oxd-icon')
    .click({force:true});
    cy.get('.oxd-dropdown-menu > :nth-child(1)').click();
    cy.get('.oxd-dialog-container-default--inner > .oxd-sheet').should('be.visible');
    cy.get('.oxd-button--label-danger').click();
    }
    commentOnPost(comment){
    cy.get(':nth-child(1) > .oxd-sheet > .orangehrm-buzz-post-footer > .orangehrm-buzz-post-actions > :nth-child(2) > .oxd-icon')
    .click({force:true});
    cy.get('input[placeholder="Write your comment..."]').type(comment).type('{enter}');//Press enter key
    }
    editandDeletePostedComment(editedcomment){
    //Edit Posted Comment
    cy.get(':nth-child(1) > .oxd-sheet > .orangehrm-buzz-post-footer > .orangehrm-buzz-post-actions > :nth-child(2) > .oxd-icon')
    .click({force:true});
    cy.get('.orangehrm-post-comment-action-area > :nth-child(2)').first().click({force:true});
    cy.get('.orangehrm-post-comment > .oxd-form > .oxd-input-group > :nth-child(2) > .oxd-input')
    .clear().type(editedcomment).type('{enter}');// Press enter key
    //Delete Posted Comment
    cy.get(':nth-child(3) > .orangehrm-post-comment > .orangehrm-post-comment-action-area > :nth-child(3)')
    .first().click({force:true});
    cy.get('.oxd-dialog-container-default--inner > .oxd-sheet').should('be.visible');
    cy.get('.oxd-button--label-danger').click();
    }

  }
  
  export default OrangePageObjects;