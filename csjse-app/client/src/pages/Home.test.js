import { render, screen } from "@testing-library/react";
import Home from "./Home";

//Test whether the Home page renders following triple A test writing format
describe("Home", () => {
    test("renders correctly", () => {
        render(<Home />); // Arrange
        
        // Check for the presence of a specific heading
        const headingElement = screen.getByText("Where Educators Embrace Faith and Calling"); // Act
        expect(headingElement).toBeInTheDocument(); // Assert
        
        // Check for the presence of an image
        const discoverImageElement = screen.getByAltText("teacher facing a room of students"); // Act
        expect(discoverImageElement).toBeInTheDocument(); // Assert
    });
});