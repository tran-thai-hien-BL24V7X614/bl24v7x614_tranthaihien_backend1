const { ObjectId } = require("mongodb");

class ContactService {
  constructor(client) {
    this.Contact = client.db().collection("contacts");
  }

  

  // Tách dữ liệu hợp lệ từ payload
  extractContactData(payload) {
    const contact = {
      name: payload.name,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      favorite: payload.favorite,
    };

    // Remove undefined fields
    Object.keys(contact).forEach(
      (key) => contact[key] === undefined && delete contact[key]
    );

    return contact;
  }

  // Tạo contact mới
  async create(payload) {
    const contact = this.extractContactData(payload);
    const result = await this.Contact.insertOne(contact);
    return result;
  }

  

  // Tìm tất cả
  async find(filter) {
    const cursor = await this.Contact.find(filter);
    return await cursor.toArray();
  }

  // Tìm theo id
  async findById(id) {
    return await this.Contact.findOne({
      _id: new ObjectId(id),
    });
  }

  // Cập nhật
  async update(id, payload) {
    const update = this.extractContactData(payload);

    const result = await this.Contact.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );

    return result;
  }

  // Xóa
  async delete(id) {
    const result = await this.Contact.findOneAndDelete({
      _id: new ObjectId(id),
    });

    return result;
  }

  // Tìm contact yêu thích
  async findFavorite() {
    return await this.find({ favorite: true });
  }

  // Xóa tất cả
  async deleteAll() {
    const result = await this.Contact.deleteMany({});
    return result.deletedCount;
  }
  async findFavorite() {
return await this.find({ favorite: true });
}
}


module.exports = ContactService;