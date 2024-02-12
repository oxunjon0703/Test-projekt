const { Postgres } = require("../../lib/pg");

class FileRepository extends Postgres {
  async getAll() {
    return await this.fetchAll("SELECT * FROM test.files");
  }

  async getById(id) {
    return await this.fetch("SELECT * FROM test.files f  where f.id = $1", id);
  }

  async insert(FileEntity) {
    return await this.fetch(
      "INSERT INTO test.files(originalName, path, size, mimetype, data) VALUES($1, $2, $3, $4) returning * ",
      FileEntity.originalName,
      FileEntity.path,
      FileEntity.size,
      FileEntity.mimetype
    );
  }

  async delete(id) {
    return await this.fetch("delete from test.files where id = $1", id);
  }
}

module.exports = { FileRepository };