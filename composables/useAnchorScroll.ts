// composables/useAnchorScroll.js
export function useAnchorScroll(defaultOffset = 150) {
  const activeSection = ref<string | null>(null);


  const getCategoryIndex = (element: Element): number => {
    return Number(element.getAttribute('id')?.split('-')[1])
  }

  /**
 * change active category and scooll categories wrapper
 * @param {number} categoryId - active category id
 */
  const changeActiveCategory = (categoryId: number) => {
    const categoriesWrapper = document.getElementById('categories');
    const activeElement = document.getElementById(`category-${categoryId}`);
    const prevActive = document.querySelector('.active-category')


    if (!categoriesWrapper || !activeElement || !prevActive) {
      console.warn('changeActiveCategory: Element topilmadi.');
      return;
    }

    const activeRect = activeElement.getBoundingClientRect();

    const difference = getCategoryIndex(activeElement) - getCategoryIndex(prevActive)

    const offset = activeRect.width

    if (difference <= -1) {
      categoriesWrapper.scrollTo({
        left: categoriesWrapper.scrollLeft - offset,
        behavior: 'smooth',
      });
    } else {
      categoriesWrapper.scrollTo({
        left: categoriesWrapper.scrollLeft + offset,
        behavior: 'smooth',
      });
    }
  };


  /**
   * Scrolls smoothly to the given anchor ID.
   * @param {string} id - The ID of the target element.
   * @param {number} [customOffset] - Custom offset from the top.
   */
  const scrollToAnchor = (id: string, customOffset?: number) => {
    if (!id || typeof id !== 'string') {
      console.warn('scrollToAnchor: ID is required and must be a string.');
      return;
    }

    const el = document.getElementById(id);

    if (!el) {
      console.warn(`scrollToAnchor: No element found with id #${id}`);
      return;
    }

    const offset = typeof customOffset === 'number' ? customOffset : defaultOffset;
    const elementTop = el.getBoundingClientRect().top + window.scrollY;
    const targetPosition = elementTop - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };

  /**
   * Scrolls smoothly to the top of the page.
   * @param {number} [customOffset] - Custom offset from the top (useful if header is sticky).
   */
  const scrollToTop = (customOffset: number) => {
    const offset = typeof customOffset === 'number' ? customOffset : defaultOffset;

    window.scrollTo({
      top: 0 + offset,
      behavior: 'smooth',
    });
  };

  /**
  * Observes sections and updates activeSection when scrolling
  * @param {string[]} ids - Array of section IDs
  */
  const observeSections = (ids: string[]) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id;
          }
        });
      },
      {
        rootMargin: `-${defaultOffset}px 0px 0px 0px`,
        threshold: 0.3,
      }
    );

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });
  };


  return {
    changeActiveCategory,
    scrollToAnchor,
    scrollToTop,
    observeSections,
    activeSection
  };
}
