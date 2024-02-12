const { Postgres } = require("../../lib/pg");

class QuestionRepository extends Postgres {
  async getAll() {
    return await this.fetchAll("SELECT * FROM test.questions");
  }

  async getById(id) {
    return await this.fetch(
      "select * FROM test.questions as q  where q.id = $1",
      id
    );
  }

  async insert(QuestionEntity) {
    return await this.fetch(
      "INSERT INTO test.questions(title) VALUES($1) returning *;",
      QuestionEntity.title
    );
  }

  async delete(id) {
    return await this.fetch("delete from test.questions where id = $1", id);
  }
}

module.exports = { QuestionRepository };
