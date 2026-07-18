import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';

import {
  LoginDto,
  RegisterDto,
  ChangePasswordDto,
  LogoutDto,
  AuthResponseDto,
  RefreshTokenDto,
} from './dto/login.dto';

import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { CurrentUser, Public } from '@shared/decorators';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {}


  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: AuthResponseDto,
  })
  register(
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }



  @Post('login')
  @Public()
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  login(
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }



  @Post('refresh')
  @Public()
  @ApiOperation({
    summary: 'Refresh authentication token',
  })
  refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ) {
    return this.authService.refreshToken(
      refreshTokenDto.refreshToken,
    );
  }



  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout user',
  })
  logout(
    @CurrentUser() user: any,
    @Body() logoutDto: LogoutDto,
  ) {
    return this.authService.logout(
      user.id,
      logoutDto,
    );
  }



  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Change password',
  })
  changePassword(
    @CurrentUser() user: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(
      user.id,
      changePasswordDto,
    );
  }



  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current user info',
  })
  me(
    @CurrentUser() user: any,
  ) {
    return user;
  }
}