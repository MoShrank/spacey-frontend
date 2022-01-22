import EventEmitter from "events";

class GlobalError {
    private static error: EventEmitter;

    public static init() {
        GlobalError.error = new EventEmitter();
        GlobalError.error.addListener("error", GlobalError.onError);
    }

    private static onError(error: string) {
        const node = document.getElementById("global_error_popup");
        if (node) {
            node.style.display = "block";
            node.innerHTML = error;
            setTimeout(() => {
                node.style.display = "none";
                node.innerHTML = "";
            }, 3000);
        }
    }

    public static emit(error: string) {
        GlobalError.error.emit("error", error);
    }
}

GlobalError.init();

export default GlobalError;
