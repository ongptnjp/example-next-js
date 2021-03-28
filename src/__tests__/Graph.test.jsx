import { render } from "@testing-library/react";

import React from "react";
import Graph from "../Graph";

describe("render Graph Component", () => {
  it("render without props", async () => {
    const { container } = render(<Graph />);

    expect(container.firstChild).toBe(null);
  });

  it("render Graph with props", async () => {
    const mockHistory = [
      {
        "close": 345.47,
        "label": "Mar 22, 21",
      },
      {
        "close": 335.93,
        "label": "Mar 23, 21",
      },
      {
        "close": 326.68,
        "label": "Mar 24, 21",
      },
      {
        "close": 329.04,
        "label": "Mar 25, 21",
      },
      {
        "close": 343.68,
        "label": "Mar 26, 21",
      }
    ];

    const { container } = render(<Graph historyData={mockHistory} />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
