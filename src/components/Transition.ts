let preferenceTransitionTimeout;
let transitionTimeout;
export default {
    preference: (transition: () => void, duration: number) => {
        const root = document.firstElementChild;

        clearTimeout(preferenceTransitionTimeout);
        clearTimeout(transitionTimeout);
        root.setAttribute("am-preference-transition", "running");

        transitionTimeout = setTimeout(() => {
            transition();
            preferenceTransitionTimeout = setTimeout(() => {
                root.setAttribute("am-preference-transition", "stopped");
            }, duration);
        }, 0);
    }
}