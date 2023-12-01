import { Network } from "../api/network";
import * as _ from 'lodash';


export interface AppView {
    toggleLoading(loading: boolean): void;
    onDataReady(data: any): void;
}

export class AppPresenter {
    constructor
        (
            private readonly networkService: Network,
            private readonly view: AppView
        ) { }


    public async init(): Promise<void> {
        this.view.toggleLoading(true);
        const data = await this.networkService.get('');
        this.view.toggleLoading(false);
        this.view.onDataReady(data);
    }
}
