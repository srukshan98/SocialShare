export function ConvertToString(value: any): string {
    if (value == null) {
        throw 'Value Cannot be Null';
    }

    const res: string = String(value).trim();

    if (res == '') {
        throw 'Value Cannot be Empty';
    }

    return res;
}

export function ConvertToNullableString(value: any): string | null {
    if (value == null) {
        return null;
    }

    const res: string = String(value).trim();

    if (!res) {
        return null;
    }

    return res;
}
