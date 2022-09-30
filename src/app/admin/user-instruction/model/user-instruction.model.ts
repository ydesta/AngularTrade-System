import DateTimeFormat = Intl.DateTimeFormat;

export class UserInstructionModel {
    public Id: number;
    public ServiceId: string;
    public Title: string;
    public TitleAmh: string;
    public Instruction: string;
    public InstructionAmh: string;
    public OrderNo: number;
    public EventDateTime: DateTimeFormat;
    public UpdateDateTime: DateTimeFormat;
}
export class EditUserInstructionModel {
    public Id: number;
    public ServiceId: string;
    public Title: string;
    public TitleAmh: string;
    public Instruction: string;
    public InstructionAmh: string;
    public OrderNo: number;
}
export class UserInstructionViewModel {
    public Id: number;
    public ServiceId: string;
    public Title: string;
    public Instruction: string;
}
export class EditUserInstructionPostModel {
    public Id: number;
    public ServiceId: string;
    public Title: string;
    public TitleAmh: string;
    public Instruction: string;
    public InstructionAmh: string;
    public OrderNo: number;
}
