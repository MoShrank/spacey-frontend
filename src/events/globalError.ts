import EventEmitter from "events";

class GlobalError {
    private static error: EventEmitter;
    private static renderCallback: (val: boolean) => void;

    public static init() {
        GlobalError.error = new EventEmitter();
        GlobalError.error.addListener("error", GlobalError.onError);
    }

    private static onError(error: string) {
        if (typeof GlobalError.renderCallback !== "function") {
            return;
        }

        GlobalError.renderCallback(true);

        const timeoutTime = 5000;

        const progressNode = document.getElementById("bar");

        let width = 100;
        const interval = setInterval(() => {
            if (progressNode) {
                width = width - 0.2;
                progressNode.style.width = width + "%";
            }
        }, 10);

        setTimeout(() => {
            clearInterval(interval);
            GlobalError.renderCallback(false);
        }, timeoutTime);
    }

    public static emit(error: string) {
        GlobalError.error.emit("error", error);
    }

    public static setRenderCallback(callback: (val: boolean) => void) {
        GlobalError.renderCallback = callback;
    }
}

GlobalError.init();

export default GlobalError;
