import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}
  findById(customerId: string) {
    return this.customerModel.findById(customerId);
  }
}
