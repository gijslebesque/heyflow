import { NetworkImpl } from "./api/network";
import { AppPresenter, AppView } from "./presenters/app-presenter";


export const getAppPresenter = (view: AppView
) => new AppPresenter(
    new NetworkImpl(),
    view
);


