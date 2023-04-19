import { Injectable } from '@nestjs/common';

@Injectable()
export class JobService {
    getAllJobs():string{
        return "All jobs"
    }
}
