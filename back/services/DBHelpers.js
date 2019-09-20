module.exports = class DBHelpers {
  constructor(MongooseModel) {
    this.MongooseModel = MongooseModel;
  }

  async createAndFindOne(data, projection) {
    const newDocument = await this.MongooseModel.create(data);
    const response = await this.MongooseModel.findOne(
      { _id: newDocument._id },
      { ...projection },
    );
    return response;
  }
};
