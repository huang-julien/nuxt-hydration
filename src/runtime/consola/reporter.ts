import  { BrowserReporter, ConsolaReporterArgs, ConsolaReporterLogObject } from "consola"

export default class CustomReporter extends BrowserReporter{
    onError;

    constructor(onError : (logObj: ConsolaReporterLogObject) => void) {
        super()
        this.onError = onError
    }


    log(logObj: ConsolaReporterLogObject, args: ConsolaReporterArgs) {
        super.log(logObj, args)
        if(logObj.type === 'error') {
            this.onError(logObj)
        }
    }
}