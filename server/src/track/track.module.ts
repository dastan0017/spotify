import { MongooseModule } from '@nestjs/mongoose';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Module } from "@nestjs/common";
import { Track, TrackSchema } from './schemas/track.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';

@Module({
    imports: [MongooseModule.forFeature([
        {name: Track.name, schema: TrackSchema}, 
        {name: Comment.name, schema: CommentSchema}
    ])],
    providers: [TrackService],
    controllers: [TrackController]
})
export class TrackModule{

}