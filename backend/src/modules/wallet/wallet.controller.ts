import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { CurrentUser } from '@shared/decorators';
import { PaginationDto } from '@shared/dto/common.dto';

@ApiTags('Wallet')
@Controller('wallet')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  @ApiOperation({ summary: 'Get user wallet' })
  getWallet(@CurrentUser() user: any) {
    return this.walletService.getWallet(user.id);
  }

  @Get('balance')
  @ApiOperation({ summary: 'Get wallet balance' })
  getBalance(@CurrentUser() user: any) {
    return this.walletService.getWalletBalance(user.id);
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Get wallet transactions' })
  getTransactions(
    @CurrentUser() user: any,
    @Query() pagination: PaginationDto,
  ) {
    const skip = (pagination.page - 1) * pagination.limit;
    return this.walletService.getWalletTransactions(user.id, skip, pagination.limit);
  }
}
