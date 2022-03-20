import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const mimetypesFileFilter: (
  ...mimetypes: string[]
) => MulterOptions['fileFilter'] = (mimetypes) => (_, file, cb) => {
  cb(null, mimetypes.includes(file.mimetype));
};
