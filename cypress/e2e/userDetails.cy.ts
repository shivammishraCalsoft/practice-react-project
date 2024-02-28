describe("userDetails tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("table Caption test", () => {
    cy.getDataTest("usersTableCaption").contains(
      /Users Table with filter facility/i
    );
  });
  it("table header tests", () => {
    cy.getDataTest("tableHeader1Input").should("not.exist");
    cy.getDataTest("tableHeader1Img").click();
    cy.getDataTest("tableHeader1Input").should("be.visible");
    cy.getDataTest("tableHeader1Img").click();
    cy.getDataTest("tableHeader1Input").should("not.exist");
  });
});
