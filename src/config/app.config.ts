import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  maxProjectsPerAddress: parseInt(process.env.MAX_PROJECTS_PER_ADDRESS),
}));
