describe('상품담기 기능 확인', () => {
  beforeEach(() => {
    cy.visit('/goods/1234');
  });
  it('수행 시 경고 메시지에 "장바구니"가 포함되어야 한다.', () => {
    const stub = cy.stub();

    cy.on('window:alert', stub);
    cy.get('#btn_cart')
      .click()
      .then(() => {
        return expect(stub).to.be.calledWithMatch('장바구니');
      });
  });
});
