import { FileService } from './file.service';
import { Module } from "@nestjs/common";

@Module({
    providers: [FileService]
})
export class FileModule {}