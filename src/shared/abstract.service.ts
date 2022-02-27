import { Repository } from 'typeorm';

export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async save(Options) {
    return await this.repository.save(Options);
  }

  async find(Options) {
    return await this.repository.find(Options);
  }
  async findOne(Options) {
    return await this.repository.findOne(Options);
  }
  async update(id: number, Options) {
    return await this.repository.update(id, Options);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
