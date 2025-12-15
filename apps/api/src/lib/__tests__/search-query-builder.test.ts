import { buildSearchQuery, getCategoryFromUrl } from "../search-query-builder";

describe("buildSearchQuery", () => {
  it("combines pdf and site filters without forcing site results to be pdf", () => {
    const { query, categoryMap } = buildSearchQuery("test query", [
      "github",
      "pdf",
    ]);

    expect(query).toBe("test query (site:github.com OR filetype:pdf)");
    expect(query).not.toContain("site:github.com filetype:pdf");
    expect(categoryMap.get("github.com")).toBe("github");
    expect(categoryMap.get("__pdf__")).toBe("pdf");
    expect(
      getCategoryFromUrl("https://github.com/firecrawl", categoryMap),
    ).toBe("github");
    expect(
      getCategoryFromUrl("https://example.com/some-file.pdf", categoryMap),
    ).toBe("pdf");
  });

  it("adds pdf results alongside custom research sites", () => {
    const { query } = buildSearchQuery("research topic", [
      { type: "research", sites: ["example.edu"] },
      "pdf",
    ]);

    expect(query).toBe("research topic (site:example.edu OR filetype:pdf)");
  });

  it("only filters by pdf when no site categories are provided", () => {
    const { query, categoryMap } = buildSearchQuery("pdf only", ["pdf"]);

    expect(query).toBe("pdf only filetype:pdf");
    expect(categoryMap.get("__pdf__")).toBe("pdf");
  });
});
