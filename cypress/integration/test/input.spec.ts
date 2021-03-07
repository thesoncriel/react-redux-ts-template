describe('입력 테스트', () => {
  beforeEach(() => {
    cy.visit('/test/input');
    cy.get('#txt_test').as('input');
  });
  it('입력하면 그 값이 반영되어야 한다.', () => {
    cy.get('@input')
      .type('고위드에서 칼퇴하기!')
      .should('include.value', '칼퇴하기!');
  });
});
