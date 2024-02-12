const { Postgres } = require("../../lib/pg");

class TestRepository extends Postgres {
  async getAll() {
    return await this.fetchAll("SELECT * FROM test.tests");
  }

  async getById(id) {
    return await this.fetch(
      "select * FROM test.tests as q  where q.id = $1",
      id
    );
  }

  async insert(QuestionEntity) {
    return await this.fetch(
      "INSERT INTO test.tests(title) VALUES($1) returning *;",
      QuestionEntity.title
    );
  }

  async delete(id) {
    return await this.fetch("delete from test.tests where id = $1", id);
  }
}

module.exports = { TestRepository };
