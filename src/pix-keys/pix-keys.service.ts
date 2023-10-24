import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePixKeyDto } from './dto/create-pix-key.dto';
// import { UpdatePixKeyDto } from './dto/update-pix-key.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PixKey } from './entities/pix-key.entity';
import { BankAccount } from 'src/bank-accounts/entities/bank-account.entity';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class PixKeysService implements OnModuleInit {
  private pixGrpcService: any;

  constructor(
    @InjectRepository(PixKey)
    private pixKeyRepo: Repository<PixKey>,
    @InjectRepository(BankAccount)
    private bankAccountRepo: Repository<BankAccount>,
    private pixGrpcPackage: ClientGrpc,
  ) {}

  onModuleInit() {
    this.pixGrpcService = this.pixGrpcPackage.getService('PixService');
  }

  async create(bankAccountId: string, createPixKeyDto: CreatePixKeyDto) {
    await this.bankAccountRepo.findOneOrFail({ where: { id: bankAccountId } });

    return this.pixKeyRepo.save({
      bank_account_id: bankAccountId,
      ...createPixKeyDto,
    });
  }

  findAll(bankAccountId: string) {
    return this.pixKeyRepo.find({
      where: { bank_account_id: bankAccountId },
      order: { created_at: 'DESC' },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} pixKey`;
  // }

  // update(id: number, updatePixKeyDto: UpdatePixKeyDto) {
  //   return `This action updates a #${id} pixKey`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} pixKey`;
  // }
}
