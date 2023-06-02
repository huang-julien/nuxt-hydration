import { THtmlValidatorDetail } from '../client/reason/html-validator'

export enum ROUTE_TYPE {
    WITHOUT_PARAMS,
    WITH_PARAMS
}

export type ReasonName = 'Invalid html' | 'unknown';

export interface BaseDetails {
    message: string,
    type: ReasonName
}

export type ReasonDetail = THtmlValidatorDetail;

export type Reason = {
    reason: ReasonName;
    details?: ReasonDetail[];
};
