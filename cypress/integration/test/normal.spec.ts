describe('일반 값 확인', () => {
  it('걍 테스트', () => {
    const result = 1234;

    expect(result).to.be.equal(1234);
    cy.wrap(result).should('equal', 1234);
  });
});
