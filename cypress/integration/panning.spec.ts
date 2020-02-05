import { baseDrawingRegion as region } from "../support/utils";

describe("Panning", () => {
  it("should change cursor when pressing space key", () => {
    // Initial cursor
    cy.get("#canvas").should("have.css", "cursor", "auto");
    // Holding the space key down
    cy.get("#canvas").trigger("keydown", { key: " " });
    cy.get("#canvas").should("have.css", "cursor", "grabbing");
    // Releasing the space key
    cy.get("#canvas").trigger("keyup", { key: " " });
    cy.get("#canvas").should("have.css", "cursor", "auto");
  });
  it("should change cursor to crosshair after releasing space key after choosing a tool", () => {
    // Initial cursor
    cy.get("#canvas").should("have.css", "cursor", "auto");
    // Holding the space key down
    cy.get("#canvas").trigger("keydown", { key: " " });
    cy.get("#canvas").should("have.css", "cursor", "grabbing");
    cy.get('input[aria-label="Rectangle"]').click();
    // Releasing the space key
    cy.get("#canvas").trigger("keyup", { key: " " });
    cy.get("#canvas").should("have.css", "cursor", "crosshair");
  });
  it("should pan away from rectangle using space + drag technique", () => {
    cy.get('input[aria-label="Rectangle"]').click();
    cy.get("#canvas").drag(
      { x: region.x + 10, y: region.y + 10 },
      { x: region.x + 50, y: region.y + 50 },
    );
    // we add some tolerance threshold due to rough.js randomness
    cy.get("#canvas").matchImageSnapshot("beforePanningRectangle", {
      clip: region,
      failureThreshold: 0.04,
      failureThresholdType: "percent",
    });
    // pan
    cy.get("#canvas").trigger("keydown", { key: " " });
    cy.get("#canvas").drag(
      { x: region.x, y: region.y },
      { x: region.x + 20, y: region.y + 15 },
    );
    cy.get("#canvas").matchImageSnapshot("afterPanningRectangle", {
      clip: region,
      failureThreshold: 0.04,
      failureThresholdType: "percent",
    });
  });
  it("should pan away from rectangle using wheel", () => {
    cy.get('input[aria-label="Rectangle"]').click();
    cy.get("#canvas").drag(
      { x: region.x + 10, y: region.y + 10 },
      { x: region.x + 50, y: region.y + 50 },
    );
    // we add some tolerance threshold due to rough.js randomness
    cy.get("#canvas").matchImageSnapshot("beforePanningRectangleWheel", {
      clip: region,
      failureThreshold: 0.04,
      failureThresholdType: "percent",
    });
    // pan
    cy.get("#canvas").drag(
      { x: region.x, y: region.y },
      { x: region.x + 17, y: region.y + 18 },
      1,
    );
    cy.get("#canvas").matchImageSnapshot("afterPanningRectangleWheel", {
      clip: region,
      failureThreshold: 0.04,
      failureThresholdType: "percent",
    });
  });
});
