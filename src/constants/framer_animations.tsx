export const headingAnimation = {
  hidden: { y: 150 },
  show: {
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 2,
    },
  },
};

export const headingAnimationsProp = {
  variants: headingAnimation,
  initial: "hidden",
  whileInView: "show",
  viewport: {
    once: true,
  },
};
