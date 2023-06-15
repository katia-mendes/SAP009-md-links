import mdLinks from "../src/md-links.js";
import { read } from "../src/verifyFile.js";
import { filterLinks, validateFunction } from "../src/verifyLinks.js";

jest.mock("../src/verifyFile");
jest.mock("../src/verifyLinks");

describe("mdLinks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve chamar read corretamente e resolver links", async () => {
    const fileContent = "Exemplo de conteúdo do arquivo";
    const filteredLinks = [{ href: "https://example.com", text: "Exemplo" }];

    read.mockResolvedValue(fileContent);
    filterLinks.mockResolvedValue(filteredLinks);

    const result = await mdLinks("/path/to/file", { validate: false });

    expect(read).toHaveBeenCalledWith("/path/to/file");
    expect(filterLinks).toHaveBeenCalledWith(fileContent);
    expect(result).toEqual(filteredLinks);
  });

  test("deve chamar read corretamente e resolver links", async () => {
    const fileContent = "Exemplo de conteúdo do arquivo";
    const filteredLinks = [{ href: "https://example.com", text: "Exemplo" }];
    const validatedLinks = [{ href: "https://example.com", text: "Exemplo", status: 200 }];

    read.mockResolvedValue(fileContent);
    filterLinks.mockResolvedValue(filteredLinks);
    validateFunction.mockResolvedValue(validatedLinks);

    const result = await mdLinks("/path/to/file", { validate: true });

    expect(read).toHaveBeenCalledWith("/path/to/file");
    expect(filterLinks).toHaveBeenCalledWith(fileContent);
    expect(validateFunction).toHaveBeenCalledWith(filteredLinks);
    expect(result).toEqual(validatedLinks);
  });

  // test("chamar read corretamente e varios arq.", async () => {
  //  const fileContent1 = "Exemplo de conteúdo do arquivo 1";
  //  const fileContent2 = "Exemplo de conteúdo do arquivo 2";
  //  const filteredLinks1 = [{ href: "https://example.com/1", text: "Exemplo 1" }];
  //  const filteredLinks2 = [{ href: "https://example.com/2", text: "Exemplo 2" }];
  //  const allFilteredLinks = [...filteredLinks1, ...filteredLinks2];

  //  read.mockResolvedValueOnce([fileContent1, fileContent2]);
  //  filterLinks.mockResolvedValueOnce(filteredLinks1)
  //      .mockResolvedValueOnce(filteredLinks2);

  //  const result = await mdLinks("/path/to/files", { validate: false });

  //  expect(read).toHaveBeenCalledWith("/path/to/files");
  //  expect(filterLinks).toHaveBeenCalledWith(fileContent1);
  //  expect(filterLinks).toHaveBeenCalledWith(fileContent2);
  //  expect(result).toEqual(allFilteredLinks);
  // });
});