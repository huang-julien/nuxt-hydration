import  { BrowserReporter, ConsolaReporterArgs, ConsolaReporterLogObject } from "consola"
import { Hookable, createHooks } from "hookable"

type ReporterHooks = {
    "log:error": (logObj: ConsolaReporterLogObject, args: ConsolaReporterArgs) => void
}
export default class CustomReporter extends BrowserReporter { 

    hooks: Hookable<ReporterHooks>

    constructor() {
        super()

        this.hooks = createHooks()
    }


    log(logObj: ConsolaReporterLogObject, args: ConsolaReporterArgs) {
        super.log(logObj, args)
        if(logObj.type === 'error') {
            this.hooks.callHook("log:error", logObj, args)
        }
    }
}