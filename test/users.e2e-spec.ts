import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('Auth, Users, Tasks (e2e)', () => {
    let app: INestApplication;
    let accessToken: string;
    let userId: number;
    let taskId: number;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
    //app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    //Authentification
    describe('Auth', () => {
        it('/auth/signup (POST) - registration', async () => {
            const existingUsers = await request(app.getHttpServer())
            .get('/users')
            .expect(200);
          
            const existingUser = existingUsers.body.find(user => user.email === 'test@gmail.com');  console.log(existingUser.id)
            if (existingUser) {
                await request(app.getHttpServer())
                    .delete(`/users/${existingUser.id}`)
                    .expect(200);
            }

            const response = await request(app.getHttpServer())
                .post('/auth/signup')
                .send({email: 'test@gmail.com', password: 'tester', passwordConfirmation: 'tester'})
                .expect(201);
            
            userId = response.body.id;
            expect(response.body).toHaveProperty('email', 'test@gmail.com');
        });
        
        it('/auth/signin (POST) - login', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/signin')
                .send({email: 'test@gmail.com', password: 'tester'})
                .expect(200);
            
            accessToken = response.body.accessToken;
            expect(accessToken).toBeDefined();
        });
    });

    describe('Users', () => {
        it('/users (GET)', async () => {
            const response = await request(app.getHttpServer())
                .get('/users')
                .expect(200);
    
            expect(Array.isArray(response.body)).toBe(true);
            if(response.body.length > 0) {
                expect(response.body[0]).toHaveProperty('id');
                expect(response.body[0]).toHaveProperty('email');
            }
        });

        it('/users/:id (GET)', async () => {
            console.log(userId)
            const response = await request(app.getHttpServer())
                .get(`/users/${userId}`)
                .expect(200);
    
            expect(response.body).toHaveProperty('id', userId);
            expect(response.body).toHaveProperty('email', 'test@gmail.com');
        });
    });

    describe('Tasks', () => {
        it('/tasks (POST)', async () => {
            const response = await request(app.getHttpServer())
                .post('/tasks')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({title: 'Test title', description: 'Test description', status: 'TODO'})
                .expect(201);

            taskId = response.body.id;
            expect(response.body).toHaveProperty('title', 'Test title');
        });

        it('/tasks (GET)', async () => {
            const response = await request(app.getHttpServer())
                .get('/tasks')
                .set('Authorization', `Bearer ${accessToken}`)
                expect(200);
            
            expect(response.body[0]).toHaveProperty('id', taskId);
        });

        it('/tasks/:id (GET)', async () => {
            const response = await request(app.getHttpServer())
                .get('/tasks/' + taskId)
                .set('Authorization', `Bearer ${accessToken}`)
                expect(200);
            
            expect(response.body).toHaveProperty('id', taskId);
        });

        it('/tasks/:id (PATCH)', async () => {
            const response = await request(app.getHttpServer())
                .patch('/tasks/' + taskId)
                .set('Authorization', `Bearer ${accessToken}`)
                .send({status: 'IN_PROGRESS'})
                expect(200);
            
            expect(response.body).toHaveProperty('status', 'IN_PROGRESS');
        });

        it('/tasks/:id (DELETE)', async () => {
            await request(app.getHttpServer())
                .delete('/tasks/' + taskId)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);
        });
    });
})