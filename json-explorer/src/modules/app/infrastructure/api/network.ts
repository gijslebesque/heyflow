import demoData from './demo-data.json';


export interface Network {
    get<T>(url: string): Promise<T>;
}

export class NetworkImpl implements Network {
    public async get<T>(url: string): Promise<T> {

        if (process.env.NODE_ENV === 'development') {
            return demoData as unknown as T;
        }
        return (await fetch(url)).json();
    }
}
