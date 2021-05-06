
export function setItem(name: string, value: any) {
    if (!value) {
        localStorage.removeItem(name);
    } else {
        localStorage.setItem(name, JSON.stringify(value));
    }
}

export function getItem(name: string): any {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
}

export enum Names {
    COCKTAILS = 'COCKTAILS',
}