describe('팔로우 확인 테스트', () => {
  beforeEach(() => {
    cy.visit('/cypress/confirmStub');
  });
  it('예를 누르면 팔로우가 된다.', () => {
    const stub = cy.stub();

    stub.as('confirm');
    stub.alwaysReturned(true);

    cy.on('window:confirm', stub);

    cy.get('#btn')
      .click()
      .as('btn');

    expect(stub).to.be.called;
  });
  it('아니오를 누르면 팔로우 해제 된다.', () => {
    const stub = cy.stub();

    stub.as('confirm');
    stub.alwaysReturned(false);

    cy.on('window:confirm', stub);

    expect(stub).to.be.called;
  });
});
