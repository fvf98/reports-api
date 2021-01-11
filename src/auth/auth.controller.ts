import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserEntity } from 'src/user/entities';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards';
import { Auth, User } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginDto: LoginDto, @User() user: UserEntity) {
        const data = await this.authService.login(user);
        return {
            message: 'Login exitoso',
            data,
        };
    }

    @Auth()
    @Get('refresh')
    refreshToken(@User() user: UserEntity) {
        const data = this.authService.login(user);
        return {
            message: 'Refresh exitoso',
            data,
        };
    }
}
