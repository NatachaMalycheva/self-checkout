import styles from "./AlphabeticalScroller.module.css";
import { useEffect, useRef, useState } from "react";

const AlphabetScroll = ({ items }) => {
  const [activeLetter, setActiveLetter] = useState("");
  const containerRef = useRef(null);
  const letterSectionsRef = useRef({});
  const alphabetBarRef = useRef(null);

  const groupedItems = items.reduce((acc, item) => {
    const letter = item.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(item);
    return acc;
  }, {});

  // Generate alphabet array of available letters
  const alphabet = Object.keys(groupedItems).sort();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // Find which letter section is most visible
      const containerTop = containerRef.current.getBoundingClientRect().top;
      let closestLetter = '';
      let closestDistance = Infinity;
      
      Object.entries(letterSectionsRef.current).forEach(([letter, element]) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerTop);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestLetter = letter;
        }
      });
      
      if (closestLetter && closestLetter !== activeLetter) {
        setActiveLetter(closestLetter);
        
        if (alphabetBarRef.current) {
          const letterButton = alphabetBarRef.current.querySelector(`.${styles.active}`);
          if (letterButton) {
            letterButton.scrollIntoView({ block: "nearest"  });
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    
    handleScroll();
    
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [activeLetter]);

  const scrollToLetter = (letter) => {
    const element = letterSectionsRef.current[letter];
    if (element && containerRef.current) {
      containerRef.current.scrollTop = element.offsetTop;
    }
  };

  return (
    <div className={styles.container}>
      <div ref={containerRef} className={styles.itemsContainer}>
        {alphabet.map(letter => (
          <div 
            key={letter}
            className={styles.letterSection}
            ref={el => letterSectionsRef.current[letter] = el}
          >
            <h2 className={styles.letterHeader}>{letter}</h2>
            <div className={styles.itemsGrid}>
              {groupedItems[letter].map((item, index) => (
                <div key={`${letter}-${index}`} className={styles.gridItem}>
                  {item.render ? item.render() : item.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div ref={alphabetBarRef} className={styles.alphabetBar}>
        {alphabet.map(letter => (
          <button
            key={letter}
            className={`${styles.letterButton} ${letter === activeLetter ? styles.active : ''}`}
            onClick={() => scrollToLetter(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlphabetScroll;
