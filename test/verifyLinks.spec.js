import {
  statsFunction, filterLinks,
  validateFunction,
} from "../src/verifyLinks";

describe("statsFunction", () => {
  test("deve retornar objeto com estatísticas corretas", async () => {
    const arrayLinks = [
      { href: "https://example.com", ok: true },
      { href: "https://example.com", ok: false },
      { href: "https://example.com", ok: true },
    ];

    const result = await statsFunction(arrayLinks);

    expect(result).toEqual({ total: 3, unique: 1, broken: 1 });
  });

  test("deve retornar objeto vazio se o array estiver vazio", async () => {
    const arrayLinks = [];

    const result = await statsFunction(arrayLinks);

    expect(result).toEqual({ total: 0, unique: 0, broken: 0 });
  });
});

describe("filterLinks", () => {
  test("deve filtrar e resolver com array de links corretamente", async () => {
    const path = { file: "example.md", data: "[Link 1](https://example.com) [Link 2](https://example.org)" };
    const expectedArrayLinks = [
      { href: "https://example.com", texto: "Link 1", file: "example.md" },
      { href: "https://example.org", texto: "Link 2", file: "example.md" },
    ];

    const result = await filterLinks(path);

    expect(result).toEqual(expectedArrayLinks);
  });

  test("deve rejeitar com erro se não encontrar links no arquivo", async () => {
    const path = { file: "example.md", data: "Texto sem links" };

    const result = filterLinks(path);

    await expect(result).rejects.toThrowError("example.md");
  });
});

describe("validateFunction", () => {
  test("deve validar e resolver array de links", async () => {
    const arrayLinks = [
      { href: "https://example.com", texto: "Link 1", file: "example.md" },
      { href: "https://example.org", texto: "Link 2", file: "example.md" },
    ];
    const fetchMock = jest.fn();
    global.fetch = fetchMock.mockResolvedValueOnce({ status: 200, ok: true })
        .mockResolvedValueOnce({ status: 404, ok: false });

    const expectedArrayLinks = [
      { href: "https://example.com", texto: "Link 1", file: "example.md", status: 200, ok: true },
      { href: "https://example.org", texto: "Link 2", file: "example.md", status: 404, ok: false },
    ];

    const result = await validateFunction(arrayLinks);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result).toEqual(expectedArrayLinks);
  });

  test("deve lidar corretamente com erros na validação", async () => {
   const arrayLinks = [{ href: "https://example.com", texto: "Link 1", file: "example.md" }];
   const fetchMock = jest.fn();
   global.fetch = fetchMock.mockRejectedValueOnce(
     new Error("Failed to fetch"));

   const expectedArrayLinks = [
     { href: "https://example.com", texto: "Link 1", file: "example.md", status: new Error("Failed to fetch"), ok: false },
   ];

   const result = await validateFunction(arrayLinks);

   expect(fetchMock).toHaveBeenCalledTimes(1);
   expect(result).toEqual(expectedArrayLinks);
  });
});

