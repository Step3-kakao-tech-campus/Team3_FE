'use client';

import React, { useState, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  selectedOption: string;
  onChange: (selectedValue: string) => void;
  dropdownId: string; // Unique identifier for the dropdown
}

export default function Dropdown(props: DropdownProps) {
  const options = props.options;
  const selectedOption = props.selectedOption;
  const onChange = props.onChange;
  const dropdownId = props.dropdownId;

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleOptionClick(value: string) {
    onChange(value);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen) {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown && !dropdown.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dropdownId]);

  return (
    <div id={dropdownId} className="relative inline-block text-left">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex justify-between w-40 px-4 py-2 text-sm font-medium text-border_color bg-white border border-border_color rounded-full hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 focus-visible:ring-blue-300"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {selectedOption}
          <svg
            className={`w-5 h-5 ml-2 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 5.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg origin-top-right ring-1 ring-black ring-opacity-5">
          <ul className="py-1">
            {options.map(function (option) {
              return (
                <li
                  key={option.value}
                  onClick={function () {
                    handleOptionClick(option.value);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
