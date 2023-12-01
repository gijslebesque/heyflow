
import { JsonPresenter, JsonView } from "./presenters/json-presenter";


export const getJsonPresenter = <T>(view: JsonView, data: T) => new JsonPresenter<T>(view, data);
