import { ModeToggle } from "@workspace/ui/components/mode-toggle";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const mockSetTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: vi.fn(() => ({
    setTheme: mockSetTheme,
    theme: "dark"
  }))
}));

const renderComponent = () => {
  render(<ModeToggle />);

  const toggle = screen.getByTestId("mode-toggle");
  const user = userEvent.setup();

  return {
    toggle,
    user
  };
};

describe("Mode Toggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the Mode toggle", async () => {
    const { toggle } = renderComponent();

    expect(toggle).toBeInTheDocument();
  });

  it("should open the menu when clicked", async () => {
    const { toggle, user } = renderComponent();

    expect(toggle).toBeInTheDocument();

    await user.click(toggle);

    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();
  });

  it("should close the menu when Escape key is pressed", async () => {
    const { toggle, user } = renderComponent();

    await user.click(toggle);
    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(menu).not.toBeInTheDocument();
  });
});

describe("Theme selection", () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    const { toggle, user } = renderComponent();
    await user.click(toggle);
  });

  it("should select Light theme when clicking Light option", async () => {
    const user = userEvent.setup();

    const lightModeOption = screen.getByRole("menuitem", { name: /light/i });
    await user.click(lightModeOption);

    expect(mockSetTheme).toHaveBeenCalledWith("light");
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
  });

  it("should select Dark theme when clicking Dark option", async () => {
    const user = userEvent.setup();

    const darkModeOption = screen.getByRole("menuitem", { name: /dark/i });
    await user.click(darkModeOption);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
  });

  it("should select System theme when clicking System option", async () => {
    const user = userEvent.setup();

    const darkModeOption = screen.getByRole("menuitem", { name: /system/i });
    await user.click(darkModeOption);

    expect(mockSetTheme).toHaveBeenCalledWith("system");
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
  });
});
