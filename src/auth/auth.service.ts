import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(userName: string, pass: string): Promise<any> {
        const user = await this.userService.findOne({ userName });

        if (user && (await compare(pass, user.password))) {
            const { password, ...rest } = user;
            return rest;
        }

        return null;
    }

    login(user: User) {
        const { id, ...rest } = user;
        const payload = { sub: id };

        return {
            user,
            accessToken: this.jwtService.sign(payload),
        };
    }
}
