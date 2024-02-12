const { Postgres } = require("../../lib/pg");

class UserRepository extends Postgres {
  async findOneByLogin(login) {
    return await this.fetch("select * from test.users where login = $1", login);
  }

  async getAll() {
    return await this.fetchAll("SELECT u.id, u.login, u.password, u.full_name, u.birthdate, u.role, row_to_json(f) files FROM test.users as u inner join test.files as f on u.file_id = f.id");
  }

  async getById(id) {
    return await this.fetch("select u.id, u.login, u.password, u.full_name, u.birthdate, u.role, row_to_json(f) files FROM test.users as u inner join test.files as f on u.file_id = f.id  where u.id = $1", id);
  }

  async insert(UserEntity) {
    return await this.fetchAll(
      "INSERT INTO test.users(login, password, full_name, birthdate, role, file_id) VALUES($1, $2, $3, $4, $5, $6) returning *;",
      UserEntity.login,
      UserEntity.password,
      UserEntity.full_name,
      UserEntity.birthdate,
      UserEntity.role,
      UserEntity.file_id
    );
  }

  async delete(id) {
    return await this.fetchAll("delete from test.users where id = $1", id);
  }
}

module.exports = { UserRepository };
