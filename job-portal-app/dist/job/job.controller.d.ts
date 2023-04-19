import { JobService } from './job.service';
export declare class JobController {
    private jobService;
    constructor(jobService: JobService);
    getAllJobs(): string;
}
