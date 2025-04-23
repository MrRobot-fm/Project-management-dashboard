import { WorkspaceSelector } from "@/components/WorkspaceSelector";
import { SELECTED_WS_ID_COOKIE_KEY } from "@/constants/workspaces";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cookies from "js-cookie";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";

vi.mock("js-cookie", () => {
  return {
    default: {
      get: vi.fn(),
      set: vi.fn(),
    },
  };
});

const workspaces = [
  { id: "1", name: "Wolf Pixel", logo: "https://github.com/shadcn.png" },
  { id: "2", name: "Cloud Studio", logo: "https://github.com/shadcn.png" },
  { id: "3", name: "Dev Space", logo: "https://github.com/shadcn.png" },
];

const renderComponent = () => {
  render(<WorkspaceSelector workspaces={workspaces} />);

  return {
    selectTrigger: screen.getByTestId("workspaces-select"),
    user: userEvent.setup(),
  };
};

describe("WorkspaceSelector", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render and select the correct workspace", async () => {
    const { selectTrigger, user } = renderComponent();

    await user.click(selectTrigger);
    const option = screen.getByText(/cloud studio/i);
    await user.click(option);

    waitFor(() => {
      expect(selectTrigger).toHaveTextContent(/cloud studio/i);
    });

    expect(Cookies.set).toHaveBeenCalledWith(
      SELECTED_WS_ID_COOKIE_KEY,
      "2",
      expect.objectContaining({ expires: 365 }),
    );
  });

  it("should initialize from cookie if valid", () => {
    (Cookies.get as Mock).mockReturnValue("3");

    const { selectTrigger } = renderComponent();

    expect(selectTrigger).toHaveTextContent(/dev space/i);
  });

  it("should initialized whit default value if cookie is invalid or not available", () => {
    (Cookies.get as Mock).mockReturnValue("5");

    const { selectTrigger } = renderComponent();

    expect(selectTrigger).toHaveTextContent(/all workspaces/i);
  });
});
