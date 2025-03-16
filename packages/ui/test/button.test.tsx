import { Button } from "@workspace/ui/components/button";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("should have the text", () => {
    const { getByText } = render(<Button>Test</Button>);

    const buttonElement = getByText("Test");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should have been called", () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Test</Button>);

    const button = screen.getByRole("button", { name: /test/i });

    button.click();
    expect(onClick).toHaveBeenCalled();
  });
});
