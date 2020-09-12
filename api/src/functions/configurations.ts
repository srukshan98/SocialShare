export function GetParameters(func: Function): string[] {
    return _getParameters(func).split(',').filter((parm: string) => parm != '');
}
function _getParameters(func: Function) {
    return new RegExp('(?:' + func.name + '\\s*|^)\\s*\\((.*?)\\)').exec(func.toString().replace(/\n/g, ''))[1].replace(/\/\*.*?\*\//g, '').replace(/ /g, '');
}