import { render } from "@testing-library/react";

import React from "react";
import News from "../News";

describe("render News Component", () => {
  it("render without props", async () => {
    const { container } = render(<News />);

    expect(container.firstChild).toBe(null);
  });

  it("render News with props", async () => {
    const mockNews = {
      datetime: 1616840852000,
      image: "https://cloud.iexapis.com/v1/news/image/3b35d141-2ddd-4e42-9952-8ab49ebdcf5b",
      source: "Business Insider",
      url: "https://cloud.iexapis.com/v1/news/article/3b35d141-2ddd-4e42-9952-8ab49ebdcf5b",
      headline: "Animals stranded on board 20 livestock ships trapped in the Suez Canal jam could starve and die if the situation lasts much longer, charity warns",
      summary: "Summary List Placement At least 20 livestock ships have been unable to pass through the Suez Canal"
    };

    const { getByText } = render(<News news={mockNews} />);

    expect(getByText("Business Insider")).toBeInTheDocument();
  });
});
