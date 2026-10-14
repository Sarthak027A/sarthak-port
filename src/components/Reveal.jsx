import { useEffect, useRef } from "react";

// One shared IntersectionObserver for every reveal on the page — cheaper than
// a scroll listener or a per-element animation library instance.
let observer;
const getObserver = () => {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
  }
  return observer;
};

const Reveal = ({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
