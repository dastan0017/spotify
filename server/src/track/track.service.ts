import { FileService, FileType } from './../file/file.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";
import { Model, ObjectId } from 'mongoose';
import { TrackDocument, Track } from './schemas/track.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>, 
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private fileService: FileService
    ) {}

    async create(dto: CreateTrackDto, picture, audio): Promise<Track>{
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);


        const track = await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath})
        return track
    }

    async getAll(count = 2, offset = 0): Promise<Track[]>{
        const tracks = await this.trackModel.find().skip(Number(offset)).limit(Number(count))
        return tracks
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate("comments")
        return track
    }

    async delete(id: ObjectId): Promise<ObjectId>{
        const track = await this.trackModel.findOneAndRemove(id)
        return track._id as unknown as ObjectId;
    }

    async addComment(dto: CreateCommentDto): Promise<Comment>{
        const track = await this.trackModel.findById(dto.trackId);

        const comment = await this.commentModel.create({...dto})
        track.comments.push(comment._id)
        await track.save();
        return comment
    }

    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id);
        track.listens += 1;
        track.save();
    }

    async search(query: string): Promise<Track[]> {
        const tracks = await this.trackModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })

        return tracks
    }
}