import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform{

    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]
    transform(value:any){
         value = value.toUpperCase();
         if(!this.IsStatusValid(value))
         {
                throw new BadRequestException();
         }
        return value;
    }

    private IsStatusValid(value)
    {
        let idex = this.allowedStatus.indexOf(value);
        return idex !== -1 ;
    }
}