import * as bcrypt from 'bcrypt';

interface SeedData {
    users: SeedUser[];
    roles: SeedRole[];
    employees: SeedEmployee[];
}

interface SeedUser {
    username: string;
    password: string;
    status: boolean;
}

interface SeedRole {
    name: string;
    status: boolean;
}

interface SeedEmployee {
    names: string;
    phone: string,
    dni: string,
    status: boolean;
}

export const initialData: SeedData = {
    users: [
        {
            username: 'UsEr_OnE01',
            password: bcrypt.hashSync('12345abcde', 10),
            status: true
        },
        {
            username: 'UsEr_OnE02',
            password: bcrypt.hashSync('abcde12345', 10),
            status: true
        },
        {
            username: 'UsEr_OnE03',
            password: bcrypt.hashSync('fghij56789', 10),
            status: true
        }
    ],
    roles: [
        {
            name: 'admin',
            status: true
        },
        {
            name: 'super-user',
            status: true
        },
        {
            name: 'user',
            status: true
        }
    ],
    employees: [
        {
            names: 'jesus coronado',
            phone: '999666888',
            dni: '98765432',
            status: true
        },
        {
            names: 'juan perez',
            phone: '966333222',
            dni: '12345678',
            status: true
        }, {
            names: 'antonella da silva',
            phone: '977444555',
            dni: '32165498',
            status: true
        }
    ]

}