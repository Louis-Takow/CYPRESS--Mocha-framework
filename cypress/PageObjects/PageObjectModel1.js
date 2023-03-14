class OrangePageObjects{
  login(username, password) {
    cy.get('.oxd-text--h5').should('contain', 'Login');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button').contains('Login').should('be.visible').click();
    cy.get('nav[aria-label="Sidepanel"]').should('be.visible');
    }
    logout(){
    cy.wait(1000);
    cy.get('.oxd-userdropdown-tab > .oxd-icon').click({ force: true });
    cy.get(':nth-child(4) > .oxd-userdropdown-link').click();
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
    accessSidepanel(category, breadcrum){
    cy.get('nav[aria-label="Sidepanel"]').contains(category).click();
    cy.get('.oxd-topbar-header-breadcrumb').should('contain',breadcrum);
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
    createnewuser(){
      pageObject1.accessSidepanel('PIM','PIM')
      cy.get('button').contains(' Add ').click();
      cy.get('input[name="firstName"]').type('Louis');
      cy.get('input[name="lastName"]').type('Takow');
      cy.get('.oxd-switch-input').click();
      cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[1]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/input[1]")
      .type('Takow');
      cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[1]/div[2]/div[4]/div[1]/div[1]/div[1]/div[2]/input[1]")
      .type('#Correct123');
      cy.xpath("//body/div[@id='app']/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[1]/div[2]/div[4]/div[1]/div[2]/div[1]/div[2]/input[1]")
      .type('#Correct123');
      cy.get('button').contains('Save').should('be.visible').click();
      cy.wait(1000);
      cy.url().should('contain','pim/viewPersonalDetails');
      cy.get('.orangehrm-card-container').should('contain','Personal Details');
      }
     
  }
  
  export default OrangePageObjects;