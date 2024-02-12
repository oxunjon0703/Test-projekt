class FileEntity {
  constructor(originalName, path, size, mimetype) {
    (this.originalName = originalName),
      (this.path = path),
      (this.size = size),
      (this.mimetype = mimetype),
      (this.data = new Date());
  }
}

module.exports = { FileEntity };
