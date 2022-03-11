import { Injectable } from '@nestjs/common';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';

@Injectable()
export class WidgetsService {
  create(createWidgetDto: CreateWidgetDto) {}

  findAll() {}

  findOne(id: string) {}

  update(id: string, updateWidgetDto: UpdateWidgetDto) {}

  uploadBanner(id: string, file: Express.Multer.File) {}

  async remove(id: string) {}
}
