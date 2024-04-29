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


export const TextBoxVariants = {
  hidden: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

export const TextItemsVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};