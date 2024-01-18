import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

// Test whether the Home page renders following triple A test writing format
describe("Home", () => {
    test("renders correctly", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        ); // Arrange
        
        // Check for the presence of a specific heading
        const headingElement = screen.getByText("Where Educators Embrace Faith and Calling"); // Act
        expect(headingElement).toBeInTheDocument(); // Assert
        
        // Check for the presence of images
        const discoverImageElements = screen.getAllByAltText("teacher facing a room of students"); // Act
        expect(discoverImageElements.length).toBeGreaterThanOrEqual(1); // Assert

        // Additional checks on each image element if needed
        discoverImageElements.forEach((element) => {
            expect(element).toBeInTheDocument();
            // Add more assertions as needed
        });
    });
});
