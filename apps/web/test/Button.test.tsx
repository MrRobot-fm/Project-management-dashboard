import { render, screen } from "@testing-library/react";
import { Button } from "@workspace/ui/components/button";

describe("Button", () => {
  it("should render without crashing", () => {
    render(<Button>Test</Button>);

    const button = screen.getByRole("button", { name: /test/i });

    expect(button).toBeInTheDocument();
  });
});
