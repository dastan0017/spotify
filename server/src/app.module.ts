import { TrackModule } from './track/track.module';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [TrackModule, MongooseModule.forRoot('mongodb+srv://Dastan:x@cluster0.cfnpswy.mongodb.net/?retryWrites=true&w=majority')]
})
export class AppModule {}