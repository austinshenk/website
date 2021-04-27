let preferenceTransitionTimeout: number;
let transitionTimeout: number;
export default {
    preference: (transition: () => void, duration: number) => {
        const root = document.documentElement;

        window.clearTimeout(preferenceTransitionTimeout);
        window.clearTimeout(transitionTimeout);
        root.setAttribute("am-preference-transition", "running");

        transitionTimeout = window.setTimeout(() => {
            transition();
            preferenceTransitionTimeout = window.setTimeout(() => {
                root.setAttribute("am-preference-transition", "stopped");
            }, duration);
        }, 0);
    }
}