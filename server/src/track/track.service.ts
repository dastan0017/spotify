import { CreateTrackDto } from './dto/create-track.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";
import { Model, ObjectId } from 'mongoose';
import { TrackDocument, Track } from './schemas/track.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>, 
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
    ) {}

    async create(dto: CreateTrackDto): Promise<Track>{
        const track = await this.trackModel.create({...dto, listens: 0})
        return track
    }

    async getAll(): Promise<Track[]>{
        const tracks = await this.trackModel.find()
        return tracks
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id)
        return track
    }

    async delete(id: ObjectId): Promise<ObjectId>{
        const track = await this.trackModel.findOneAndRemove(id)
        return track._id as unknown as ObjectId;
    }
}