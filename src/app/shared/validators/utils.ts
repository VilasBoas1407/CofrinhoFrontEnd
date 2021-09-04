export function IsNull(value: string){
    if(value == "" || value == undefined || value == null)
        return true;
    else
        return false;
}
