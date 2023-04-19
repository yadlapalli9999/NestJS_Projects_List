import { Controller, Get, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('job')
export class JobController {
    constructor(private jobService:JobService){}

    @Get('/all')
    @UseGuards(AuthGuard('jwt'))
    getAllJobs(){
        return this.jobService.getAllJobs()
    }
}
