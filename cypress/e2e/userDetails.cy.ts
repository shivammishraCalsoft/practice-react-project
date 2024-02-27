describe("userDetails tests", () => {
  it("table Caption test", () => {
    cy.visit("/");
    cy.get('[data-test="usersTableCaption"]').contains(
      /Users Table with filter facility/i
    );
  });
});
