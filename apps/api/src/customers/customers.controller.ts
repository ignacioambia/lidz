import { Controller, Get, Body } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { TokenPayload } from 'src/common/decorators/token-payload.decorator.spec';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('profile')
  getProfile(@TokenPayload('sub') customerId: string) {
    return this.customersService.findById(customerId);
  }
}
