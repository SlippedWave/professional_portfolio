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

export const scale_hover = (scale = 1.05) => ({
    initial: {
        scale: 1,
        transition: { duration: 300 }
    },
    hover: {
        scale: scale,
        transition: {
            type: 'spring',
            stiffness: 500,
            damping: 30
        }
    },
    hoverLeave: {
        scale: 1,
        transition: { duration: 200 }
    }
});

