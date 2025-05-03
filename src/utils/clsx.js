import clsx from 'clsx';

/**
 * Utility function to combine class names conditionally
 * @param {string} classes - Class names to combine
 * @returns {string} - Combined class names
 */
export const cn = (...classes) => {
  return clsx(...classes);
};
