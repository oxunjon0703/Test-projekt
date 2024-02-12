const { ResData } = require("../../lib/resData");
const { FileEntity } = require("./entitiy/file.enititiy");
const { FileNotFoundByIdException } = require("./exseption/files.exseption");
const { FileRepository } = require("./files.repository");

class FileService {
  #repository;
  constructor() {
    this.#repository = new FileRepository();
  }

  async create(dto, file) {
    console.log("file :", file);

    const fileUrl = "http://localhost:5050" + "/" + file.name;

    const newFile = new FileEntity(
      fileUrl,
      file.mimetype,
      dto.originalName,
      file.size
    );

    const CreatedFile = await this.#repository.insert(newFile);

    const resData = new ResData("File upload", 200, CreatedFile);

    return resData;
  }

  async getById(Id) {
    const founFileById = await this.#repository.getById(Id);

    if (!founFileById) {
      throw new FileNotFoundByIdException();
    }

    const resData = new ResData("foun user by id", 200, founFileById);

    return resData;
  }

  async getAll() {
    const files = await this.#repository.getAll();

    const resData = new ResData("all files", 200, files);

    return resData;
  }

  async delete(Id) {
    const FileById = await this.#repository.getById(Id);

    if (!FileById) {
      throw new FileNotFoundByIdException();
    }

    const deleteFile = await this.#repository.delete(Id);

    const resData = new ResData("delete file", 200, foundFile);

    return resData;
  }
}

module.exports = { FileService };
