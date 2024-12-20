export const popup = (duration) => ({
    initial: {
        opacity: 0,
        scale: 0.8,
    },
    enter: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: duration,
        },
    },
    leave: {
        opacity: 0,
        scale: 0.8,
        transition: {
            duration: duration,
        }
    }
});

