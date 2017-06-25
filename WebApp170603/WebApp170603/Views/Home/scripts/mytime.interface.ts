namespace mytime {
    export interface MytimeElement {
        htmlStructure: string;
        initModule: Function;
    }

    export interface JesonCarrier {
        actionType: string;
        groupeName: string;
        email0: string;
        email1: string;
        email2: string;
        email3: string;
        startDateTime: string;
        endDateTime: string;
        memoColumn: string;
        actionResult: string;
    }

}