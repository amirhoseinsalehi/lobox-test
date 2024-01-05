import React from "react";
import { useEffect, useMemo, useState } from "react";
import "./MultiSelect.scss";
import { SmartInput } from "../index";

interface categoriesType {
  slug: string;
  label: string;
  icon: string;
  selected: boolean;
}

const MultiSelect = () => {
  const [showResults, setShowResults] = useState(false);
  const [categories, setCategories] = useState<categoriesType[]>([
    {
      slug: "science",
      label: "Science",
      icon: "science-icon",
      selected: false,
    },
    {
      slug: "art",
      label: "Art",
      icon: "art-icon",
      selected: false,
    },
    {
      slug: "education",
      label: "Education",
      icon: "education-icon",
      selected: false,
    },
    {
      slug: "sport",
      label: "Sport",
      icon: "sport-icon",
      selected: false,
    },
  ]);

  const selectedLabels = useMemo(() => {
    return categories
      .reduce((acc, curr) => {
        if (curr.selected) {
          return `${acc} ${curr.label},`;
        } else {
          return acc;
        }
      }, "")
      .slice(0, -1);
  }, [categories]);

  const handleTriggerClicked = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(656);

    setShowResults((prevState) => !prevState);
  };

  const handleClickonItem = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    setCategories((prevState) => {
      const clonedList = structuredClone(prevState) as categoriesType[];
      const targetLi = clonedList.filter((item) => item.slug === slug)[0];
      if (targetLi) {
        targetLi.selected = !targetLi.selected;
      }
      return clonedList;
    });
  };

  const handleAddingItem = (value: string) => {
    setCategories((prevState) => {
      const existFlag = prevState.some((currItem) => currItem.slug === value);

      if (existFlag) {
        return [...prevState];
      } else {
        const newObject = {
          slug: value,
          label: value,
          icon: `${value}-icon`,
          selected: false,
        };
        return [...prevState, newObject];
      }
    });
  };

  useEffect(() => {
    const closeMenu: any = (e: React.MouseEvent) => {
      console.log(e);
      setShowResults(false);
    };

    document.body.addEventListener("click", closeMenu);

    return () => document.body.removeEventListener("click", closeMenu);
  }, []);

  return (
    <>
      <button
        className={`select-trigger ${showResults ? "is-open" : ""}`}
        onClick={handleTriggerClicked}
      >
        <p className="selected-labels-box">
          {selectedLabels || "Select an Item.."}
        </p>
        <img className="icon" src="/icons/arrow-down.svg" alt="arrow-down" />

        {showResults && (
          <div className="results-box">
            <SmartInput
              className="smart-input"
              event="Enter"
              onEventTriggered={(val) => handleAddingItem(val)}
            />
            <ul>
              {categories.map((catItem, index) => (
                <li
                  key={`${catItem.slug}-${index}`}
                  className={catItem.selected ? "selected" : ""}
                  onClick={(e) => handleClickonItem(e, catItem.slug)}
                >
                  <span>
                    <span>{catItem.label}</span>
                    <img
                      className="icon"
                      src={`/icons/${catItem.icon}.svg`}
                      alt=""
                    />
                  </span>
                  {catItem.selected && (
                    <span>
                      <img
                        className="icon"
                        src="/icons/check.svg"
                        alt="selected-category"
                      />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </button>
    </>
  );
};

export { MultiSelect };
