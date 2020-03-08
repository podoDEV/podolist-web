before(() => {
  cy.visit("/");
});

describe("hello", () => {
  it("hello", () => {
    const data = [
      { name: "Jung", age: 20 },
      { name: "Han", age: 28 }
    ];

    const compData = [
      { name: "Jung", age: 20 },
      { name: "Han", age: 28 }
    ];

    expect(data).to.be.eql(compData);
  });
});
