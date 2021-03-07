describe('로그인 테스트', () => {
  beforeEach(() => {
    cy.visit('/test/loginPost');
    cy.prepareLogin();
  });
  it('로그인에 성공하면 "성공" 얼럿이 출력된다.', () => {
    cy.get('@id').type('theson');
    cy.get('@pw').type('1234');
    cy.get('@submit').click();
    cy.wait('@apiSignin');
    cy.get('@print').should('include.text', '성공');
  });
  it('로그인에 실패하면 "로그인 실패" 얼럿이 출력된다.', () => {
    cy.get('@id').type('sonic');
    cy.get('@pw').type('1234');
    cy.get('@submit').click();
    cy.wait('@apiSignin');
    cy.get('@print').should('include.text', '실패');
  });
});
